import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, );

// Use service role for webhook (bypasses RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { listing_id, buyer_id, seller_id, platform_fee, account_price } = session.metadata || {};

      if (listing_id && buyer_id) {
        const inspectionEnds = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

        // Create escrow transaction
        const { error } = await supabase.from("transactions").insert({
          listing_id,
          buyer_id,
          seller_id: seller_id || null,
          amount: Number(account_price) / 100,
          platform_fee: Number(platform_fee) / 100,
          seller_payout: (Number(account_price) - Number(platform_fee) * 0.97) / 100,
          stripe_payment_intent_id: session.payment_intent as string,
          escrow_status: "held",
          inspection_ends_at: inspectionEnds,
        });

        if (error) console.error("Transaction insert error:", error);

        // Mark listing as pending
        await supabase.from("listings").update({ status: "pending" }).eq("id", listing_id);

        // Notify seller
        if (seller_id) {
          await supabase.from("notifications").insert({
            user_id: seller_id,
            type: "sale",
            title: "Your listing sold! 🎉",
            body: "Payment received and held in escrow. Transfer the account within 24 hours.",
            payload: { listing_id, transaction_amount: Number(account_price) / 100 },
          });
        }

        // Notify buyer
        await supabase.from("notifications").insert({
          user_id: buyer_id,
          type: "system",
          title: "Payment confirmed ✅",
          body: "Funds held in escrow. Seller has 24h to transfer the account. You have 7 days to inspect.",
          payload: { listing_id },
        });

        console.log(`✓ Escrow created for listing ${listing_id}`);
      }
      break;
    }

    case "transfer.created": {
      const transfer = event.data.object as Stripe.Transfer;
      console.log("Payout sent to seller:", transfer.id);
      break;
    }

    default:
      console.log("Unhandled Stripe event:", event.type);
  }

  return NextResponse.json({ received: true });
}

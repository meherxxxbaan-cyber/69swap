import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as { metadata?: Record<string, string>; payment_intent?: string };
      const { listing_id, buyer_id, seller_id, platform_fee_cents, account_price_cents } = session.metadata || {};

      if (listing_id && buyer_id) {
        const inspectionEnds = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

        await supabase.from("transactions").insert({
          listing_id,
          buyer_id,
          seller_id: seller_id || null,
          amount: Number(account_price_cents) / 100,
          platform_fee: Number(platform_fee_cents) / 100,
          seller_payout: (Number(account_price_cents) * 0.97) / 100,
          stripe_payment_intent_id: session.payment_intent as string,
          escrow_status: "held",
          inspection_ends_at: inspectionEnds,
        });

        await supabase.from("listings").update({ status: "pending" }).eq("id", listing_id);

        if (seller_id) {
          await supabase.from("notifications").insert({
            user_id: seller_id,
            type: "sale",
            title: "Your listing sold! 🎉",
            body: "Payment received. Transfer the account within 24 hours.",
            payload: { listing_id },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}

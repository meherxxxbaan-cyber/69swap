import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const { transactionId } = await req.json();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: txn } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .single();

    if (!txn) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

    const { data: seller } = await supabase
      .from("users")
      .select("stripe_account_id")
      .eq("id", txn.seller_id)
      .single();

    let transferId = null;
    if (seller?.stripe_account_id) {
      const transfer = await stripe.transfers.create({
        amount: Math.round(txn.seller_payout * 100),
        currency: "usd",
        destination: seller.stripe_account_id,
      });
      transferId = transfer.id;
    }

    await supabase.from("transactions").update({
      escrow_status: "released",
      stripe_transfer_id: transferId,
    }).eq("id", transactionId);

    await supabase.from("listings").update({ status: "sold" }).eq("id", txn.listing_id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

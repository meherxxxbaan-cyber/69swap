import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { transactionId } = await req.json();

    const { data: txn, error } = await supabase
      .from("transactions")
      .select("*, listings(username, platform)")
      .eq("id", transactionId)
      .single();

    if (error || !txn) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    if (txn.escrow_status !== "held") return NextResponse.json({ error: "Escrow not in held state" }, { status: 400 });

    // Get seller's Stripe account
    const { data: seller } = await supabase.from("users").select("stripe_account_id").eq("id", txn.seller_id).single();

    let transferId = null;
    if (seller?.stripe_account_id) {
      const transfer = await stripe.transfers.create({
        amount: Math.round(txn.seller_payout * 100),
        currency: "usd",
        destination: seller.stripe_account_id,
        metadata: { transaction_id: transactionId },
      });
      transferId = transfer.id;
    }

    await supabase.from("transactions").update({
      escrow_status: "released",
      stripe_transfer_id: transferId,
    }).eq("id", transactionId);

    await supabase.from("listings").update({ status: "sold" }).eq("id", txn.listing_id);

    // Notify seller
    await supabase.from("notifications").insert({
      user_id: txn.seller_id,
      type: "payout",
      title: "Payout sent! 💸",
      body: `$${txn.seller_payout.toFixed(2)} is on its way to your bank account.`,
      payload: { transaction_id: transactionId },
    });

    return NextResponse.json({ success: true, transfer_id: transferId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  // Production: create Stripe Connect account link
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const account = await stripe.accounts.create({ type: "express" });
  // const accountLink = await stripe.accountLinks.create({ account: account.id, ... });

  return NextResponse.json({
    url: `https://connect.stripe.com/setup/e/acct_mock_${userId}`,
    message: "Redirect user to this URL to complete Stripe onboarding",
  });
}

export async function POST(req: NextRequest) {
  try {
    const { userId, code } = await req.json();

    // Production: exchange OAuth code for Stripe account ID
    // Store stripe_account_id on the user record in Supabase

    return NextResponse.json({
      success: true,
      stripeAccountId: `acct_mock_${userId}`,
      message: "Stripe Connect account linked successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

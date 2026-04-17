import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, username, niche, followers, monthly_income, engagement_rate,
            price, minimum_offer, description, location, sellerId } = body;

    if (!platform || !username || !niche || !price || !sellerId) {
      return NextResponse.json({ error: "Missing required fields: platform, username, niche, price, sellerId" }, { status: 400 });
    }

    // Production:
    // const supabase = createServerClient();
    // const { data, error } = await supabase.from("listings").insert({ ... }).select().single();

    const listing = {
      id: `listing-new-${Date.now()}`,
      seller_id: sellerId,
      platform, username, niche,
      followers: Number(followers) || 0,
      monthly_income: Number(monthly_income) || 0,
      engagement_rate: Number(engagement_rate) || 0,
      price: Number(price),
      minimum_offer: Number(minimum_offer) || Math.floor(Number(price) * 0.7),
      description, location,
      status: "active",
      verified_income: false,
      featured: false,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, listing }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

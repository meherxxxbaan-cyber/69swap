import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { listingId, buyerId, amount, message } = await req.json();
    if (!listingId || !buyerId || !amount) {
      return NextResponse.json({ error: "listingId, buyerId, amount required" }, { status: 400 });
    }
    const offer = {
      id: `offer-${Date.now()}`,
      listing_id: listingId,
      buyer_id: buyerId,
      amount: Number(amount),
      message: message || null,
      status: "pending",
      expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
    };
    // Production: insert into supabase.offers, notify seller
    return NextResponse.json({ success: true, offer }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  const buyerId = searchParams.get("buyerId");
  // Production: query supabase.offers with filters
  return NextResponse.json({ offers: [], meta: { total: 0 } });
}

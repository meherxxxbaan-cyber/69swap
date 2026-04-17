import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, email, displayName, role } = await req.json();
    if (!userId || !email) return NextResponse.json({ error: "userId and email required" }, { status: 400 });
    const affiliateCode = Math.random().toString(36).slice(2, 10).toUpperCase();
    return NextResponse.json({
      success: true,
      user: { id: userId, email, display_name: displayName, role: role || "buyer", affiliate_code: affiliateCode },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

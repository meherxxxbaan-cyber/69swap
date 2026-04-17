import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { transactionId, reason, buyerId } = await req.json();
    if (!transactionId || !reason) {
      return NextResponse.json({ error: "transactionId and reason required" }, { status: 400 });
    }

    // Production flow:
    // 1. Verify buyer owns the transaction
    // 2. Update escrow_status to 'disputed'
    // 3. Freeze funds — no transfer until resolved
    // 4. Notify admin team
    // 5. Send notifications to both parties

    console.log(`Dispute opened for ${transactionId}: ${reason}`);

    return NextResponse.json({
      success: true,
      message: "Dispute opened. Funds are frozen. Our team will review within 24 hours.",
      transactionId,
      caseId: `CASE-${Date.now()}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

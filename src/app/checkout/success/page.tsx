import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-3">Payment Successful!</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Your payment is held securely in escrow. The seller has been notified and has 24 hours to transfer the account credentials.
        </p>

        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 text-left space-y-4">
          {[
            { icon: <Clock className="h-4 w-4 text-amber-500" />, title: "Seller transfers within 24h", desc: "You'll receive credentials by email." },
            { icon: <Shield className="h-4 w-4 text-indigo-500" />, title: "7-day inspection period", desc: "Verify the account is as described." },
            { icon: <CheckCircle className="h-4 w-4 text-emerald-500" />, title: "Confirm to release payment", desc: "Funds go to seller only after you confirm." },
          ].map((step) => (
            <div key={step.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">{step.icon}</div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{step.title}</div>
                <div className="text-xs text-slate-500">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 gap-2" asChild>
            <Link href="/dashboard"><ArrowRight className="h-4 w-4" /> Go to Dashboard</Link>
          </Button>
          <Button variant="secondary" className="flex-1" asChild>
            <Link href="/marketplace">Browse More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

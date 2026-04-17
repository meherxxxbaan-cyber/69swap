"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Send, X } from "lucide-react";

const TOPICS = ["Buying an account", "Selling an account", "Dispute / refund", "Technical issue", "Partnership", "Press inquiry", "Other"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState("");
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      {!sent ? (
        <>
          <h2 className="font-bold text-slate-900 mb-5">Send us a message</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>First Name</Label><Input placeholder="Alex" className="mt-1.5" /></div>
              <div><Label>Last Name</Label><Input placeholder="Johnson" className="mt-1.5" /></div>
            </div>
            <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-1.5" /></div>
            <div>
              <Label>Topic</Label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}
                className="mt-1.5 w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="">Select a topic...</option>
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            {topic === "Dispute / refund" && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 flex gap-2">
                <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                For active disputes, use the <strong>Dispute button</strong> in your Dashboard for faster resolution.
              </div>
            )}
            <div>
              <Label>Message</Label>
              <textarea className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[130px] resize-none" placeholder="Tell us how we can help..." />
            </div>
            <Button size="lg" className="w-full gap-2" onClick={() => setSent(true)}>
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Message sent!</h3>
          <p className="text-slate-500 mb-6 text-sm">We'll respond within 4 business hours.</p>
          <Button variant="secondary" onClick={() => setSent(false)}>Send another</Button>
        </div>
      )}
    </div>
  );
}

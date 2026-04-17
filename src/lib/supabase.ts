import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client (anon key)
export const supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "placeholder");

// Server client (service role) — only use in API routes / server components
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(
    supabaseUrl || "https://placeholder.supabase.co",
    serviceKey || supabaseAnonKey || "placeholder",
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string; role: string; display_name: string | null; email: string | null;
          stripe_account_id: string | null; affiliate_code: string | null;
          avg_rating: number | null; total_sales: number; is_verified_seller: boolean;
          created_at: string;
        };
      };
      listings: {
        Row: {
          id: string; seller_id: string; platform: string; username: string; niche: string;
          followers: number; monthly_income: number; engagement_rate: number;
          price: number; minimum_offer: number | null; status: string;
          verified_income: boolean; tiktok_shop_eligible: boolean; monetized: boolean;
          location: string | null; description: string | null; view_count: number;
          featured: boolean; created_at: string;
        };
      };
      transactions: {
        Row: {
          id: string; listing_id: string; buyer_id: string; seller_id: string;
          amount: number; platform_fee: number; seller_payout: number;
          stripe_payment_intent_id: string | null; escrow_status: string;
          inspection_ends_at: string | null; created_at: string;
        };
      };
      offers: {
        Row: {
          id: string; listing_id: string; buyer_id: string; amount: number;
          status: string; message: string | null; expires_at: string; created_at: string;
        };
      };
    };
  };
}

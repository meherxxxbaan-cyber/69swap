-- 69Swap Seed Data
-- Run AFTER schema.sql in Supabase SQL Editor
-- Note: Users would normally come from auth.users via trigger.
-- This seeds mock data for demo/development purposes.

-- ─── INSERT MOCK USERS ───────────────────────────────────────────────────────
-- In production, users are created via Supabase Auth.
-- For seeding, we insert directly with fixed UUIDs.

insert into public.users (id, role, display_name, email, avg_rating, total_sales, is_verified_seller) values
  ('00000000-0000-0000-0000-000000000001', 'seller', 'SocialPro', 'socialpro@demo.com', 4.9, 12, true),
  ('00000000-0000-0000-0000-000000000002', 'seller', 'AccountKing', 'accountking@demo.com', 4.8, 8, true),
  ('00000000-0000-0000-0000-000000000003', 'seller', 'InfluenceHQ', 'influencehq@demo.com', 5.0, 23, true),
  ('00000000-0000-0000-0000-000000000004', 'seller', 'MediaFlip', 'mediaflip@demo.com', 4.7, 6, true),
  ('00000000-0000-0000-0000-000000000005', 'seller', 'GrowthLabs', 'growthlabs@demo.com', 4.9, 15, true),
  ('00000000-0000-0000-0000-000000000006', 'buyer', 'Buyer_Alex', 'alex@demo.com', 0, 0, false),
  ('00000000-0000-0000-0000-000000000007', 'buyer', 'Buyer_Sarah', 'sarah@demo.com', 0, 0, false),
  ('00000000-0000-0000-0000-000000000008', 'buyer', 'Buyer_Jordan', 'jordan@demo.com', 0, 0, false),
  ('00000000-0000-0000-0000-000000000009', 'buyer', 'Buyer_Mike', 'mike@demo.com', 0, 0, false),
  ('00000000-0000-0000-0000-000000000010', 'admin', 'Admin', 'admin@69swap.com', 5.0, 0, false)
on conflict (id) do nothing;

-- ─── INSERT LISTINGS ─────────────────────────────────────────────────────────
insert into public.listings (id, seller_id, platform, username, niche, followers, monthly_income, engagement_rate, price, minimum_offer, status, verified_income, tiktok_shop_eligible, monetized, location, description, featured) values
  -- TikTok listings
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'TikTok', '@fitnessdaily', 'Fitness', 850000, 4200, 9.2, 85000, 70000, 'active', true, true, true, 'United States', 'Top fitness account with loyal 18-35 demographic. Multiple brand deals active. TikTok Shop enabled with $2k/mo shop revenue.', true),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 'TikTok', '@cryptoking2024', 'Crypto', 420000, 2100, 7.8, 42000, 35000, 'active', true, false, true, 'United Kingdom', 'Crypto/finance niche. Highly engaged audience. Newsletter of 12K subscribers included.', true),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000003', 'TikTok', '@beautyqueen99', 'Beauty', 1200000, 7800, 11.4, 156000, 130000, 'active', true, true, true, 'United States', 'Premium beauty account with 7 active brand deals. UGC rates: $3K/post. Massive female 18-24 audience.', true),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000004', 'TikTok', '@gamingpro2024', 'Gaming', 250000, 1200, 8.5, 24000, 20000, 'active', false, false, true, 'Canada', 'Gaming account focused on FPS/battle royale content. Consistent 200K+ monthly views.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000005', 'TikTok', '@travelvibes_hq', 'Travel', 380000, 1900, 6.9, 38000, 32000, 'active', true, false, true, 'Australia', 'Luxury travel niche. Brand deals with hotels, airlines, and travel gear companies.', false),

  -- Instagram listings
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Instagram', '@glowupguru', 'Beauty', 520000, 3800, 4.2, 95000, 80000, 'active', true, false, true, 'United States', 'Beauty & skincare IG. 4 brand deals/month. Saved posts perform extremely well for product discovery.', true),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 'Instagram', '@wanderlust.jane', 'Travel', 290000, 2200, 3.8, 52800, 45000, 'active', true, false, true, 'Germany', 'Authentic travel storytelling. Reels getting 500K+ views. Multiple hotel partnership emails received weekly.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000003', 'Instagram', '@gymrat_official', 'Fitness', 740000, 5200, 5.1, 124800, 105000, 'active', true, false, true, 'United States', 'Bodybuilding & fitness supplements niche. Whoop, MyProtein, Gymshark partnership history. Very high CPM for fitness.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000004', 'Instagram', '@foodies_co', 'Food', 180000, 900, 6.3, 18000, 15000, 'active', false, false, false, 'France', 'Food photography and restaurant reviews. Paris-based with strong local brand deal potential.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000005', 'Instagram', '@cryptoboss_ig', 'Crypto', 95000, 2800, 3.2, 67200, 55000, 'active', true, false, true, 'United Arab Emirates', 'Crypto/DeFi account. 95K engaged crypto investors. Newsletter of 8K included.', false),

  -- YouTube listings
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000003', 'YouTube', 'FitnessUnlocked', 'Fitness', 320000, 4800, 5.8, 115200, 95000, 'active', true, false, true, 'United States', '320K subscriber fitness channel. AdSense $2.8K/mo + sponsorships $2K/mo. Evergreen workout content.', true),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000004', 'YouTube', 'CryptoWeekly', 'Finance', 180000, 8400, 4.1, 201600, 170000, 'active', true, false, true, 'United Kingdom', 'Finance/crypto YouTube. Very high CPM ($18 average). Newsletter of 22K. Massive Q4 revenue seasonality.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000005', 'YouTube', 'TechReviewHub', 'Tech', 450000, 6200, 4.9, 148800, 125000, 'active', true, false, true, 'United States', 'Tech reviews and unboxings. Amazon Associates + direct sponsorships. Very loyal subscriber base.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'YouTube', 'GamingWithPro', 'Gaming', 220000, 2800, 6.7, 67200, 56000, 'active', false, false, true, 'Canada', 'Gaming channel with Let''s Play and reviews. Growing 8K subs/month. Great demographics for gaming brands.', false),

  -- X (Twitter) listings
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 'X', '@cryptoanalyst', 'Crypto', 125000, 3200, 3.4, 76800, 65000, 'active', true, false, false, 'United States', 'Crypto analysis and alpha calls. Verified account. 125K followers with 3.4% engagement. Paid newsletter of 4K.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000003', 'X', '@techinsider_x', 'Tech', 89000, 1800, 2.9, 43200, 36000, 'active', false, false, false, 'United States', 'Tech news and commentary. Strong network effects. Multiple publication relationships.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000005', 'X', '@sportsbreaking', 'Sports', 210000, 1400, 4.2, 33600, 28000, 'active', false, false, false, 'United Kingdom', 'Sports breaking news account. Massive engagement during match days. Sponsored tweet history with major sportsbooks.', false),

  -- Telegram listings
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000004', 'Telegram', 'CryptoSignals', 'Crypto', 48000, 9600, 12.0, 230400, 195000, 'active', true, false, true, 'United Arab Emirates', 'Premium crypto signals channel. $200/mo subscription. 48K members, 1.2K paying subscribers. Extremely high value.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'Telegram', 'TechNews_TG', 'Tech', 72000, 2400, 8.5, 57600, 48000, 'active', false, false, false, 'Germany', 'Tech news Telegram channel. 72K members. Sponsored post rate: $500. German market focus.', false),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000002', 'Telegram', 'FinanceDaily_TG', 'Finance', 34000, 4200, 9.8, 100800, 85000, 'active', true, false, true, 'Singapore', 'Finance and investing Telegram. 34K members. Subscription model with $4.2K MRR. Highly profitable.', false)
on conflict do nothing;

-- ─── INSERT COMPLETED TRANSACTIONS ──────────────────────────────────────────
-- These feed the sales ledger view
do $$
declare
  seller_ids uuid[] := array[
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000005'
  ];
  buyer_ids uuid[] := array[
    '00000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000007',
    '00000000-0000-0000-0000-000000000008',
    '00000000-0000-0000-0000-000000000009'
  ];
  listing_rec record;
  i int := 0;
begin
  for listing_rec in (select id, seller_id from public.listings limit 20) loop
    insert into public.transactions (
      listing_id, buyer_id, seller_id, amount, platform_fee, seller_payout,
      stripe_payment_intent_id, escrow_status, inspection_ends_at, created_at
    ) values (
      listing_rec.id,
      buyer_ids[(i % 4) + 1],
      listing_rec.seller_id,
      50000 + (random() * 100000)::numeric,
      1500 + (random() * 3000)::numeric,
      48000 + (random() * 97000)::numeric,
      'pi_demo_' || i,
      'released',
      now() - interval '3 days',
      now() - interval '1 day' * (i + 1)
    );
    i := i + 1;
  end loop;
end;
$$;

-- ─── INSERT REVIEWS ──────────────────────────────────────────────────────────
do $$
declare
  txn_rec record;
  ratings int[] := array[5, 5, 5, 5, 4, 5, 5, 4, 5, 5];
  bodies text[] := array[
    'Smooth transaction. Seller was professional and transferred everything quickly.',
    'Excellent experience! Account was exactly as described. Highly recommend.',
    'Super fast transfer. Income proof was accurate. Would buy again.',
    'Great seller, very responsive. Account metrics held up perfectly.',
    'Solid account, good engagement. Minor discrepancy in income but seller resolved it quickly.'
  ];
  i int := 0;
begin
  for txn_rec in (select id, buyer_id, seller_id from public.transactions limit 15) loop
    insert into public.reviews (transaction_id, reviewer_id, reviewee_id, rating, body)
    values (
      txn_rec.id,
      txn_rec.buyer_id,
      txn_rec.seller_id,
      ratings[(i % 10) + 1],
      bodies[(i % 5) + 1]
    )
    on conflict do nothing;
    i := i + 1;
  end loop;
end;
$$;

-- Update seller ratings from reviews
update public.users u
set avg_rating = (
  select round(avg(r.rating)::numeric, 2)
  from public.reviews r where r.reviewee_id = u.id
),
total_sales = (
  select count(*) from public.transactions t
  where t.seller_id = u.id and t.escrow_status = 'released'
)
where id in (select distinct reviewee_id from public.reviews);

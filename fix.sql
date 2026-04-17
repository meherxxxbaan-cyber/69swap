-- Fix 1: Add missing email column if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS stripe_account_id text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS affiliate_code text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS referred_by uuid;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avg_rating numeric(3,2) default 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS total_sales integer default 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_verified_seller boolean default false;

-- Fix 2: Seed fake listings directly (skip the users seed which has the error)
INSERT INTO public.listings (seller_id, platform, username, niche, followers, monthly_income, engagement_rate, price, minimum_offer, status, verified_income, tiktok_shop_eligible, monetized, location, description, featured)
SELECT 
  (SELECT id FROM auth.users LIMIT 1),
  platform, username, niche, followers, monthly_income, engagement_rate, price, minimum_offer, 'active', verified_income, tiktok_shop_eligible, monetized, location, description, featured
FROM (VALUES
  ('TikTok',    '@fitnessdaily',    'Fitness',   850000,  4200, 9.2,  85000,  70000,  true,  true,  true,  'United States', 'Top fitness account with loyal 18-35 demographic. 3 active brand deals. TikTok Shop enabled.', true),
  ('TikTok',    '@cryptoking2024',  'Crypto',    420000,  2100, 7.8,  42000,  35000,  true,  false, true,  'United Kingdom','Crypto/finance niche. Newsletter of 12K included. Zero violations.', true),
  ('TikTok',    '@beautyqueenxo',   'Beauty',    1200000, 7800, 11.4, 156000, 130000, true,  true,  true,  'United States', 'Premium beauty account. 7 active brand deals. TikTok Shop GMV $2.5K/mo.', true),
  ('Instagram', '@glowupguru',      'Beauty',    520000,  3800, 4.2,  95000,  80000,  true,  false, true,  'United States', 'Beauty & skincare IG. 4 brand deals/month. Reels avg 500K+ views.', true),
  ('Instagram', '@gymrat_official', 'Fitness',   740000,  5200, 5.1,  124800, 105000, true,  false, true,  'United States', 'Bodybuilding & fitness. Gymshark partnership history. Very high CPM.', false),
  ('YouTube',   'FitnessUnlocked',  'Fitness',   320000,  4800, 5.8,  115200, 95000,  true,  false, true,  'United States', '320K subscribers. AdSense $2.8K/mo + sponsorships $2K/mo.', true),
  ('YouTube',   'CryptoWeekly',     'Finance',   180000,  8400, 4.1,  201600, 170000, true,  false, true,  'United Kingdom','Finance/crypto YouTube. CPM avg $18. Newsletter 22K.', false),
  ('YouTube',   'TechReviewHub',    'Tech',      450000,  6200, 4.9,  148800, 125000, true,  false, true,  'United States', 'Tech reviews. Amazon Associates $1.2K/mo. CPM $22.', false),
  ('X',         '@cryptoanalyst_x', 'Crypto',    125000,  3200, 3.4,  76800,  65000,  true,  false, false, 'United States', 'Verified account. Paid newsletter 4K subscribers. Exchange affiliate deals.', false),
  ('Telegram',  'CryptoSignalsPro', 'Crypto',    48000,   9600, 12.0, 230400, 195000, true,  false, true,  'UAE',           'Premium crypto signals. $200/mo subscription. 1.2K paying subscribers.', false),
  ('TikTok',    '@foodielife_us',   'Food',      620000,  3100, 10.2, 62000,  52000,  true,  true,  true,  'United States', 'Food and recipe content. 50M+ total views. DoorDash sponsored posts.', true),
  ('TikTok',    '@moneyminds_app',  'Finance',   720000,  5400, 6.3,  108000, 90000,  true,  false, true,  'United States', 'Personal finance. Credit card affiliate deals pay $8-15 per conversion.', true),
  ('Instagram', '@wanderlust.jane', 'Travel',    290000,  2200, 3.8,  52800,  45000,  true,  false, true,  'Germany',       'Authentic travel storytelling. Reels 500K+ views. 5 years old.', false),
  ('YouTube',   'FoodLaboratory',   'Food',      890000,  9600, 7.2,  230400, 195000, true,  false, true,  'United States', '890K subscribers. CPM $16. HelloFresh sponsor history.', false),
  ('Telegram',  'FinanceDaily_TG',  'Finance',   34000,   4200, 9.8,  100800, 85000,  true,  false, true,  'Singapore',     'Finance Telegram. Subscription model $4.2K MRR.', false)
) AS t(platform, username, niche, followers, monthly_income, engagement_rate, price, minimum_offer, verified_income, tiktok_shop_eligible, monetized, location, description, featured)
ON CONFLICT DO NOTHING;

SELECT 'Database fixed successfully!' as result;

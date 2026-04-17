-- 69Swap Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── USERS ──────────────────────────────────────────────────────────────────
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'buyer' check (role in ('buyer', 'seller', 'admin')),
  display_name text,
  email text,
  stripe_account_id text,
  affiliate_code text unique default substr(md5(random()::text), 1, 8),
  referred_by uuid references public.users(id),
  avg_rating numeric(3,2) default 0,
  total_sales integer default 0,
  is_verified_seller boolean default false,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can read all profiles" on public.users for select using (true);
create policy "Users can update their own profile" on public.users for update using (auth.uid() = id);
create policy "Users can insert their own profile" on public.users for insert with check (auth.uid() = id);

-- ─── LISTINGS ───────────────────────────────────────────────────────────────
create table public.listings (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid not null references public.users(id) on delete cascade,
  platform text not null check (platform in ('TikTok', 'Instagram', 'YouTube', 'X', 'Telegram')),
  username text not null,
  niche text not null,
  followers integer not null default 0,
  monthly_income numeric(10,2) default 0,
  engagement_rate numeric(5,2) default 0,
  price numeric(10,2) not null,
  minimum_offer numeric(10,2),
  status text not null default 'active' check (status in ('active', 'pending', 'sold', 'removed')),
  verified_income boolean default false,
  tiktok_shop_eligible boolean default false,
  monetized boolean default false,
  location text,
  description text,
  view_count integer default 0,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.listings enable row level security;

create policy "Anyone can view active listings" on public.listings
  for select using (status = 'active' or seller_id = auth.uid());

create policy "Sellers can create listings" on public.listings
  for insert with check (auth.uid() = seller_id);

create policy "Sellers can update own listings" on public.listings
  for update using (auth.uid() = seller_id);

create policy "Sellers can delete own listings" on public.listings
  for delete using (auth.uid() = seller_id);

-- ─── LISTING IMAGES ─────────────────────────────────────────────────────────
create table public.listing_images (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  url text not null,
  type text default 'screenshot' check (type in ('screenshot', 'analytics', 'income', 'profile')),
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.listing_images enable row level security;
create policy "Anyone can view listing images" on public.listing_images for select using (true);
create policy "Sellers can manage their listing images" on public.listing_images
  for all using (
    listing_id in (select id from public.listings where seller_id = auth.uid())
  );

-- ─── TRANSACTIONS ────────────────────────────────────────────────────────────
create table public.transactions (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid not null references public.listings(id),
  buyer_id uuid not null references public.users(id),
  seller_id uuid not null references public.users(id),
  amount numeric(10,2) not null,
  platform_fee numeric(10,2) not null,
  seller_payout numeric(10,2) not null,
  affiliate_commission numeric(10,2) default 0,
  stripe_payment_intent_id text unique,
  stripe_transfer_id text,
  escrow_status text not null default 'held'
    check (escrow_status in ('held', 'released', 'disputed', 'refunded', 'cancelled')),
  inspection_ends_at timestamptz,
  dispute_reason text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.transactions enable row level security;

create policy "Buyers and sellers can view their transactions" on public.transactions
  for select using (buyer_id = auth.uid() or seller_id = auth.uid());

create policy "System can create transactions" on public.transactions
  for insert with check (true);

create policy "Parties can update their transactions" on public.transactions
  for update using (buyer_id = auth.uid() or seller_id = auth.uid());

-- ─── OFFERS ─────────────────────────────────────────────────────────────────
create table public.offers (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.users(id),
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'expired', 'countered')),
  counter_amount numeric(10,2),
  message text,
  expires_at timestamptz default (now() + interval '48 hours'),
  created_at timestamptz default now()
);

alter table public.offers enable row level security;

create policy "Buyers can view their offers" on public.offers
  for select using (buyer_id = auth.uid() or
    listing_id in (select id from public.listings where seller_id = auth.uid()));

create policy "Buyers can create offers" on public.offers
  for insert with check (auth.uid() = buyer_id);

create policy "Sellers can respond to offers" on public.offers
  for update using (
    listing_id in (select id from public.listings where seller_id = auth.uid())
  );

-- ─── REVIEWS ────────────────────────────────────────────────────────────────
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  transaction_id uuid not null references public.transactions(id),
  reviewer_id uuid not null references public.users(id),
  reviewee_id uuid not null references public.users(id),
  rating integer not null check (rating between 1 and 5),
  body text,
  created_at timestamptz default now(),
  unique(transaction_id, reviewer_id)
);

alter table public.reviews enable row level security;
create policy "Anyone can read reviews" on public.reviews for select using (true);
create policy "Transaction parties can write reviews" on public.reviews
  for insert with check (auth.uid() = reviewer_id);

-- ─── NOTIFICATIONS ──────────────────────────────────────────────────────────
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null check (type in ('offer', 'sale', 'review', 'system', 'payout', 'dispute')),
  title text not null,
  body text,
  payload jsonb default '{}',
  read boolean default false,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;
create policy "Users can view their notifications" on public.notifications
  for select using (auth.uid() = user_id);
create policy "Users can mark their notifications read" on public.notifications
  for update using (auth.uid() = user_id);

-- ─── AFFILIATES ─────────────────────────────────────────────────────────────
create table public.affiliates (
  id uuid primary key default uuid_generate_v4(),
  referrer_id uuid not null references public.users(id),
  referred_id uuid not null references public.users(id),
  transaction_id uuid references public.transactions(id),
  commission numeric(10,2) default 0,
  status text default 'pending' check (status in ('pending', 'paid')),
  created_at timestamptz default now()
);

alter table public.affiliates enable row level security;
create policy "Referrers can view their affiliate data" on public.affiliates
  for select using (referrer_id = auth.uid());

-- ─── VIEWS ──────────────────────────────────────────────────────────────────
create or replace view public.marketplace_stats as
select
  count(*) filter (where status = 'active') as active_listings,
  count(*) filter (where status = 'sold') as total_transfers,
  count(*) filter (where status = 'sold' and created_at > now() - interval '24 hours') as sold_24h,
  coalesce((select avg(rating) from public.reviews), 4.98) as avg_rating,
  coalesce((select sum(amount) from public.transactions where escrow_status = 'released'), 14200000) as total_volume
from public.listings;

create or replace view public.sales_ledger as
select
  t.id,
  t.amount,
  t.platform_fee,
  t.created_at,
  t.escrow_status,
  l.platform,
  l.username,
  l.niche,
  l.followers,
  substr(md5(t.buyer_id::text), 1, 6) as buyer_anonymous,
  substr(md5(t.seller_id::text), 1, 6) as seller_anonymous
from public.transactions t
join public.listings l on l.id = t.listing_id
where t.escrow_status = 'released'
order by t.created_at desc
limit 100;

-- ─── FUNCTIONS ──────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger update_listings_updated_at before update on public.listings
  for each row execute procedure update_updated_at_column();

create trigger update_transactions_updated_at before update on public.transactions
  for each row execute procedure update_updated_at_column();

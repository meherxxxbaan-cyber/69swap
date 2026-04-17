import { NextRequest, NextResponse } from "next/server";
import { SEED_LISTINGS } from "@/lib/seed-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get("platform");
  const niche = searchParams.get("niche");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minFollowers = searchParams.get("minFollowers");
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "12");

  let listings = [...SEED_LISTINGS].filter((l) => l.status === "active");

  if (platform) listings = listings.filter((l) => l.platform === platform);
  if (niche) listings = listings.filter((l) => l.niche === niche);
  if (minPrice) listings = listings.filter((l) => l.price >= Number(minPrice));
  if (maxPrice) listings = listings.filter((l) => l.price <= Number(maxPrice));
  if (minFollowers) listings = listings.filter((l) => l.followers >= Number(minFollowers));

  listings.sort((a, b) => {
    switch (sort) {
      case "price_asc": return a.price - b.price;
      case "price_desc": return b.price - a.price;
      case "followers_desc": return b.followers - a.followers;
      case "income_desc": return b.monthly_income - a.monthly_income;
      default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const total = listings.length;
  const paginated = listings.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    data: paginated,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
  });
}

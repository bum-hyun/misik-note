import { type LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const baseUrl = new URL(request.url).origin;

  const res = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/restaurant_reviews?select=id,restaurant_id`, {
    headers: {
      apikey: process.env.VITE_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.VITE_SUPABASE_ANON_KEY!}`,
    },
  });

  const data: { id: number; restaurant_id: number }[] = await res.json();

  const restaurantIds = new Set<number>();

  const reviewDetailPaths = data.map((item) => {
    restaurantIds.add(item.restaurant_id);
    return {
      loc: `${baseUrl}/restaurant/${item.restaurant_id}/review/${item.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    };
  });

  const reviewListPaths = Array.from(restaurantIds).map((restaurantId) => ({
    loc: `${baseUrl}/restaurant/${restaurantId}/review`,
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  }));

  const allPaths = [...reviewDetailPaths, ...reviewListPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map(
      ({ loc, changefreq, priority, lastmod }) => `<url>
  <loc>${loc}</loc>
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
  <lastmod>${lastmod}</lastmod>
</url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=60',
    },
  });
};

// eslint-disable-next-line react/display-name
export default function () {
  return null;
}

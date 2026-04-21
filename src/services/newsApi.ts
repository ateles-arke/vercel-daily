import type { BreakingNewsItem, BreakingNewsResponse } from '@/types/api';

const BASE_URL = process.env.NEWS_API_BASE_URL!;

const headers = {
  'x-vercel-protection-bypass': process.env.NEWS_API_BYPASS_TOKEN!,
};

export async function getBreakingNews(): Promise<BreakingNewsItem | null> {
  const res = await fetch(`${BASE_URL}/breaking-news`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const json: BreakingNewsResponse = await res.json();
  return json.success ? json.data : null;
}

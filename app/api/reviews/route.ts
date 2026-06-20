import { NextResponse } from 'next/server'

// Cache the response in the Next.js Data Cache and revalidate every hour.
export const revalidate = 3600

// Text query used to resolve the restaurant's Place ID when GOOGLE_PLACE_ID
// is not set explicitly.
const PLACE_QUERY = 'El Racó del Pantà Talarn Lleida'

const EMPTY = { reviews: [] as ReviewOut[], rating: null as number | null, total: 0 }

// Shape of a review as returned by the Google Places Details API.
type GoogleReview = {
  author_name: string
  rating: number
  text: string
  time: number // unix seconds
  relative_time_description: string
  profile_photo_url?: string
}

// Trimmed shape we expose to the client.
type ReviewOut = {
  author: string
  rating: number
  text: string
  time: number
  relativeTime: string
  profilePhoto?: string
}

// Resolve the Place ID: prefer an explicit env override, otherwise look it up
// once via the Find Place endpoint (cached for an hour like everything else).
async function resolvePlaceId(key: string): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID

  const url =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json' +
    `?input=${encodeURIComponent(PLACE_QUERY)}` +
    '&inputtype=textquery&fields=place_id' +
    `&key=${key}`

  const res = await fetch(url, { next: { revalidate } })
  if (!res.ok) return null
  const data = await res.json()
  return data?.candidates?.[0]?.place_id ?? null
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY

  // No key configured (e.g. local dev without .env.local): fail silently so the
  // page never breaks — the client falls back to just the "see on Google" link.
  if (!key) return NextResponse.json(EMPTY)

  try {
    const placeId = await resolvePlaceId(key)
    if (!placeId) return NextResponse.json(EMPTY)

    const detailsUrl =
      'https://maps.googleapis.com/maps/api/place/details/json' +
      `?place_id=${placeId}` +
      '&fields=reviews,rating,user_ratings_total' +
      '&reviews_sort=newest' +
      `&key=${key}`

    const res = await fetch(detailsUrl, { next: { revalidate } })
    if (!res.ok) return NextResponse.json(EMPTY)

    const data = await res.json()
    const result = data?.result ?? {}
    const raw: GoogleReview[] = Array.isArray(result.reviews) ? result.reviews : []

    const reviews: ReviewOut[] = raw
      .filter((r) => typeof r.rating === 'number' && r.rating >= 4)
      .sort((a, b) => b.time - a.time) // most recent first
      .slice(0, 5)
      .map((r) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
        relativeTime: r.relative_time_description,
        profilePhoto: r.profile_photo_url,
      }))

    return NextResponse.json({
      reviews,
      rating: typeof result.rating === 'number' ? result.rating : null,
      total: typeof result.user_ratings_total === 'number' ? result.user_ratings_total : 0,
    })
  } catch {
    // Network error / malformed response: silent fallback, never 500 the page.
    return NextResponse.json(EMPTY)
  }
}

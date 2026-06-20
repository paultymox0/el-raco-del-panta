import { NextResponse } from 'next/server'

// Cache the response in the Next.js Data Cache and revalidate every hour.
export const revalidate = 3600

// Text query used to resolve the restaurant's Place ID when GOOGLE_PLACE_ID
// is not set explicitly.
const PLACE_QUERY = 'El Racó del Pantà Talarn Lleida'

const EMPTY = { reviews: [] as ReviewOut[], rating: null as number | null, total: 0 }

// Shape of a review as returned by the Places API (New).
type NewReview = {
  rating?: number
  text?: { text?: string; languageCode?: string }
  originalText?: { text?: string; languageCode?: string }
  publishTime?: string // RFC 3339 timestamp
  relativePublishTimeDescription?: string
  authorAttribution?: {
    displayName?: string
    photoUri?: string
  }
}

// Trimmed shape we expose to the client.
type ReviewOut = {
  author: string
  rating: number
  text: string
  time: number // unix seconds
  relativeTime: string
  profilePhoto?: string
}

// Resolve the Place ID: prefer an explicit env override, otherwise look it up
// via Text Search (Places API New). The returned `id` is the place ID.
async function resolvePlaceId(key: string): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'places.id',
    },
    body: JSON.stringify({ textQuery: PLACE_QUERY }),
    next: { revalidate },
  })
  if (!res.ok) return null
  const data = await res.json().catch(() => null)
  return data?.places?.[0]?.id ?? null
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY

  // No key configured (e.g. local dev without .env.local): fail silently so the
  // page never breaks — the client falls back to just the "see on Google" link.
  if (!key) return NextResponse.json(EMPTY)

  try {
    const placeId = await resolvePlaceId(key)
    if (!placeId) return NextResponse.json(EMPTY)

    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      },
      next: { revalidate },
    })
    if (!res.ok) return NextResponse.json(EMPTY)

    const data = await res.json().catch(() => null)
    const raw: NewReview[] = Array.isArray(data?.reviews) ? data.reviews : []

    const reviews: ReviewOut[] = raw
      .filter((r) => typeof r.rating === 'number' && r.rating >= 4)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google',
        rating: r.rating as number,
        text: r.text?.text ?? r.originalText?.text ?? '',
        time: r.publishTime ? Math.floor(new Date(r.publishTime).getTime() / 1000) : 0,
        relativeTime: r.relativePublishTimeDescription ?? '',
        profilePhoto: r.authorAttribution?.photoUri,
      }))
      .sort((a, b) => b.time - a.time) // most recent first
      .slice(0, 5)

    return NextResponse.json({
      reviews,
      rating: typeof data?.rating === 'number' ? data.rating : null,
      total: typeof data?.userRatingCount === 'number' ? data.userRatingCount : 0,
    })
  } catch {
    // Network error / malformed response: silent fallback, never 500 the page.
    return NextResponse.json(EMPTY)
  }
}

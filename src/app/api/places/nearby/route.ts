import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&key=${apiKey}`,
      { cache: 'no-store' }
    );

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(data.error_message || 'Failed to fetch nearby places');
    }

    const businesses = (data.results || [])
      .filter((place: any) => place.business_status === 'OPERATIONAL')
      .slice(0, 5)
      .map((place: any) => ({
        placeId: place.place_id,
        name: place.name,
        address: place.vicinity,
        types: place.types,
      }));

    return NextResponse.json({ businesses });
  } catch (error) {
    console.error('Nearby Places Error:', error);
    return NextResponse.json({ error: 'Failed to fetch nearby places', businesses: [] }, { status: 500 });
  }
}

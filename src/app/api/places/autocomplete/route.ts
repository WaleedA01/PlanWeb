import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get('input');

  // Florida location bias (Orlando-centered)
  const FL_CENTER_LAT = 28.5383;
  const FL_CENTER_LNG = -81.3792;
  const FL_RADIUS_METERS = 500000; // ~500km covers all of Florida

  if (!input) {
    return NextResponse.json({ predictions: [] });
  }

  const apiKey = process.env.GOOGLE_PLACES_API;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
      `input=${encodeURIComponent(input)}` +
      `&key=${apiKey}` +
      `&location=${FL_CENTER_LAT},${FL_CENTER_LNG}` +
      `&radius=${FL_RADIUS_METERS}` +
      `&components=country:us`,
      { cache: 'no-store' }
    );

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(data.error_message || 'Failed to fetch predictions');
    }

    const predictions = (data.predictions || []).map((prediction: any) => ({
      placeId: prediction.place_id,
      description: prediction.description,
      mainText: prediction.structured_formatting.main_text,
      secondaryText: prediction.structured_formatting.secondary_text,
    }));

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Places Autocomplete Error:', error);
    return NextResponse.json({ error: 'Failed to fetch predictions', predictions: [] }, { status: 500 });
  }
}

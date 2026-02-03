import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json({ error: 'Place ID is required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,address_components,geometry,formatted_phone_number,website,opening_hours,rating,user_ratings_total,price_level,types,photos,place_id&key=${apiKey}`,
      { cache: 'no-store' }
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Failed to fetch place details');
    }

    const result = data.result;
    const addressComponents = result.address_components || [];

    const getComponent = (type: string) => 
      addressComponents.find((c: any) => c.types.includes(type))?.long_name || '';

    const placeDetails = {
      placeId: result.place_id,
      businessName: result.name,
      formattedAddress: result.formatted_address,
      streetNumber: getComponent('street_number'),
      route: getComponent('route'),
      streetAddress: `${getComponent('street_number')} ${getComponent('route')}`.trim(),
      city: getComponent('locality') || getComponent('sublocality'),
      state: getComponent('administrative_area_level_1'),
      postalCode: getComponent('postal_code'),
      country: getComponent('country'),
      latitude: result.geometry?.location?.lat,
      longitude: result.geometry?.location?.lng,
      phoneNumber: result.formatted_phone_number,
      website: result.website,
      rating: result.rating,
      userRatingsTotal: result.user_ratings_total,
      priceLevel: result.price_level,
      types: result.types,
      openingHours: result.opening_hours?.weekday_text,
      photos: result.photos?.map((photo: any) => ({
        reference: photo.photo_reference,
        width: photo.width,
        height: photo.height,
      })),
    };

    return NextResponse.json(placeDetails);
  } catch (error) {
    console.error('Place Details Error:', error);
    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: 500 });
  }
}

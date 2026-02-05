'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface DualLocationMapProps {
  businessLat: number;
  businessLng: number;
  planlifeLat: number;
  planlifeLng: number;
}

export default function DualLocationMap({ businessLat, businessLng, planlifeLat, planlifeLng }: DualLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setMapError('Mapbox token not found');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      // Start centered on business location
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [businessLng, businessLat],
        zoom: 12,
        pitch: 0,
        interactive: false,
      });

      map.current.on('load', () => {
        if (!map.current) return;

        // Create arched line using bezier curve
        const createArcCoordinates = (start: [number, number], end: [number, number], numPoints = 50) => {
          const coordinates: [number, number][] = [];
          const midLng = (start[0] + end[0]) / 2;
          const midLat = (start[1] + end[1]) / 2;
          
          // Calculate perpendicular offset for arc (20% of distance)
          const dx = end[0] - start[0];
          const dy = end[1] - start[1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          const arcHeight = distance * 0.2;
          
          // Control point for quadratic bezier (perpendicular to line)
          const controlLng = midLng - (dy / distance) * arcHeight;
          const controlLat = midLat + (dx / distance) * arcHeight;
          
          // Generate points along bezier curve
          for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const lng = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * controlLng + t * t * end[0];
            const lat = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * controlLat + t * t * end[1];
            coordinates.push([lng, lat]);
          }
          
          return coordinates;
        };

        const arcCoordinates = createArcCoordinates(
          [businessLng, businessLat],
          [planlifeLng, planlifeLat]
        );

        // Add arched line
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: arcCoordinates
            }
          }
        });

        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#0da9e4',
            'line-width': 4,
            'line-opacity': 1
          }
        });

        // Business marker (primary color)
        const businessEl = document.createElement('div');
        businessEl.style.width = '32px';
        businessEl.style.height = '32px';
        businessEl.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzBkYTllNCIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iIzBkYTllNCIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjUiIGZpbGw9IndoaXRlIi8+PC9zdmc+)';
        businessEl.style.backgroundSize = 'contain';

        new mapboxgl.Marker(businessEl)
          .setLngLat([businessLng, businessLat])
          .addTo(map.current);

        // Planlife marker (secondary color)
        const planlifeEl = document.createElement('div');
        planlifeEl.style.width = '32px';
        planlifeEl.style.height = '32px';
        planlifeEl.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzI4M2U1YSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iIzI4M2U1YSIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjUiIGZpbGw9IndoaXRlIi8+PC9zdmc+)';
        planlifeEl.style.backgroundSize = 'contain';

        new mapboxgl.Marker(planlifeEl)
          .setLngLat([planlifeLng, planlifeLat])
          .addTo(map.current);

        setTimeout(() => setIsLoaded(true), 200);

        // Animate: zoom out to show both locations after 1 second
        setTimeout(() => {
          if (!map.current) return;
          
          const bounds = new mapboxgl.LngLatBounds();
          bounds.extend([businessLng, businessLat]);
          bounds.extend([planlifeLng, planlifeLat]);
          
          map.current.fitBounds(bounds, {
            padding: 80,
            duration: 2500,
            essential: true
          });
        }, 1000);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map');
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map');
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [businessLat, businessLng, planlifeLat, planlifeLng]);

  if (mapError) {
    return (
      <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
        <p className="text-white/60 text-sm">{mapError}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        ref={mapContainer} 
        className={`w-full h-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

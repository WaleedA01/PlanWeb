'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface BusinessMapProps {
  latitude: number;
  longitude: number;
}

export default function BusinessMap({ latitude, longitude }: BusinessMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('🗺 BusinessMap component rendered with:', { latitude, longitude });

  useEffect(() => {
    console.log('🔄 Map useEffect triggered - Container:', !!mapContainer.current, 'Map exists:', !!map.current);
    
    // Wait for container to be ready
    if (!mapContainer.current) {
      console.log('⏳ Container not ready yet');
      return;
    }
    
    if (map.current) {
      console.log('✅ Map already exists, skipping initialization');
      return;
    }

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    console.log('🔑 Mapbox token check:', token ? 'Token found' : 'Token missing');
    if (!token) {
      setMapError('Mapbox token not found');
      console.error('NEXT_PUBLIC_MAPBOX_TOKEN is not set');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      console.log('🏛️ Initializing map with center:', [longitude, latitude]);
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/redaplanlife/cml8jq4an00do01s370183ttq',
        center: [longitude, latitude],
        zoom: 10,
        pitch: 0,
        interactive: false,
      });

      // Custom marker with pulsing animation
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundImage = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzBkYTllNCIgZmlsbC1vcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxMiIgZmlsbD0iIzBkYTllNCIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjYiIGZpbGw9IndoaXRlIi8+PC9zdmc+)';
      el.style.backgroundSize = 'contain';
      el.style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';

      marker.current = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(map.current);
      
      // Animate zoom in after map loads
      map.current.on('load', () => {
        if (map.current) {
          // Start zoom and tilt animation immediately
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            pitch: 50,
            duration: 3000,
            essential: true,
            padding: { top: 0, bottom: 200, left: 0, right: 0 }
          });
          
          // Start fade in slightly after animation begins
          setTimeout(() => {
            setIsLoaded(true);
          }, 200);
        }
      });
      
      console.log('✅ Map and marker initialized successfully');

      map.current.on('error', (e) => {
        console.error('❌ Map error:', e);
        setMapError('Failed to load map');
      });
    } catch (error) {
      console.error('❌ Error initializing map:', error);
      setMapError('Failed to initialize map');
    }

    return () => {
      console.log('🧹 Cleaning up map');
      marker.current?.remove();
      map.current?.remove();
      map.current = null;
    };
  }, [latitude, longitude]);

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
        className={`w-full h-[120%] absolute top-0 left-0 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" 
        style={{
          background: 'linear-gradient(to top, hsl(229, 36%, 25%) 0%, hsl(229, 36%, 25% / 0.95) 15%, hsl(229, 36%, 25% / 0.7) 35%, hsl(229, 36%, 25% / 0.4) 55%, hsl(229, 36%, 25% / 0.15) 75%, transparent 100%)'
        }} 
      />
    </div>
  );
}

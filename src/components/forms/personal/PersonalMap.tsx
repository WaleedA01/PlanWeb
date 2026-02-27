'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { CAR_DATA } from '@/lib/carData';
import { getVehicleType } from '@/lib/nhtsaApi';
import { Group } from 'three';
import * as THREE from 'three';

interface PersonalMapProps {
  latitude: number;
  longitude: number;
  show3DObject?: boolean;
  objectType?: 'car' | 'house';
  carMake?: string;
  carModel?: string;
  carYear?: string;
}

function CarModel({ carType }: { carType: string }) {
  const modelFile = CAR_DATA.models[carType as keyof typeof CAR_DATA.models] || CAR_DATA.models.sedan;
  const { scene } = useGLTF(`/models/${modelFile}`);
  const groupRef = useRef<Group>(null);
  const clonedScene = useRef(scene.clone());
  
  useEffect(() => {
    clonedScene.current = scene.clone();
    clonedScene.current.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.color.set('#e8e8e8');
      }
    });
  }, [scene]);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={groupRef}>
      <primitive object={clonedScene.current} scale={0.8} position={[0, 0, 0]} />
    </group>
  );
}

function HouseModel() {
  const { scene } = useGLTF('/models/Small House.glb');
  const groupRef = useRef<Group>(null);
  const clonedScene = useRef(scene.clone());
  
  useEffect(() => {
    clonedScene.current = scene.clone();
    
    // Center the model by calculating bounding box
    const box = new THREE.Box3().setFromObject(clonedScene.current);
    const center = box.getCenter(new THREE.Vector3());
    
    // Apply centering to all children
    clonedScene.current.traverse((child: any) => {
      if (child.isMesh) {
        child.geometry.translate(-center.x, -center.y, -center.z);
        if (child.material) {
          child.material = child.material.clone();
          child.material.color.set('#e8e8e8');
        }
      }
    });
  }, [scene]);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={groupRef}>
      <primitive object={clonedScene.current} scale={1.5} position={[0, 0.8, 0]} />
    </group>
  );
}

export default function PersonalMap({ latitude, longitude, show3DObject = false, objectType = 'car', carMake, carModel, carYear }: PersonalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCar, setShowCar] = useState(false);
  const [carType, setCarType] = useState('sedan');

  useEffect(() => {
    if (show3DObject && objectType === 'car' && carMake && carModel && carYear) {
      getVehicleType(carMake, carModel, carYear).then(setCarType);
    }
  }, [show3DObject, objectType, carMake, carModel, carYear]);

  useEffect(() => {
    setShowCar(false);
  }, [latitude, longitude]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setMapError('Mapbox token not found');
      return;
    }

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/planlifemapbox/cmm3kuwzo00l201s3geg8azit',
        center: [longitude, latitude],
        zoom: 10,
        pitch: 0,
        interactive: false,
      });

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = show3DObject ? '80px' : '40px';
      el.style.height = show3DObject ? '80px' : '40px';
      el.style.backgroundImage = show3DObject 
        ? 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzBkYTllNCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIzMCIgZmlsbD0iIzBkYTllNCIgZmlsbC1vcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIyMCIgZmlsbD0iIzBkYTllNCIgZmlsbC1vcGFjaXR5PSIwLjQiLz48L3N2Zz4=)'
        : 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzBkYTllNCIgZmlsbC1vcGFjaXR5PSIwLjIiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxMiIgZmlsbD0iIzBkYTllNCIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjYiIGZpbGw9IndoaXRlIi8+PC9zdmc+)';
      el.style.backgroundSize = 'contain';
      el.style.animation = show3DObject 
        ? 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';

      marker.current = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(map.current);
      
      map.current.on('load', () => {
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            pitch: 50,
            duration: 3000,
            essential: true,
            padding: { top: 0, bottom: 200, left: 0, right: 0 }
          });
          
          setTimeout(() => setIsLoaded(true), 200);
          setTimeout(() => setShowCar(true), 2500);
        }
      });
    } catch (error) {
      setMapError('Failed to initialize map');
    }

    return () => {
      marker.current?.remove();
      map.current?.remove();
      map.current = null;
    };
  }, [latitude, longitude, show3DObject]);

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
      {show3DObject && (
        <div 
          className={`absolute pointer-events-none z-10 transition-all duration-300 ease-out ${
            showCar ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            top: 'calc(50% - 20px)',
            left: 'calc(51%)',
            transform: 'translate(-54%, -65%)',
            width: '128px',
            height: '128px',
            filter: 'grayscale(70%) brightness(1.5)'
          }}
        >
          <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
            <ambientLight intensity={50} color="#031324" />
            <directionalLight position={[5, 5, 5]} intensity={10.8} color="#10377c" />
            <directionalLight position={[-5, 3, -5]} intensity={10.3} color="#04242c" />
            <Suspense fallback={null}>
              {objectType === 'car' ? (
                <CarModel key={carType} carType={carType} />
              ) : (
                <HouseModel />
              )}
            </Suspense>
          </Canvas>
        </div>
      )}
      <div 
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none" 
        style={{
          background: 'linear-gradient(to top, hsl(229, 36%, 25%) 0%, hsl(229, 36%, 25% / 0.95) 15%, hsl(229, 36%, 25% / 0.7) 35%, hsl(229, 36%, 25% / 0.4) 55%, hsl(229, 36%, 25% / 0.15) 75%, transparent 100%)'
        }} 
      />
    </div>
  );
}

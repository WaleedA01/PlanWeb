'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, useGLTF, Environment } from '@react-three/drei';
import { CAR_DATA } from '@/lib/carData';
import { getVehicleType } from '@/lib/nhtsaApi';
import { Group } from 'three';

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#101010"
        metalness={0.5}
      />
    </mesh>
  );
}

function CarModel({ carType }: { carType: string }) {
  const modelFile = CAR_DATA.models[carType as keyof typeof CAR_DATA.models] || CAR_DATA.models.sedan;
  const { scene } = useGLTF(`/models/${modelFile}`);
  const groupRef = useRef<Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
    </group>
  );
}

interface CarShowroomProps {
  make: string;
  model: string;
  year: string;
}

export default function CarShowroom({ make, model, year }: CarShowroomProps) {
  const [carType, setCarType] = useState('sedan');

  useEffect(() => {
    getVehicleType(make, model, year).then(setCarType);
  }, [make, model, year]);

  return (
    <div className="relative w-full h-full">
      <Canvas key={`${make}-${model}-${year}-${carType}`} dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 1.5, 7] }}>
        <fog attach="fog" args={['#101010', 0, 15]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        
        <Suspense fallback={null}>
          <CarModel key={carType} carType={carType} />
          <ReflectiveFloor />
        </Suspense>
        
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

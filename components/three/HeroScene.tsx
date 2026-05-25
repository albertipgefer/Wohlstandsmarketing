"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function GlassObject() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.3;
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.z = Math.cos(t * 0.2) * 0.15;

    // Subtle mouse parallax
    const mx = state.pointer.x * 0.35;
    const my = state.pointer.y * 0.25;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mx, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, my, 0.05);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} scale={2.6}>
        <torusKnotGeometry args={[0.7, 0.26, 220, 32, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.4}
          thickness={0.6}
          chromaticAberration={0.08}
          anisotropy={0.4}
          ior={1.45}
          roughness={0.05}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.15}
          transmission={1}
          color="#ffffff"
          attenuationColor="#bfd4ff"
          attenuationDistance={1.2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />

      {/* Blue key light — top-left */}
      <pointLight
        position={[-6, 5, 4]}
        intensity={4.5}
        color="#1663de"
        distance={20}
      />

      {/* Orange rim light — bottom-right */}
      <pointLight
        position={[6, -4, 3]}
        intensity={3.5}
        color="#db6f16"
        distance={20}
      />

      {/* Soft white fill from behind */}
      <pointLight
        position={[0, 0, -6]}
        intensity={2}
        color="#ffffff"
        distance={15}
      />

      <Environment preset="studio" environmentIntensity={0.4} />
      <GlassObject />
    </Canvas>
  );
}

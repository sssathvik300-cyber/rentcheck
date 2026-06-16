import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GhostMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const { x, y } = state.pointer;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        x * 0.4 + state.clock.elapsedTime * 0.15,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -y * 0.4,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        Math.sin(state.clock.elapsedTime * 0.5) * 0.15 + y * 0.2,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef as any}
          color="#FF6B00"
          emissive="#FF6B00"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (ref.current) {
      const { x, y } = state.pointer;
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        state.clock.elapsedTime * 0.02 + x * 0.1,
        0.05
      );
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        state.clock.elapsedTime * 0.01 - y * 0.1,
        0.05
      );
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FF6B00"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GlowRing() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const { x, y } = state.pointer;
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2 - y * 0.3,
        0.05
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        x * 0.3,
        0.05
      );
    }
  });

  return (
    <mesh ref={ref} scale={3.5}>
      <torusGeometry args={[1, 0.01, 16, 100]} />
      <meshBasicMaterial color="#FF6B00" transparent opacity={0.3} />
    </mesh>
  );
}

export default function GhostScene({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FF6B00" />
        <directionalLight position={[-5, -3, 3]} intensity={0.3} color="#FFB347" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#FF6B00" />
        <GhostMesh />
        <Particles />
        <GlowRing />
      </Canvas>
    </div>
  );
}

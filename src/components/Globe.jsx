import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  useTexture,
} from "@react-three/drei";
import React, { Suspense } from "react";

const Globe = () => {
  const colorTexture = useTexture("../src/assets/2k_earth_daymap.jpg");

  const colorTexture2 = useTexture("../src/assets/2k_earth_clouds.jpg");

  return (
    <Suspense fallback="../src/assets/Manav Logo 2021.png">
      <PerspectiveCamera makeDefault position={[0, 1, 2.2]} />
      <ambientLight color={0xffffff} intensity={0.4} castShadow={true} />
      <pointLight color="#f6f3ea" position={[10, 1, -2]} intensity={2} />

      <OrbitControls
        enableRotate={true}
        enablePan={true}
        panSpeed={0.5}
        rotateSpeed={0.2}
        enableZoom={false}
        autoRotate={true}
      />
      <Stars
        radius={200}
        depth={500}
        count={8000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh>
        <sphereGeometry args={[1.005, 30, 30]} />
        <meshPhongMaterial
          map={colorTexture2}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1, 30, 30]} />
        <meshStandardMaterial
          map={colorTexture}
          //   side={THREE.DoubleSide}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </Suspense>
  );
};

export default Globe;

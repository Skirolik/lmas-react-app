import React, { Suspense, useState } from "react";
import * as THREE from "three";
import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Stars,
  useTexture,
} from "@react-three/drei";

const Earthpit_design = () => {
  const [color, setColor] = useState("green");

  const handleBoxClick = () => {
    setColor((prevColor) => (prevColor === "green" ? "red" : "green"));
  };

  return (
    <Suspense fallback="../src/assets/Manav Logo 2021.png">
      {/* <OrbitControls /> */}
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <mesh
        position={[0, 1, 0]}
        onClick={handleBoxClick} // Add click event handler
      >
        <boxGeometry args={[1, 1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-3, 3, 0]}>
        <cylinderGeometry args={[1, 1, 1, 24]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[3, 3, 0]}>
        <cylinderGeometry args={[1, 1, 1, 24]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Create a line between the box and cylinder */}
      {createLine([0, 1, 0], [-3, 3, 0], color)}{" "}
      {createLine([0, 1, 0], [3, 3, 0], color)} {/* Pass the color as a prop */}
      <ambientLight args={["#fffffff", 1]} />
      <directionalLight args={["#ffffe0", 1]} position={[-2, 1, 1]} />
    </Suspense>
  );
};

// Function to create a line between two points
const createLine = (start, end, color) => {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([...start, ...end]);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.LineBasicMaterial({ color });
  const line = new THREE.Line(geometry, material);

  return <primitive object={line} />;
};

export default Earthpit_design;

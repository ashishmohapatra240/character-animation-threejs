import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useControls } from 'leva';

export const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: "Kick",
      options: ["Kick", "Standing", "Falling"]
    }
  });

  return (
    <>
      <OrbitControls />
      <Sky/>
      <Environment preset="sunset" />"
      <group position-y={-1}>
        <Avatar animation={animation} />
      </group>
      <mesh receiveShadow scale={5} rotation-x={-Math.PI*0.5} position-y={-1}>
        <planeGeometry/>
        <meshStandardMaterial color="white"/>
      </mesh>
    </>
  );
};

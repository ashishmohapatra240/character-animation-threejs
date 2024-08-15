import React, { useEffect, useRef } from 'react'
import { useAnimations, useFBX, useGLTF, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import * as THREE from 'three';

export function Avatar({ animation, ...props }) {
    const { headFollow, cursorFollow } = useControls({
        headFollow: false,
        cursorFollow: false
    });

    const group = useRef();
    const { nodes, materials } = useGLTF('models/Ashish.glb');
    const kickAnimation = useFBX('animations/IDK.fbx');
    const standingAnimation = useFBX('animations/Standing Idle.fbx');
    const fallingAnimation = useFBX('animations/Falling.fbx');

    kickAnimation.animations[0].name = "Kick";
    standingAnimation.animations[0].name = "Standing";
    fallingAnimation.animations[0].name = "Falling";

    const { actions } = useAnimations([kickAnimation.animations[0], standingAnimation.animations[0], fallingAnimation.animations[0]], group);

    useEffect(() => {
        actions[animation]?.reset().play();
        return () => {
            actions[animation]?.reset().stop();
        }
    }, [animation]);

    useFrame((state) => {
        if (headFollow) {
            const head = group.current.getObjectByName("Head");
            if (head) {
                head.lookAt(state.camera.position);
            }
        }

        if (cursorFollow) {
            const spine2 = group.current.getObjectByName("Spine2");
            if (spine2) {
                const mousePosition = new THREE.Vector3(state.mouse.x, state.mouse.y, 0.5);
                mousePosition.unproject(state.camera);
                const dir = mousePosition.sub(state.camera.position).normalize();
                const distance = -state.camera.position.z / dir.z;
                const position = state.camera.position.clone().add(dir.multiplyScalar(distance));
                spine2.lookAt(position);
            }
        }
    });

    return (
        <group {...props} ref={group} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <primitive object={nodes.Hips} />
                <skinnedMesh
                    name="EyeLeft"
                    geometry={nodes.EyeLeft.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeLeft.skeleton}
                    morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                />
                <skinnedMesh
                    name="EyeRight"
                    geometry={nodes.EyeRight.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeRight.skeleton}
                    morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Head"
                    geometry={nodes.Wolf3D_Head.geometry}
                    material={materials.Wolf3D_Skin}
                    skeleton={nodes.Wolf3D_Head.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Teeth"
                    geometry={nodes.Wolf3D_Teeth.geometry}
                    material={materials.Wolf3D_Teeth}
                    skeleton={nodes.Wolf3D_Teeth.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Hair.geometry}
                    material={materials.Wolf3D_Hair}
                    skeleton={nodes.Wolf3D_Hair.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Top.geometry}
                    material={materials.Wolf3D_Outfit_Top}
                    skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                    material={materials.Wolf3D_Outfit_Bottom}
                    skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                    material={materials.Wolf3D_Outfit_Footwear}
                    skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Body.geometry}
                    material={materials.Wolf3D_Body}
                    skeleton={nodes.Wolf3D_Body.skeleton}
                />
            </group>
        </group>
    );
}

useGLTF.preload('models/Ashish.glb');
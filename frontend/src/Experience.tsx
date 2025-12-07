import { OrbitControls, useTexture, Environment } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import * as THREE from "three"
import Hand from "./Components/Hand"
import JengaTower from "./Components/JengaTower"
import { EffectComposer, Vignette, Bloom, HueSaturation } from '@react-three/postprocessing'

export default function Experience() {
    const floorTexture = useTexture("Assets/grid.png")

    floorTexture.repeat.set(20, 20)
    floorTexture.colorSpace = THREE.SRGBColorSpace
    floorTexture.wrapS = THREE.RepeatWrapping
    floorTexture.wrapT = THREE.RepeatWrapping

    return (
        <>  
            <EffectComposer>
                <Bloom intensity={0.3} radius={0.4} luminanceThreshold={0.9} />
                <Vignette offset={0.1} darkness={0.8}></Vignette>
                <HueSaturation saturation={0.55}></HueSaturation>
            </EffectComposer>
            <OrbitControls target={[1,2.0,-3]}></OrbitControls>
            <Environment backgroundRotation={[0,5,0]} background={true} environmentIntensity={0.1} backgroundIntensity={0.8} files="Assets/autumn_field_puresky_4k.jpg" colorSpace={THREE.SRGBColorSpace}></Environment>
            <Physics timeStep={"vary"}>
                <JengaTower></JengaTower>
                {/* <Projectile></Projectile> */}
                <Hand></Hand>

                {/* <RigidBody colliders={"ball"}>
                    <mesh castShadow position-y={0} position-z={-3} scale={0.4}>
                        <sphereGeometry></sphereGeometry>
                        <meshStandardMaterial color={"mediumblue"}></meshStandardMaterial>
                    </mesh>
                </RigidBody> */}

                <RigidBody type={"fixed"}>
                    <mesh position-y={-1} rotation-x={-Math.PI/2} receiveShadow>
                        <planeGeometry args={[200, 200]}></planeGeometry>
                        <meshStandardMaterial map={floorTexture} roughness={0.1} metalness={0.2} envMapIntensity={0.9}> </meshStandardMaterial>
                    </mesh>
                </RigidBody>
            </Physics>

            <directionalLight position={[-6, 5, 8]} intensity={2} shadow-normalBias={ 0.05 } castShadow></directionalLight>
            {/* <directionalLight position={[-3,10,-2]} intensity={5} shadow-normalBias={ 0.05 }></directionalLight> */}
            <ambientLight intensity={0.5}></ambientLight>
        </>
    )
}
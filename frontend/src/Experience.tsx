import { OrbitControls } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"
import Hand from "./Components/Hand"
import JengaTower from "./Components/JengaTower"

export default function Experience() {

    return (
        <>
            <color args={["#4a4a4a"]}attach="background"></color>
            <OrbitControls target={[3,2.0,-3]}></OrbitControls>

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
                    <mesh position-y={-1} scale={50} rotation-x={-Math.PI/2} receiveShadow>
                        <planeGeometry></planeGeometry>
                        <meshStandardMaterial color={"#0b0b0b"}> </meshStandardMaterial>
                    </mesh>
                </RigidBody>
            </Physics>

            <directionalLight position={[2,10,2]} intensity={5} shadow-normalBias={ 0.05 } castShadow></directionalLight>
            <directionalLight position={[-3,10,-2]} intensity={5} shadow-normalBias={ 0.05 }></directionalLight>
            <ambientLight intensity={4}></ambientLight>
        </>
    )
}
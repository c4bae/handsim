import { OrbitControls } from "@react-three/drei"
import "@react-three/fiber"
import { Physics, RigidBody } from "@react-three/rapier"
import Hand from "./Components/Hand"
import Projectile from "./Components/Projectile"
import JengaTower from "./Components/JengaTower"

export default function Experience() {

    return (
        <>
            <OrbitControls></OrbitControls>

            <Physics timeStep={"vary"}>
                <JengaTower></JengaTower>
                <Projectile></Projectile>
                <Hand></Hand>

                <RigidBody colliders={"ball"}>
                    <mesh castShadow position-y={0} position-z={-3} scale={0.4}>
                        <sphereGeometry></sphereGeometry>
                        <meshStandardMaterial color={"mediumblue"}></meshStandardMaterial>
                    </mesh>
                </RigidBody>

                <RigidBody type={"fixed"}>
                    <mesh position-y={-1} scale={10} rotation-x={-Math.PI/2} receiveShadow>
                        <planeGeometry></planeGeometry>
                        <meshStandardMaterial color={"white"}></meshStandardMaterial>
                    </mesh>
                </RigidBody>
            </Physics>


            <directionalLight position={[2,2,2]} intensity={2.8} castShadow></directionalLight>
            <ambientLight></ambientLight>
        </>
    )
}
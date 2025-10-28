import { RigidBody } from "@react-three/rapier"
import { useState } from "react";

export default function JengaTower() {
    const [key, setKey] = useState<number>(0)
    const towerHeight = 10;

    document.addEventListener("visibilitychange", () => {
        if(document.visibilityState == "visible") {
            console.log("tab is shown")
            setKey((key) => key + 1)
        }
        else {
            console.log("tab is gone")
        }
    })
    return (
        <group position-z={-2} key={key}>
            {[...Array(towerHeight)].map((_, index) => {
                // Two cases (index % 2 == 0) (index % 2 != 0) allows for rotated layers
                if(index % 2 == 0) {
                    return (
                        <group position-y={index - index*0.3} key={index}>
                            <RigidBody>
                                <mesh position-x={0} scale={[0.6,0.6,1.8]} layers={1} castShadow receiveShadow>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"#c2974e"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={0.62} scale={[0.6,0.6,1.8]} layers={1} castShadow receiveShadow>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"#c2974e"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={1.24} scale={[0.6,0.6,1.8]} layers={1} castShadow receiveShadow>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"#c2974e"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                        </group>
                    )
                }
                else {
                    return (
                        <group position-y={index - index*0.3} rotation-y={Math.PI/2}>
                            <RigidBody>
                                <mesh position-x={-0.62} position-z={0.6} scale={[0.6,0.6,1.8]} layers={1} castShadow receiveShadow>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"#c2974e"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={0} position-z={0.6} scale={[0.6,0.6,1.8]} layers={1} castShadow receiveShadow>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"#c2974e"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={0.62} position-z={0.6} scale={[0.6,0.6,1.8]} layers={1} castShadow receiveShadow>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"#c2974e"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                        </group>
                    )
                }
            })}
        </group>
    )
}
import { RigidBody } from "@react-three/rapier"

export default function JengaTower() {
    const towerHeight = 10;

    return (
        <group position-z={2}>
            {[...Array(towerHeight)].map((_, index) => {
                // Two cases (index % 2 == 0) (index % 2 != 0) allows for rotated layers
                if(index % 2 == 0) {
                    return (
                        <group position-y={index/6}>
                            <RigidBody>
                                <mesh position-x={0} scale={[0.3,0.3,0.9]}>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"red"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={0.31} scale={[0.3,0.3,0.9]}>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"red"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={0.62} scale={[0.3,0.3,0.9]}>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"red"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                        </group>
                    )
                }
                else {
                    return (
                        <group position-y={index/6} rotation-y={Math.PI/2}>
                            <RigidBody>
                                <mesh position-x={-0.31} position-z={0.3} scale={[0.3,0.3,0.9]}>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"red"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={0} position-z={0.3} scale={[0.3,0.3,0.9]}>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"red"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                            <RigidBody>
                                <mesh position-x={0.31} position-z={0.3} scale={[0.3,0.3,0.9]}>
                                    <boxGeometry></boxGeometry>
                                    <meshStandardMaterial color={"red"}></meshStandardMaterial>
                                </mesh>
                            </RigidBody>
                        </group>
                    )
                }
            })}
        </group>
    )
}
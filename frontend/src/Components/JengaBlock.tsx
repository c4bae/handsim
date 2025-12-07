import { RigidBody, RapierRigidBody } from "@react-three/rapier"
import type { ThreeElements } from "@react-three/fiber"
import { useRef } from "react"

export default function JengaBlock(props: ThreeElements["mesh"]) {
    const blockRb = useRef<RapierRigidBody | null>(null)

    return (
        <RigidBody ref={blockRb} type="dynamic">
            <mesh {...props} userData={{blockRbRef: blockRb}} scale={[0.6,0.6,1.8]} layers={1} castShadow receiveShadow>
                <boxGeometry></boxGeometry>
                <meshStandardMaterial color={"#f2d1a2"}></meshStandardMaterial>
            </mesh>
        </RigidBody>
    )
}
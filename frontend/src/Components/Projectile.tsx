import { useEffect, useRef } from "react";
import useHandData from "../Hooks/useHandData";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

interface handLandmarkData {
    landmarks: number[][]
}

export default function Projectile() {
    const handLandmarkRef = useHandData()
    const landmarkData = useRef<handLandmarkData | null>(null)
    const ballRb = useRef<RapierRigidBody | null>(null)

    // Show the projectile, then align it along the handʻs palm
    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if(ballRb.current && landmarkData.current && event.code == "Space") {
                // Align ball (projectile) along handʻs palm

                const ballX = -(landmarkData.current.landmarks[0][0] - 1280/2) / (1280/2) * 3 + 0.4
                const ballY= -(landmarkData.current.landmarks[0][1] - 720/2) / (720/2) + 0.7
                const ballZ = landmarkData.current.landmarks[0][2] / 200 - 0.7

                // Sets the ballʻs position
                ballRb.current.setTranslation({x:ballX, y:ballY, z:ballZ}, true)
                ballRb.current.applyImpulse({x:0, y:0, z: -5}, true)

                setTimeout(() => {
                    if(ballRb.current) ballRb.current.applyImpulse({x:0, y:0, z: -5}, true)
                }, 200)
            }
        })
    })

    useFrame(() => {
        if(handLandmarkRef.current != null) {
            landmarkData.current = handLandmarkRef.current
        }
    })

    return (
        <RigidBody ref={ballRb} position={[0,-10,2]} colliders={"ball"}>
            <mesh scale={0.5}>
                <sphereGeometry></sphereGeometry>
                <meshStandardMaterial color={"cornflowerblue"}></meshStandardMaterial> 
            </mesh>
        </RigidBody>
    )
}
import useHandData from "../Hooks/useHandData";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import React from "react";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

interface handLandmarkData {
    landmarks: number[][]
}
export default function Hand() {
    const handLandmarkRef = useHandData()
    const spheresRef = useRef<React.RefObject<RapierRigidBody | null>[]>([])
    const landmarkData = useRef<handLandmarkData | null>(null);

    // Build the 21 refs for each hand landmark as part of a 21-element long array
    spheresRef.current = Array(21)
        .fill(0)
        .map((_, i) => {
            return spheresRef.current[i] = React.createRef() 
        })

    useFrame(() => {
        if(handLandmarkRef.current != null && handLandmarkRef.current.landmarks != null) {
            landmarkData.current = handLandmarkRef.current

            landmarkData.current["landmarks"].forEach((list, index) => {
                    const x = -(list[0] - 1280/2) / (1280/2) * 3
                    const y = -(list[1] - 720/2) / (720/2) + 0.5
                    const z = list[2] / 200

                    // Update the position of each landmark using kinematic translation
                    spheresRef.current[index]?.current?.setNextKinematicTranslation({x:x, y:y, z:z})
            })
        }
    })
    
    return (
        <>
            {[...Array(21)].map((_, index) =>
                <RigidBody key={index} ref={spheresRef.current[index]} type={"kinematicPosition"}>
                    <mesh scale={0.09} castShadow>
                        <sphereGeometry></sphereGeometry>
                        <meshStandardMaterial color={"blue"}></meshStandardMaterial>
                    </mesh>
                </RigidBody>
            )}
        </>
    )
}
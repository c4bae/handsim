import useHandData from "../Hooks/useHandData";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import React from "react";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import HandLines from "./HandLines";
import RaycasterSettings from "./RaycasterSettings"

interface handLandmarkData {
    landmarks: number[][]
}

export default function Hand() {
    const handLandmarkRef = useHandData()
    const spheresRef = useRef<React.RefObject<RapierRigidBody | null>[]>([])
    const zFactor = useRef<number>(0)
    const landmarkData = useRef<handLandmarkData | null>(null)

    // Build the 21 refs for each hand landmark as part of a 21-element long array
    // Note that we donʻt place this code in a useEffect hook as it occurs after the first render, 
    // meaning the refs wonʻt exist when the 21 rigidbodys are rendered (prev mistake)
    spheresRef.current = Array(21)
        .fill(0)
        .map((_, i) => {
            return spheresRef.current[i] = React.createRef() 
        })

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if(event.code == "KeyW") {
                zFactor.current -= 0.1
            }
            else if(event.code == "KeyS") {
                zFactor.current += 0.1
            }
        })
    })

    useFrame(() => {
        if(handLandmarkRef.current != null && handLandmarkRef.current.landmarks != null) {
            landmarkData.current = handLandmarkRef.current

            landmarkData.current["landmarks"].forEach((list, index) => {
                    const x = -(list[0] - 1280/2) / (1280/2) * 3
                    const y = -(list[1] - 720/2) / (720/2) * 1.5 + 3
                    const z = list[2] / 200 + zFactor.current

                    // Update the position of each landmark using kinematic translation
                    spheresRef.current[index]?.current?.setNextKinematicTranslation({x,y,z})
            })
        }
    })
    
    return (
        <>
            {[...Array(21)].map((_, index) =>
                <RigidBody colliders={false} key={index} ref={spheresRef.current[index] } type={"kinematicPosition"}>
                    <mesh scale={0.06} castShadow>
                        <sphereGeometry></sphereGeometry>
                        <meshStandardMaterial color={"blue"}></meshStandardMaterial>
                    </mesh>
                </RigidBody>
            )}
            <HandLines landMarkData={landmarkData} zFactor={zFactor}></HandLines>
            <RaycasterSettings landMarkData={landmarkData}></RaycasterSettings>
        </>
    )
}
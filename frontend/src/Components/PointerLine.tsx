import { useState } from "react"
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";

interface handLandmarkData {
    landmarks: number[][]
}

type landmarkData = {
    landMarkData: React.RefObject<handLandmarkData | null>,
}

export default function HandLines({landMarkData}: landmarkData) {
    const [nearPoint, setNearPoint] = useState<[number, number, number] | null>(null)
    const [farPoint, setFarPoint] = useState<[number, number, number] | null>(null)
    
    useFrame(() => {
        const data = landMarkData.current
        if(data) {
            const x = -(data["landmarks"][7][0] - 1280/2) / (1280/2) * 3
            const y = -(data["landmarks"][7][1] - 720/2) / (720/2) + 0.2
            const z = data["landmarks"][7][2] / 200

            // Find the direction vector based on the position of the seventh and eight landmark, then extend the distance of the formed line
            const farX = (-(data["landmarks"][8][0] - 1280/2) / (1280/2) * 3 - x) * 50
            const farY = (-(data["landmarks"][8][1] - 720/2) / (720/2) + 0.2 - y) * 50
            const farZ = (data["landmarks"][8][2] / 200 - z) * 50
            
            setNearPoint([x,y,z])
            setFarPoint([farX,farY,farZ])
        }
        


    })

    return (
        <Line lineWidth={2} color={"blue"} points={[[...nearPoint ?? [0,-50,0]], [...farPoint ?? [0,-50,0]]]}></Line>
    )
}

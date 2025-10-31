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
    const [stateLandMarkData, setstateLandMarkData] = useState<handLandmarkData | null>(null)
    
    useFrame(() => {
        setstateLandMarkData(landMarkData.current)
    })

    return (
        <>
            {[...Array(20)].map((_, index) => {
                if (stateLandMarkData) {
                    const x = -(stateLandMarkData["landmarks"][index][0] - 1280/2) / (1280/2) * 3
                    const y = -(stateLandMarkData["landmarks"][index][1] - 720/2) / (720/2) * 1.5 + 3
                    const z = stateLandMarkData["landmarks"][index][2] / 200

                    const nextX = -(stateLandMarkData["landmarks"][index+1][0] - 1280/2) / (1280/2) * 3
                    const nextY = -(stateLandMarkData["landmarks"][index+1][1] - 720/2) / (720/2) * 1.5 + 3
                    const nextZ = stateLandMarkData["landmarks"][index+1][2] / 200

                    if (index == 0) {
                        return ( <> 
                            <Line points={[[x,y,z],[nextX,nextY,nextZ]]} lineWidth={5} color={"blue"}></Line>
                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+1][0] - 1280/2) / (1280/2) * 3,
                                -(stateLandMarkData["landmarks"][index+1][1] - 720/2) / (720/2) * 1.5 + 3,
                                stateLandMarkData["landmarks"][index+1][2] / 200
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+5][0] - 1280/2) / (1280/2) * 3,
                                -(stateLandMarkData["landmarks"][index+5][1] - 720/2) / (720/2) * 1.5 + 3,
                                stateLandMarkData["landmarks"][index+5][2] / 200
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+9][0] - 1280/2) / (1280/2) * 3,
                                -(stateLandMarkData["landmarks"][index+9][1] - 720/2) / (720/2) * 1.5 + 3,
                                stateLandMarkData["landmarks"][index+9][2] / 200
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+13][0] - 1280/2) / (1280/2) * 3,
                                -(stateLandMarkData["landmarks"][index+13][1] - 720/2) / (720/2) * 1.5 + 3,
                                stateLandMarkData["landmarks"][index+13][2] / 200
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+17][0] - 1280/2) / (1280/2) * 3,
                                -(stateLandMarkData["landmarks"][index+17][1] - 720/2) / (720/2) * 1.5 + 3,
                                stateLandMarkData["landmarks"][index+17][2] / 200
                            ]]} lineWidth={5} color={"blue"}> </Line>
                            </>)
                    }

                    // Ensure spheres at the bottom of each "finger" connect
                    if (index == 5 || index == 9 || index == 13 ) {
                        return ( <> 
                            <Line points={[[x,y,z],[nextX,nextY,nextZ]]} lineWidth={5} color={"blue"}></Line>
                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+4][0] - 1280/2) / (1280/2) * 3,
                                -(stateLandMarkData["landmarks"][index+4][1] - 720/2) / (720/2) * 1.5 + 3,
                                stateLandMarkData["landmarks"][index+4][2] / 200
                            ]]} lineWidth={5} color={"blue"}> </Line>
                            </>)
                    }
                    // Ensure spheres at the top of each "finger" do not have a connecting line
                    if (index % 4 != 0)
                    return <Line key={index} points={[[x,y,z],[nextX,nextY,nextZ]]} lineWidth={5} color={"blue"}></Line>
                }    
            })}
            {}
        </>
    )
}
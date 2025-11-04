import { useState } from "react"
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";

interface handLandmarkData {
    landmarks: number[][]
}

type handLinesProps = {
    landMarkData: React.RefObject<handLandmarkData | null>,
    zFactor: React.RefObject<number>
}

export default function HandLines({landMarkData, zFactor}: handLinesProps) {
    const [stateLandMarkData, setstateLandMarkData] = useState<handLandmarkData | null>(null)
    const [zHandFactor, setZHandFactor] = useState<number>(0)
    
    useFrame(() => {
        setstateLandMarkData(landMarkData.current)
        setZHandFactor(zFactor.current)
    })

    return (
        <>
            {[...Array(20)].map((_, index) => {
                if (stateLandMarkData) {
                    const x = -(stateLandMarkData["landmarks"][index][0] - 1280/2) / (1280/2) * 3
                    const y = (1 - stateLandMarkData["landmarks"][index][1] / 720) * 4 + 1
                    const z = stateLandMarkData["landmarks"][index][2] / 200 + zHandFactor

                    const nextX = -(stateLandMarkData["landmarks"][index+1][0] - 1280/2) / (1280/2) * 3
                    const nextY = (1 - stateLandMarkData["landmarks"][index+1][1] / 720) * 4 + 1
                    const nextZ = stateLandMarkData["landmarks"][index+1][2] / 200 + zHandFactor

                    if (index == 0) {
                        return ( <> 
                            <Line points={[[x,y,z],[nextX,nextY,nextZ]]} lineWidth={5} color={"blue"}></Line>
                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+1][0] - 1280/2) / (1280/2) * 3,
                                (1 - stateLandMarkData["landmarks"][index+1][1] / 720) * 4 + 1,
                                stateLandMarkData["landmarks"][index+1][2] / 200 + zHandFactor
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+5][0] - 1280/2) / (1280/2) * 3,
                                (1 - stateLandMarkData["landmarks"][index+5][1] / 720) * 4 + 1,
                                stateLandMarkData["landmarks"][index+5][2] / 200 + zHandFactor
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+9][0] - 1280/2) / (1280/2) * 3,
                                (1 - stateLandMarkData["landmarks"][index+9][1] / 720) * 4 + 1,
                                stateLandMarkData["landmarks"][index+9][2] / 200 + zHandFactor
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+13][0] - 1280/2) / (1280/2) * 3,
                                (1 - stateLandMarkData["landmarks"][index+13][1] / 720) * 4 + 1,
                                stateLandMarkData["landmarks"][index+13][2] / 200 + zHandFactor
                            ]]} lineWidth={5} color={"blue"}> </Line>

                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+17][0] - 1280/2) / (1280/2) * 3,
                                (1 - stateLandMarkData["landmarks"][index+17][1] / 720) * 4 + 1,
                                stateLandMarkData["landmarks"][index+17][2] / 200 + zHandFactor
                            ]]} lineWidth={5} color={"blue"}> </Line>
                            </>)
                    }

                    // Ensure spheres at the bottom of each "finger" connect
                    if (index == 5 || index == 9 || index == 13 ) {
                        return ( <> 
                            <Line points={[[x,y,z],[nextX,nextY,nextZ]]} lineWidth={5} color={"blue"}></Line>
                            <Line points={[[x,y,z], [
                                -(stateLandMarkData["landmarks"][index+4][0] - 1280/2) / (1280/2) * 3,
                                (1 - stateLandMarkData["landmarks"][index+4][1] / 720) * 4 + 1,
                                stateLandMarkData["landmarks"][index+4][2] / 200 + zHandFactor
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
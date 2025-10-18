import { OrbitControls } from "@react-three/drei"
import { useEffect, useState } from "react"
import "@react-three/fiber"
import { Line } from "@react-three/drei"

interface landmarkData {
    landmarks: number[][];
}

// define a type cords that takes in 3 values as an array
type cords = [number, number, number]

export default function Experience() {
    const [landmarkData, setLandmarkData] = useState<landmarkData | null>(null!)

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000")
        socket.addEventListener("message", (event) => {  // message event type means that code executes when data is received through websocket
            setLandmarkData(JSON.parse(event.data))
        })

        return (() => {  // do not directly use socket.close() in return as it will execute it immediately
            socket.close()
        })

    }, [landmarkData])

    return (
        <>
            <OrbitControls></OrbitControls>
            <group>
                {[...Array(21)].map((_, index) => // map iterates through undefined elements, not empty elements
                    {   
                        if(landmarkData && landmarkData.landmarks) {
                            const x = -(landmarkData.landmarks[index][0] - 1280/2) / (1280/2) * 3
                            const y = -(landmarkData.landmarks[index][1] - 720/2) / (720/2) + 0.5
                            const z = landmarkData.landmarks[index][2]/200
                            const cords: cords = [x,y,z]

                            let nextX, nextY, nextZ
                            let nextCords: cords;
                            
                            if(index != 20 && index % 4 != 0) {
                                nextX = -(landmarkData.landmarks[index+1][0] - 1280/2) / (1280/2) * 3
                                nextY = -(landmarkData.landmarks[index+1][1] - 720/2) / (720/2) + 0.5
                                nextZ = landmarkData.landmarks[index+1][2]/200
                                nextCords = [nextX, nextY, nextZ]
                            }
                            const zeroPoint: cords = [
                                -(landmarkData.landmarks[0][0] - 1280/2) / (1280/2) * 3,
                                -(landmarkData.landmarks[0][1] - 720/2) / (720/2) + 0.5,
                                landmarkData.landmarks[0][2]/200
                            ]

                            const ninethPoint: cords = [
                                -(landmarkData.landmarks[9][0] - 1280/2) / (1280/2) * 3,
                                -(landmarkData.landmarks[9][1] - 720/2) / (720/2) + 0.5,
                                landmarkData.landmarks[9][2]/200,
                            ]

                            const thirteenthPoint: cords = [
                                -(landmarkData.landmarks[13][0] - 1280/2) / (1280/2) * 3,
                                -(landmarkData.landmarks[13][1] - 720/2) / (720/2) + 0.5,
                                landmarkData.landmarks[13][2]/200,
                            ]

                            const seventeenthPoint: cords = [
                                -(landmarkData.landmarks[17][0] - 1280/2) / (1280/2) * 3,
                                -(landmarkData.landmarks[17][1] - 720/2) / (720/2) + 0.5,
                                landmarkData.landmarks[17][2]/200,
                            ]

                            return (
                            <group> 
                                {nextCords && <Line points={[[...cords], [...nextCords]]} lineWidth={5} color={"blue"}></Line>}
                                {index == 1 && <Line points={[[...cords], [...zeroPoint]]} lineWidth={5} color={"blue"}></Line>}
                                {index == 5 && <Line points={[[...cords], [...zeroPoint]]} lineWidth={5} color={"blue"}></Line>}
                                {index == 17 && <Line points={[[...cords], [...zeroPoint]]} lineWidth={5} color={"blue"}></Line>}
                                {index == 5 && <Line points={[[...cords], [...ninethPoint]]} lineWidth={5} color={"blue"}></Line>}
                                {index == 9 && <Line points={[[...cords], [...thirteenthPoint]]} lineWidth={5} color={"blue"}></Line>}
                                {index == 13 && <Line points={[[...cords], [...seventeenthPoint]]} lineWidth={5} color={"blue"}></Line>}
                                <mesh key={index} position={[...cords]} scale={0.09} castShadow>
                                    <sphereGeometry></sphereGeometry>
                                    <meshStandardMaterial color={"blue"}></meshStandardMaterial>
                                </mesh>
                            </group >
                        )
                        }
                    }
                )}
            </group>

            <mesh position-y={-1} scale={10} rotation-x={-Math.PI/2} receiveShadow>
                <planeGeometry></planeGeometry>
                <meshStandardMaterial color={"white"}></meshStandardMaterial>
            </mesh>

            <directionalLight position={[2,2,2]} intensity={2.8} castShadow></directionalLight>
            <ambientLight></ambientLight>
        </>
    )
}
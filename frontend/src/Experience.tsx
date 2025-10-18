import { OrbitControls } from "@react-three/drei"
import { useEffect, useState } from "react"
import "@react-three/fiber"

interface landmarkData {
    landmarks: number[][]; // declare the type that landmarks can have two array (for indexing) with numbers as each element
}

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
            {[...Array(21)].map((_, index) => // map iterates through undefined elements, not empty elements
                {   
                    if(landmarkData && landmarkData.landmarks) {
                        const cords: [number, number, number] = 
                        [(-landmarkData.landmarks[index][0] - 1280/2) / (1280/2) + 2, 
                         -(landmarkData.landmarks[index][1] - 720/2) / (720/2) + 1, 
                         landmarkData.landmarks[index][2]/200];
                        
                        return (
                        <mesh key={index} position={[...cords]} scale={0.09}>
                            <sphereGeometry></sphereGeometry>
                            <meshStandardMaterial color={"blue"}></meshStandardMaterial>
                        </mesh>
                    )
                    }
                }
            )}

            <mesh position-y={-1} scale={10} rotation-x={-Math.PI/2} receiveShadow>
                <planeGeometry></planeGeometry>
                <meshStandardMaterial color={"white"}></meshStandardMaterial>
            </mesh>

            <directionalLight position={[2,2,2]} intensity={2.8} castShadow></directionalLight>
            <ambientLight></ambientLight>
        </>
    )
}
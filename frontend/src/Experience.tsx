import { OrbitControls } from "@react-three/drei"
import "@react-three/fiber"

const socket = new WebSocket("ws://localhost:3000")

socket.addEventListener("message", (event) => {  // message event type means that code executes when data is received through websocket
    console.log(event.data)
})

export default function Experience() {
    return (
        <>
            <OrbitControls></OrbitControls>
            {[...Array(21)].map((_, index) => // map iterates through undefined elements, not empty elements
                <mesh scale={0.5} position-x={index*2}>
                    <sphereGeometry></sphereGeometry>
                    <meshStandardMaterial color={"blue"}></meshStandardMaterial>
                </mesh>
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
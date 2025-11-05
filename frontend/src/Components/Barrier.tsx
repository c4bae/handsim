import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Barrier({crossed}: {crossed: React.RefObject<boolean>}) {
    const barrierMaterial = useRef<THREE.MeshStandardMaterial | null>(null)
    const barrierMesh = useRef<THREE.Mesh | null>(null)
    
    useFrame(() => {
        if(barrierMesh.current && barrierMaterial.current) {
            if(crossed.current) {
                barrierMesh.current.scale.set(8, 7, 0.2)
                barrierMesh.current.position.set(0,2.5,-1)
                barrierMaterial.current.color.set("#ff4a4a")
                barrierMaterial.current.opacity = 0.2
            }
            else if(!crossed.current) {
                barrierMesh.current.scale.set(8, 0.1, 0.2)
                barrierMesh.current.position.set(0,-1,-1)
                barrierMaterial.current.color.set("#64ff67")
                barrierMaterial.current.opacity = 1
            }
        }
    })


    return (
        <mesh ref={barrierMesh} position={[0,-1,-1]} scale={[8, 0.1, 0.2]}>
            <boxGeometry></boxGeometry>
            <meshStandardMaterial ref={barrierMaterial} color={"#64ff67"} opacity={1} transparent></meshStandardMaterial>
        </mesh>
    )
}
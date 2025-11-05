import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import gsap from "gsap"
import * as THREE from "three"

export default function Barrier({crossed}: {crossed: React.RefObject<boolean>}) {
    const barrierMaterial = useRef<THREE.MeshStandardMaterial | null>(null)
    const barrierMesh = useRef<THREE.Mesh | null>(null)
    
    useFrame(() => {
        if(barrierMesh.current && barrierMaterial.current) {
            if(crossed.current) {
                gsap.to(barrierMesh.current.scale, {
                    duration: 0.1,
                    x: '8',
                    y: '7',
                    z: '0.2',
                    ease: 'power4.inOut',
                })

                gsap.to(barrierMesh.current.position, {
                    duration: 0.1,
                    x: '0',
                    y: '2.5',
                    z: '-1',
                    ease: 'power4.inOut',
                })
                
                barrierMaterial.current.color.set("#ff4a4a")
                barrierMaterial.current.opacity = 0.2
            }
            else if(!crossed.current) {
                gsap.to(barrierMesh.current.scale, {
                    duration: 0.1,
                    x: '8',
                    y: '0.1',
                    z: '0.2',
                    ease: 'power4.inOut',
                })

                gsap.to(barrierMesh.current.position, {
                    duration: 0.1,
                    x: '0',
                    y: '-1',
                    z: '-1',
                    ease: 'power4.inOut',
                })

                gsap.to(barrierMaterial.current, {
                    duration: 0.1,
                    opacity: '1',
                    ease: 'power4.inOut',
                })

                barrierMaterial.current.color.set("#64ff67")
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
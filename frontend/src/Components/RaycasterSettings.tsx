import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import React from "react";
import * as THREE from "three"

interface handLandmarkData {
    landmarks: number[][]
}

type landmarkData = {
    landMarkData: React.RefObject<handLandmarkData | null>,
}

export default function RaycasterSettings({landMarkData}: landmarkData) {
    const { raycaster, scene, camera } = useThree()
    const currentBlock = useRef<THREE.Object3D | null>(null)
    const blockFound = useRef<boolean>(false)
    const blockPositionY = useRef<number | null>(null)
    const blocksLayer = new THREE.Layers()

    useEffect(() => {
        camera.layers.enable(1)
        raycaster.layers.set(1)
        blocksLayer.set(1)

        window.addEventListener("keydown", (event) => {
            if(event.code == "Space" && currentBlock.current != null) {
                blockFound.current = true

                const worldPos = new THREE.Vector3()
                currentBlock.current.getWorldPosition(worldPos)
                blockPositionY.current = worldPos.y
            }
        })
    }, [])

    useFrame(() => {
        const data = landMarkData.current
        if(data) {
            const x = -(data["landmarks"][7][0] - 1280/2) / (1280/2) * 3
            const y = -(data["landmarks"][7][1] - 720/2) / (720/2) * 1.5 + 3
            const z = data["landmarks"][7][2] / 200

            const farX = (-(data["landmarks"][8][0] - 1280/2) / (1280/2) * 3 - x) * 1000
            const farY = (-(data["landmarks"][8][1] - 720/2) / (720/2) * 1.5 + 3 - y) * 1000
            const farZ = (data["landmarks"][8][2] / 200 - z) * 1000
            
            // Create two position vectors: 7th landmark and 8th landmark
            const currentPoint = new THREE.Vector3(x, y, z)
            const destinationPoint = new THREE.Vector3(farX, farY, farZ)

            // Construct normalized direction vector connecting the two landmarks
            const directionVector = new THREE.Vector3().subVectors(destinationPoint, currentPoint).normalize()
            
            // Set the raycaster's direction to the direction vector, starting from the 7th landmark
            raycaster.set(currentPoint, directionVector)
            const intersects = raycaster.intersectObjects(scene.children)

            scene.traverse((object) => {
                if(object.layers.test(blocksLayer)) {
                    if('material' in object) {
                        object.material.color.set("#c2974e")
                    }
                }
            })

            if(intersects.length > 0) {
                if (!blockFound.current) {
                    currentBlock.current = intersects[0].object
                    currentBlock.current.material.color.set("white")
                }
            }

            // Align selected block to same y and z position of hand
            if(blockFound.current && currentBlock.current) {
                currentBlock.current.position.z = x
                currentBlock.current.position.y = (y - blockPositionY.current!) * 1.5
            }
        }
    })

    return null
}

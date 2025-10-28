import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
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
    const blocksLayer = new THREE.Layers()

    useEffect(() => {
        camera.layers.enable(1)
        raycaster.layers.set(1)
        blocksLayer.set(1)
    }, [])

    useFrame(() => {
        const data = landMarkData.current
        if(data) {
            const x = -(data["landmarks"][7][0] - 1280/2) / (1280/2) * 3
            const y = -(data["landmarks"][7][1] - 720/2) / (720/2) + 0.2
            const z = data["landmarks"][7][2] / 200

            const farX = (-(data["landmarks"][8][0] - 1280/2) / (1280/2) * 3 - x) * 50
            const farY = (-(data["landmarks"][8][1] - 720/2) / (720/2) + 0.2 - y) * 50
            const farZ = (data["landmarks"][8][2] / 200 - z) * 50
            
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
                    object.material.color.set("red")
                }
            })

            if(intersects.length > 0) {
                intersects[0].object.material.color.set("blue")
            }   
        }
    })

    return null
}

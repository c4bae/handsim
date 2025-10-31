import { RigidBody } from "@react-three/rapier"
import { useEffect, useState, useRef } from "react";
import { Group } from "three";
import JengaBlock from "./JengaBlock";

export default function JengaTower() {
    const tower = useRef<Group | null>(null)
    const [key, setKey] = useState<number>(0)
    const towerHeight = 10;

    document.addEventListener("visibilitychange", () => {
        if(document.visibilityState == "visible") {
            console.log("tab is shown")
            setKey((key) => key + 1)
        }
        else {
            console.log("tab is gone")
        }
    })

    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if(event.code == "KeyD" && tower.current) {
                tower.current.rotation.y += Math.PI/64
            }
            else if(event.code == "KeyA" && tower.current) {
                tower.current.rotation.y -= Math.PI/64
            }
        })

    }, [])

    return (
        <group ref={tower} position={[0, 0, -2]}>
            <group key={key} position={[-0.62, 0, 0]}>
                {[...Array(towerHeight)].map((_, index) => {
                    // Two cases (index % 2 == 0) (index % 2 != 0) allows for rotated layers
                    if(index % 2 == 0) {
                        return (
                            <group position-y={index - index*0.3} key={index}>
                                <JengaBlock position-x={0} scale={[0.6,0.6,1.8]}></JengaBlock>
                                <JengaBlock position-x={0.62} scale={[0.6,0.6,1.8]}></JengaBlock>
                                <JengaBlock position-x={1.24} scale={[0.6,0.6,1.8]}></JengaBlock>
                            </group>
                        )
                    }
                    else {
                        return (
                            <group position-y={index - index*0.3} rotation-y={Math.PI/2}>
                                <JengaBlock position-x={-0.62} position-z={0.6}></JengaBlock>
                                <JengaBlock position-x={0} position-z={0.6}></JengaBlock>
                                <JengaBlock position-x={0.62} position-z={0.6}></JengaBlock>
                            </group>
                        )   
                    }
                })}
            </group>
        </group>
    )
}
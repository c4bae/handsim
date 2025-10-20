import { useEffect, useRef } from "react";

type landmarkData = {
    landmarks: number[][]
}

// Retrieve hand landmark data through websocket from backend
export default function useHandData() {
    const handLandmarks = useRef<landmarkData | null>(null)

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:3000")
        websocket.addEventListener("message", (event) => {
            handLandmarks.current = JSON.parse(event.data)
        })

        return (() => {
            websocket.close()
        })

    }, [])

    return handLandmarks
}
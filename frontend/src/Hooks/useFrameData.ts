import { useEffect, useRef } from "react";

export default function useFrameData() {
    const useFrameData = useRef<string | undefined>(undefined)

    useEffect(() => {
        const websocket = new WebSocket("ws://localhost:4000")
        websocket.addEventListener("message", (event) => {
            useFrameData.current = event.data
        })

        return (() => {
            websocket.close()
        })
    }, [])

    return useFrameData
}
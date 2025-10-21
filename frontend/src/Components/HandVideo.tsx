import useFrameData from "../Hooks/useFrameData";
import React from "react";
import { useState, useEffect } from "react";

// Returns the img component using the img string from ref obtained by useFrameData.ts
export default function Video() {
    const frameData: React.RefObject<string | undefined> = useFrameData()
    const [imgData, setImgData] = useState<string | undefined>(undefined)

    // Use an interval to continuously update the image frame
    useEffect(() => {
        const changeImg = setInterval(() => {setImgData(frameData.current)}, 100)
        
        // Cleanup function stopping the interval
        return (() => {
            clearInterval(changeImg)
        })

    }, [frameData])

    if (imgData == undefined) {
        return null
    }

    return (
        <img src={"data:image/jpg;base64,"+ imgData} style={{width: "30%", position: "fixed"}}></img>
    )
}
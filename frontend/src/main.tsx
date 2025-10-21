import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'
import HandVideo from "./Components/HandVideo.tsx"
import "./style.css"
import { Perf } from 'r3f-perf'


createRoot(document.getElementById('root')!).render(
  <>
    <h1>MediaPipe HandDetector Test in R3F<br></br>@c4bae</h1>
    <HandVideo></HandVideo>
    <Canvas shadows>
        <Perf position="bottom-left"></Perf>
        <Experience></Experience>
    </Canvas>
  </>
)

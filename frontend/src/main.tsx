import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'
import HandVideo from "./Components/HandVideo.tsx"
import "./style.css"


createRoot(document.getElementById('root')!).render(
  <>
    <HandVideo></HandVideo>
    <Canvas shadows>
        <Experience></Experience>
    </Canvas>
  </>
)

import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'
import "./style.css"

createRoot(document.getElementById('root')!).render(
  <>
    <Canvas shadows>
        <Experience></Experience>
    </Canvas>
  </>
)

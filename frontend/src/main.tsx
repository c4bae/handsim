import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.tsx'
// import HandVideo from "./Components/HandVideo.tsx"
import "./style.css"
import { Perf } from 'r3f-perf'
import * as THREE from 'three'


createRoot(document.getElementById('root')!).render(
  <>
   <h1>Jenga Sim in R3F using <br></br>OpenCV and MediaPipe @c4bae</h1>
   <p>Only available through local hosting</p>
    {/* <HandVideo></HandVideo> */}
    {/* Enabling handvideo enables noticeable input lag */}
    <Canvas shadows 
            gl= {{
                toneMapping: THREE.NeutralToneMapping,
                toneMappingExposure: 2,
            }}
            camera= {{
              position: [3,5,5],
              rotation: [0, Math.PI/4, 0]
            }} >
        <Perf position="bottom-left"></Perf>
        <Experience></Experience>
    </Canvas>
  </>
)

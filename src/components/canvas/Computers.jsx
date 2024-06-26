import React, { Suspense, useEffect, useState } from 'react'

import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import CanvasLoader from '../Loader'


const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  console.log("IsMobile: ", isMobile);
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      <pointLight intensity={1} />
      <primitive 
        object={computer.scene} 
        scale={ isMobile ? 0.65 : 0.8} 
        position={ isMobile ? [0, -3.5, -1.8] :[0, -3.25, -1.5]} 
        rotation={[-0.01, 0.2, -0.1]} />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [ isMobile, setMobile ] = useState(false);

  useEffect(() => {
    const mediaQ = window.matchMedia("(max-width: 500px)");
    setMobile(mediaQ.matches);
    const handleMediaQchange = (event) => {
      setMobile(event.matches);
    }
    mediaQ.addEventListener('change', handleMediaQchange);

    return () => {
      mediaQ.removeEventListener('change', handleMediaQchange);
    }
  }, []);

  return (
    <Canvas frameloop='demand' shadows camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI /  2} minPolarAngle={Math.PI / 2} />
        <Computers isMobile = { isMobile }/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;
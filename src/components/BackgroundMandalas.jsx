import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import './BackgroundMandalas.css'

import mandala1 from '../assets/mandala-1.png'
import mandala2 from '../assets/mandala-2.png'
import mandala3 from '../assets/mandala-3.png'

gsap.registerPlugin(ScrollTrigger)

const MANDALAS = [mandala1, mandala2, mandala3]

function MandalaPlane({ url, index, total, scrollProgress }) {
  const meshRef = useRef()
  const texture = useTexture(url)
  
  // Create a segment for each mandala
  const segment = 1 / (total - 1)
  
  useFrame(() => {
    if (!meshRef.current) return
    
    // Constant slow rotation
    meshRef.current.rotation.z += 0.001
    
    // Handle scroll-based transformations
    const progress = scrollProgress.current
    
    // Visibility logic: peak at their segment, fade out elsewhere
    let opacity = 0
    if (index === 0) {
      opacity = Math.max(0, 1 - progress / segment)
    } else if (index === total - 1) {
      opacity = Math.max(0, (progress - (index - 1) * segment) / segment)
    } else {
      if (progress >= (index - 1) * segment && progress <= index * segment) {
        opacity = (progress - (index - 1) * segment) / segment
      } else if (progress > index * segment && progress <= (index + 1) * segment) {
        opacity = 1 - (progress - index * segment) / segment
      }
    }

    meshRef.current.material.opacity = opacity * 0.18 // Slightly more visible for the 3D depth
    
    // 3D Depth effect: Zooming in over total scroll
    meshRef.current.position.z = -5 + progress * 10
    meshRef.current.rotation.y = Math.sin(progress * Math.PI * 0.5) * 0.15
    meshRef.current.rotation.x = Math.cos(progress * Math.PI * 0.5) * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[22, 22]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  )
}

function Scene() {
  const scrollProgress = useRef(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    return () => st.kill()
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      {MANDALAS.map((url, i) => (
        <MandalaPlane 
          key={i} 
          url={url} 
          index={i} 
          total={MANDALAS.length} 
          scrollProgress={scrollProgress}
        />
      ))}
    </>
  )
}

export default function BackgroundMandalas() {
  return (
    <div className="bg-mandala-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true, stencil: false, depth: false }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
      <div className="bg-vignette"></div>
    </div>
  )
}


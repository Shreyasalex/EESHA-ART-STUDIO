import React, { useRef, useMemo, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture, Float, PerspectiveCamera, Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Interactive3DBackground.css'

gsap.registerPlugin(ScrollTrigger)

function DisplacementMandala() {
  const meshRef = useRef()
  const { viewport } = useThree()
  
  // Load texture and depth map from /background (public folder)
  const [texture, depthMap] = useTexture([
    '/background/texture.png',
    '/background/depth.png'
  ])

  // Mouse interaction state
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * -2
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Section-based Scroll Animations
  useEffect(() => {
    if (!meshRef.current) return

    // Define sections based on the IDs used in Home.jsx
    const sections = [
      { id: '#hero', pos: [0, 0, -5], rot: [0, 0, 0], scale: 1, opacity: 0.5 },
      { id: '#about', pos: [-6, -2, -6], rot: [0.2, 0.3, 0.5], scale: 1.2, opacity: 0.4 },
      { id: '.benefits-section', pos: [6, 2, -6], rot: [-0.2, -0.3, -0.5], scale: 1.1, opacity: 0.4 },
      { id: '.products-section', pos: [-7, 3, -7], rot: [0.1, 0.5, 1], scale: 1.3, opacity: 0.3 },
      { id: '.workshops-section', pos: [7, -3, -7], rot: [-0.1, -0.5, -1], scale: 1.2, opacity: 0.3 },
      { id: '.testimonials-section', pos: [-5, 0, -8], rot: [0, 0.8, 1.5], scale: 1.5, opacity: 0.3 },
      { id: '.contact-section', pos: [5, 4, -5], rot: [0.3, -0.2, 2], scale: 1.1, opacity: 0.5 }
    ]

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section.id,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(meshRef.current.position, {
            x: section.pos[0],
            y: section.pos[1],
            z: section.pos[2],
            duration: 2,
            ease: 'power2.inOut'
          })
          gsap.to(meshRef.current.rotation, {
            x: section.rot[0],
            y: section.rot[1],
            duration: 2,
            ease: 'power2.inOut'
          })
          gsap.to(meshRef.current.scale, {
            x: section.scale,
            y: section.scale,
            z: section.scale,
            duration: 2,
            ease: 'power2.inOut'
          })
          gsap.to(meshRef.current.material, {
            opacity: section.opacity,
            duration: 1.5
          })
        },
        onEnterBack: () => {
          gsap.to(meshRef.current.position, {
            x: section.pos[0],
            y: section.pos[1],
            z: section.pos[2],
            duration: 2,
            ease: 'power2.inOut'
          })
          gsap.to(meshRef.current.rotation, {
            x: section.rot[0],
            y: section.rot[1],
            duration: 2,
            ease: 'power2.inOut'
          })
          gsap.to(meshRef.current.scale, {
            x: section.scale,
            y: section.scale,
            z: section.scale,
            duration: 2,
            ease: 'power2.inOut'
          })
          gsap.to(meshRef.current.material, {
            opacity: section.opacity,
            duration: 1.5
          })
        }
      })
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [viewport])

  useFrame((state) => {
    if (!meshRef.current) return

    // Subtle parallax based on mouse
    const targetRotX = mouse.current.y * 0.15
    const targetRotY = mouse.current.x * 0.15
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, meshRef.current.rotation.x + targetRotX, 0.02)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, meshRef.current.rotation.y + targetRotY, 0.02)

    // Gentle auto-rotation
    meshRef.current.rotation.z += 0.0005
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, -5]}>
        {/* Using CircleGeometry to avoid rectangular frame */}
        <circleGeometry args={[8, 128]} />
        <meshStandardMaterial
          map={texture}
          displacementMap={depthMap}
          displacementScale={2.5}
          displacementBias={-0.3}
          alphaMap={depthMap}
          transparent={true}
          opacity={0.4}
          roughness={0.3}
          metalness={0.3}
          side={THREE.DoubleSide}
          emissive="#d4af35"
          emissiveIntensity={0.08}
          alphaTest={0.01}
        />
      </mesh>
    </Float>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="loader-3d">
        <div className="loader-spinner"></div>
        <p>Aligning Sacred Geometry...</p>
      </div>
    </Html>
  )
}

export default function Interactive3DBackground() {
  return (
    <div className="interactive-bg-container">
      <Canvas dpr={[1, 2]} alpha={true}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#fff" />
        <pointLight position={[-10, -10, 10]} intensity={1.5} color="#d4af35" />
        <spotLight position={[0, 10, 15]} angle={0.5} penumbra={1} intensity={3} castShadow />

        <Suspense fallback={<Loader />}>
          <DisplacementMandala />
        </Suspense>
      </Canvas>
      <div className="vignette-overlay"></div>
    </div>
  )
}

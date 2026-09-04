'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

// TODO(assets): once the real cutout layers are supplied, replace the
// meshBasicMaterial color on each Layer below with a texture, e.g.:
//   import { useTexture } from '@react-three/drei'
//   const map = useTexture('/hero/background.jpg')
//   <meshBasicMaterial map={map} transparent />
// Expected files:
//   /public/hero/background.jpg   — wall, arch, light (no plant, no props)
//   /public/hero/props.png        — vase, books, bowls, hand + mandala plate (transparent bg)
//   /public/hero/plant.png        — foreground green plant leaves only (transparent bg)

function Layer({ progressRef, depth, restY, riseY, restScale, growScale, color, opacity = 1, fadeOut = false }) {
  const ref = useRef(null)

  useFrame(() => {
    const p = progressRef.current
    if (!ref.current) return
    ref.current.position.y = restY + p * (riseY - restY)
    const s = restScale + p * (growScale - restScale)
    ref.current.scale.set(s, s, 1)
    if (fadeOut) {
      ref.current.material.opacity = opacity * (1 - Math.max(0, (p - 0.7) / 0.3))
    }
  })

  return (
    <mesh ref={ref} position={[0, restY, depth]}>
      <planeGeometry args={[16, 9]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function Camera({ progressRef }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.z = 10 - progressRef.current * 1.5
    camera.updateProjectionMatrix()
  })
  return null
}

export default function HeroScene({ progressRef }) {
  return (
    <Canvas
      orthographic={false}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.75]}
      className="!absolute inset-0"
    >
      <Camera progressRef={progressRef} />

      {/* background wall */}
      <Layer
        progressRef={progressRef}
        depth={-5}
        restY={0}
        riseY={-0.6}
        restScale={1.15}
        growScale={1.3}
        color="#f3ece1"
      />

      {/* midground: props, vase, books, painting hand */}
      <Layer
        progressRef={progressRef}
        depth={-1.5}
        restY={-0.3}
        riseY={-2.2}
        restScale={1}
        growScale={1.25}
        color="#c99a5c"
        opacity={0.9}
        fadeOut
      />

      {/* foreground: green plant, rises and grows to cover the frame */}
      <Layer
        progressRef={progressRef}
        depth={3}
        restY={-3.2}
        riseY={4.5}
        restScale={0.9}
        growScale={5.5}
        color="#465c3c"
      />
    </Canvas>
  )
}

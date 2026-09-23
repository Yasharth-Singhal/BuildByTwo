import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

// Two original, procedural forms: no model, texture or HDR downloads.
export function mountSculpture(host, onReady, onLost) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, navigator.hardwareConcurrency <= 4 ? 1 : 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30)
  camera.position.set(0, 0.05, 8.8)
  const pmrem = new THREE.PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const environment = pmrem.fromScene(room, 0.045)
  scene.environment = environment.texture
  room.dispose(); pmrem.dispose()
  const warm = new THREE.MeshPhysicalMaterial({ color: 0xe76124, metalness: 0.2, roughness: 0.35, clearcoat: 0.4, clearcoatRoughness: 0.23 })
  const cobalt = new THREE.MeshPhysicalMaterial({ color: 0x244de9, metalness: 0.48, roughness: 0.19, clearcoat: 1, clearcoatRoughness: 0.17 })
  const ringGeometry = new THREE.TorusGeometry(1.13, 0.32, 24, 96)
  const ring = new THREE.Mesh(ringGeometry, warm)
  const shape = new THREE.Shape()
  const size = 1.18, radius = 0.28
  shape.moveTo(-size + radius, -size)
  shape.lineTo(size - radius, -size); shape.quadraticCurveTo(size, -size, size, -size + radius)
  shape.lineTo(size, size - radius); shape.quadraticCurveTo(size, size, size - radius, size)
  shape.lineTo(-size + radius, size); shape.quadraticCurveTo(-size, size, -size, size - radius)
  shape.lineTo(-size, -size + radius); shape.quadraticCurveTo(-size, -size, -size + radius, -size)
  const hole = new THREE.Path()
  const inner = 0.77, corner = 0.14
  hole.moveTo(-inner + corner, -inner)
  hole.quadraticCurveTo(-inner, -inner, -inner, -inner + corner)
  hole.lineTo(-inner, inner - corner); hole.quadraticCurveTo(-inner, inner, -inner + corner, inner)
  hole.lineTo(inner - corner, inner); hole.quadraticCurveTo(inner, inner, inner, inner - corner)
  hole.lineTo(inner, -inner + corner); hole.quadraticCurveTo(inner, -inner, inner - corner, -inner)
  hole.lineTo(-inner + corner, -inner)
  shape.holes.push(hole)
  const frameGeometry = new THREE.ExtrudeGeometry(shape, { depth: 0.24, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.1, bevelThickness: 0.1, curveSegments: 16 })
  frameGeometry.center()
  const frame = new THREE.Mesh(frameGeometry, cobalt)
  const group = new THREE.Group()
  group.add(ring, frame); scene.add(group)
  const key = new THREE.DirectionalLight(0xfff8ec, 2.5)
  key.position.set(-3, 5, 6); scene.add(key)
  const fill = new THREE.DirectionalLight(0xc3d7ff, 2)
  fill.position.set(4, 0, 3); scene.add(fill)

  let inView = false, lost = false, last = 0, time = 0, targetX = 0, targetY = 0, scroll = 0
  const hero = host.closest('.experience-hero')
  const measure = () => {
    const { width, height } = host.getBoundingClientRect()
    renderer.setSize(width, height, false)
    camera.aspect = width / Math.max(height, 1)
    camera.updateProjectionMatrix()
  }
  const resize = new ResizeObserver(measure); resize.observe(host); measure()
  const pointer = (event) => {
    const rect = host.getBoundingClientRect()
    targetX = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5)
    targetY = THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5)
  }
  const resetPointer = () => { targetX = 0; targetY = 0 }
  const updateScroll = () => {
    if (inView && hero) scroll = THREE.MathUtils.clamp(-hero.getBoundingClientRect().top / hero.offsetHeight, 0, 1)
  }
  const render = (now) => {
    const delta = Math.min((now - (last || now)) / 1000, 0.04)
    last = now; time += delta
    const entry = Math.min(time / 2.5, 1)
    const join = Math.max(entry * 0.7, scroll * 1.4)
    const spacing = THREE.MathUtils.lerp(1.15, 0.55, Math.min(join, 1))
    ring.position.set(-spacing, 0.32 + Math.sin(time * 0.65) * 0.065, 0.03)
    ring.rotation.set(0.28 + scroll * 0.2, -0.62 + Math.sin(time * 0.35) * 0.07, -0.4)
    frame.position.set(spacing, -0.29 + Math.cos(time * 0.65) * 0.065, 0.15)
    frame.rotation.set(-0.15, 0.5 - scroll * 0.2, 0.36 + Math.sin(time * 0.3) * 0.04)
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetX * 0.35 + scroll * 0.25, 4, delta)
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetY * 0.2, 4, delta)
    renderer.render(scene, camera)
  }
  const sync = () => {
    last = 0
    renderer.setAnimationLoop(inView && !document.hidden && !lost ? render : null)
    host.dataset.rendering = inView && !document.hidden && !lost ? 'active' : 'paused'
  }
  const visibility = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateScroll(); sync() })
  visibility.observe(host)
  const contextLost = (event) => { event.preventDefault(); lost = true; sync(); onLost() }
  const contextRestored = () => { lost = false; sync(); onReady() }
  window.addEventListener('pointermove', pointer, { passive: true })
  window.addEventListener('scroll', updateScroll, { passive: true })
  window.addEventListener('blur', resetPointer)
  document.addEventListener('visibilitychange', sync)
  renderer.domElement.addEventListener('webglcontextlost', contextLost)
  renderer.domElement.addEventListener('webglcontextrestored', contextRestored)
  render(0); onReady()
  return () => {
    renderer.setAnimationLoop(null)
    visibility.disconnect(); resize.disconnect()
    window.removeEventListener('pointermove', pointer)
    window.removeEventListener('scroll', updateScroll)
    window.removeEventListener('blur', resetPointer)
    document.removeEventListener('visibilitychange', sync)
    renderer.domElement.removeEventListener('webglcontextlost', contextLost)
    renderer.domElement.removeEventListener('webglcontextrestored', contextRestored)
    ringGeometry.dispose(); frameGeometry.dispose(); warm.dispose(); cobalt.dispose(); environment.dispose()
    renderer.dispose(); renderer.domElement.remove()
  }
}

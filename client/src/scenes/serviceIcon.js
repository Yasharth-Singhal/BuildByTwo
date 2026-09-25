import * as THREE from 'three'

const MAX_CONTEXTS = 4
let activeContexts = 0

function roundedFrameGeometry(scale = 1) {
  const shape = new THREE.Shape()
  const size = scale, radius = scale * .22
  shape.moveTo(-size + radius, -size)
  shape.lineTo(size - radius, -size); shape.quadraticCurveTo(size, -size, size, -size + radius)
  shape.lineTo(size, size - radius); shape.quadraticCurveTo(size, size, size - radius, size)
  shape.lineTo(-size + radius, size); shape.quadraticCurveTo(-size, size, -size, size - radius)
  shape.lineTo(-size, -size + radius); shape.quadraticCurveTo(-size, -size, -size + radius, -size)
  const hole = new THREE.Path()
  const inner = scale * .62, corner = scale * .1
  hole.moveTo(-inner + corner, -inner)
  hole.quadraticCurveTo(-inner, -inner, -inner, -inner + corner)
  hole.lineTo(-inner, inner - corner); hole.quadraticCurveTo(-inner, inner, -inner + corner, inner)
  hole.lineTo(inner - corner, inner); hole.quadraticCurveTo(inner, inner, inner, inner - corner)
  hole.lineTo(inner, -inner + corner); hole.quadraticCurveTo(inner, -inner, inner - corner, -inner)
  hole.lineTo(-inner + corner, -inner)
  shape.holes.push(hole)
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: .18, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .06, bevelThickness: .06, curveSegments: 10 })
  geometry.center()
  return geometry
}

function bracketGeometry(direction = 1) {
  const shape = new THREE.Shape()
  const points = direction > 0
    ? [[-.78,.86],[-.38,.86],[.48,0],[-.38,-.86],[-.78,-.86],[.08,0]]
    : [[.78,.86],[.38,.86],[-.48,0],[.38,-.86],[.78,-.86],[-.08,0]]
  shape.moveTo(...points[0])
  points.slice(1).forEach(point => shape.lineTo(...point))
  shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: .2, bevelEnabled: true, bevelSegments: 2, bevelSize: .045, bevelThickness: .045 })
  geometry.center()
  return geometry
}

function buildGlyph(type, warm, cobalt) {
  const group = new THREE.Group()
  const geometries = []
  if (type === 'design') {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.05,-.65,0), new THREE.Vector3(-.72,.78,.18),
      new THREE.Vector3(.08,.45,-.12), new THREE.Vector3(.86,.8,.12), new THREE.Vector3(1.05,-.55,0),
    ])
    const geometry = new THREE.TubeGeometry(curve, 48, .18, 10, false)
    geometries.push(geometry)
    const ribbon = new THREE.Mesh(geometry, warm)
    ribbon.rotation.z = -.12
    group.add(ribbon)
  } else if (type === 'development') {
    const leftGeometry = bracketGeometry(-1), rightGeometry = bracketGeometry(1)
    geometries.push(leftGeometry, rightGeometry)
    const left = new THREE.Mesh(leftGeometry, warm), right = new THREE.Mesh(rightGeometry, cobalt)
    left.position.x = -.48; right.position.x = .48
    left.rotation.y = -.16; right.rotation.y = .16
    group.add(left, right)
  } else if (type === 'social') {
    ;[1.02,.78,.54].forEach((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, .095 + index * .015, 12, 52)
      geometries.push(geometry)
      const ring = new THREE.Mesh(geometry, index === 1 ? warm : cobalt)
      ring.rotation.set(index * .48, index * .28, index * .37)
      group.add(ring)
    })
  } else {
    const ringGeometry = new THREE.TorusGeometry(.82, .2, 16, 64)
    const frameGeometry = roundedFrameGeometry(.82)
    geometries.push(ringGeometry, frameGeometry)
    const ring = new THREE.Mesh(ringGeometry, warm), frame = new THREE.Mesh(frameGeometry, cobalt)
    ring.position.x = -.42; ring.rotation.set(.3,-.45,-.3)
    frame.position.x = .42; frame.rotation.set(-.15,.35,.32)
    group.add(ring, frame)
  }
  return { group, geometries }
}

export function mountServiceIcon(host, type = 'together', onReady = () => {}, onLost = () => {}) {
  if (activeContexts >= MAX_CONTEXTS) return () => {}
  activeContexts += 1
  let released = false
  let renderer
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }) }
  catch (error) { activeContexts -= 1; throw error }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35))
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 20)
  camera.position.z = 5.2
  const warm = new THREE.MeshStandardMaterial({ color: 0xed743b, metalness: .28, roughness: .34 })
  const cobalt = new THREE.MeshStandardMaterial({ color: 0x294cdd, metalness: .42, roughness: .25 })
  const { group, geometries } = buildGlyph(type, warm, cobalt)
  scene.add(group)
  scene.add(new THREE.HemisphereLight(0xfff7e9, 0x334173, 2.3))
  const key = new THREE.DirectionalLight(0xffffff, 2.8); key.position.set(-3,4,5); scene.add(key)

  let inView = false, hovering = false, lost = false, last = 0, elapsed = 0, pointerX = 0, pointerY = 0
  const measure = () => {
    const { width, height } = host.getBoundingClientRect()
    renderer.setSize(Math.max(width, 1), Math.max(height, 1), false)
    camera.aspect = width / Math.max(height, 1)
    camera.updateProjectionMatrix()
  }
  const resize = new ResizeObserver(measure); resize.observe(host); measure()
  const pointer = event => {
    const rect = host.getBoundingClientRect()
    pointerX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - .5) * .6
    pointerY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - .5) * .35
  }
  const enter = () => { hovering = true }
  const leave = () => { hovering = false; pointerX = 0; pointerY = 0 }
  const render = now => {
    const delta = Math.min((now - (last || now)) / 1000, .04)
    last = now; elapsed += delta
    const speed = hovering ? 1.1 : .32
    group.rotation.y += delta * speed
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, pointerY + Math.sin(elapsed * .55) * .07, 5, delta)
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, pointerX * -.3, 5, delta)
    group.position.y = Math.sin(elapsed * .7) * .055
    renderer.render(scene, camera)
  }
  const sync = () => renderer.setAnimationLoop(inView && !document.hidden && !lost ? render : null)
  const visibility = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync() }, { rootMargin: '80px' })
  visibility.observe(host)
  const contextLost = event => { event.preventDefault(); lost = true; sync(); onLost() }
  const contextRestored = () => { lost = false; sync(); onReady() }
  host.addEventListener('pointermove', pointer, { passive: true })
  host.addEventListener('pointerenter', enter)
  host.addEventListener('pointerleave', leave)
  document.addEventListener('visibilitychange', sync)
  renderer.domElement.addEventListener('webglcontextlost', contextLost)
  renderer.domElement.addEventListener('webglcontextrestored', contextRestored)
  renderer.render(scene, camera); onReady()

  return () => {
    renderer.setAnimationLoop(null); visibility.disconnect(); resize.disconnect()
    host.removeEventListener('pointermove', pointer); host.removeEventListener('pointerenter', enter); host.removeEventListener('pointerleave', leave)
    document.removeEventListener('visibilitychange', sync)
    renderer.domElement.removeEventListener('webglcontextlost', contextLost); renderer.domElement.removeEventListener('webglcontextrestored', contextRestored)
    geometries.forEach(geometry => geometry.dispose()); warm.dispose(); cobalt.dispose(); renderer.dispose(); renderer.domElement.remove()
    if (!released) { activeContexts -= 1; released = true }
  }
}

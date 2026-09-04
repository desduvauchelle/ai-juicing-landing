import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { gsap, ScrollTrigger } from '@/hooks/useGsap'
import { buildModel, type ModelKind } from './models'

export function createViewer(host: HTMLElement, kind: ModelKind, onFailure: () => void, reactive = false) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38,1,.1,100)
  const origin = kind === 'robot' ? new THREE.Vector3(0,-.2,0) : new THREE.Vector3()
  const distance = kind === 'robot' ? 7.6 : 5.4
  camera.position.set(kind === 'robot' ? .8 : 1.7, kind === 'robot' ? .6 : 1, distance)
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75))
  renderer.setClearColor(0,0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  host.appendChild(renderer.domElement)
  renderer.domElement.setAttribute('aria-label', `Interactive AI Juicing 3D ${kind}. Drag or use the left and right arrow keys to rotate. Right-drag to move. Press Home to reset.`)
  renderer.domElement.tabIndex = 0
  renderer.domElement.setAttribute('role','img')
  const pmrem = new THREE.PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const environment = pmrem.fromScene(room,.04)
  scene.environment = environment.texture
  scene.environmentIntensity = .5
  room.dispose()
  pmrem.dispose()
  scene.add(new THREE.HemisphereLight('#dceeff','#59466d',.6))
  const key = new THREE.DirectionalLight('#fff7df',1.8)
  key.position.set(-3,5,5);scene.add(key)
  const rim = new THREE.DirectionalLight('#ff41bf',2)
  rim.position.set(3,1,-3);scene.add(rim)
  const model = buildModel(kind)
  scene.add(model)
  const baseY = model.position.y
  const baseRotation = model.rotation.y
  const basePosition = model.position.clone()
  const baseEuler = model.rotation.clone()
  const controls = new OrbitControls(camera,renderer.domElement)
  controls.target.copy(origin)
  controls.enableDamping = true
  controls.dampingFactor = .09
  controls.enableZoom = false // Wheel continues to scroll the webpage; no scroll capture by the model.
  controls.minDistance = distance*.6
  controls.maxDistance = distance*1.6
  controls.autoRotateSpeed = .8
  controls.update()
  controls.saveState()
  let visible = true, paused = false, spinning = false, interacted = false, disposed = false
  let scrollProgress = 0, frame = 0, previous = 0, elapsed = 0
  let pointerX = 0, pointerY = 0, scrollKick = 0, lastScrollY = window.scrollY
  let dragging = false, resumeAt = 0
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
  const clearPointer = () => { pointerX = 0; pointerY = 0 }
  const onPointerMove = (event: PointerEvent) => {
    if (!visible || document.hidden || paused || reduce.matches || dragging || !finePointer.matches || event.pointerType !== 'mouse') return
    const rect = host.getBoundingClientRect()
    pointerX = THREE.MathUtils.clamp((event.clientX - rect.left - rect.width / 2) / (window.innerWidth * .4), -1, 1)
    pointerY = THREE.MathUtils.clamp((event.clientY - rect.top - rect.height / 2) / (window.innerHeight * .4), -1, 1)
  }
  if (reactive) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', clearPointer)
    window.addEventListener('blur', clearPointer)
  }
  // Direct manipulation owns the pose while dragging; ambient motion eases back later.
  const onStart = () => { interacted = true; dragging = true; clearPointer() }
  const onEnd = () => { dragging = false; resumeAt = performance.now() + 700 }
  controls.addEventListener('start',onStart)
  controls.addEventListener('end',onEnd)
  const onKeyDown = (event: KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return
    event.preventDefault()
    interacted = true
    resumeAt = performance.now() + 1200
    if (event.key === 'Home') {
      controls.reset(); model.position.copy(basePosition); model.rotation.copy(baseEuler); clearPointer(); scrollKick = 0
    } else {
      const offset = camera.position.clone().sub(controls.target)
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), event.key === 'ArrowLeft' ? -.2 : .2)
      camera.position.copy(controls.target).add(offset)
      controls.update()
    }
  }
  renderer.domElement.addEventListener('keydown', onKeyDown)
  const resize = () => {
    const {width,height} = host.getBoundingClientRect()
    if(!width || !height) return
    camera.aspect = width/height
    camera.updateProjectionMatrix()
    renderer.setSize(width,height)
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  resize()
  gsap.registerPlugin(ScrollTrigger)
  const trigger = ScrollTrigger.create({trigger:host,start:'top bottom',end:'bottom top',onUpdate:self=>{
    scrollProgress=self.progress
    if (visible && !document.hidden && !paused && !reduce.matches && !dragging) {
      scrollKick = THREE.MathUtils.clamp(scrollKick + (window.scrollY - lastScrollY) / 260, -1, 1)
    }
    lastScrollY = window.scrollY
  }})
  scrollProgress = trigger.progress
  function render(time: number) {
    frame = 0
    if(disposed || !visible || document.hidden) return
    const delta = previous ? Math.min((time-previous)/1000,.05) : 0
    previous = time
    const animated = !paused && !reduce.matches
    if(animated) elapsed += delta
    if(reactive && animated && !dragging && time >= resumeAt) {
      // Bounded, frame-rate-independent easing gives the mascot weight without
      // moving the canvas or interfering with OrbitControls' camera and pan.
      const damp = (value: number, target: number) => THREE.MathUtils.damp(value, target, 7, delta)
      const travel = scrollProgress - .4
      model.rotation.x = damp(model.rotation.x, baseEuler.x + pointerY * .20 + scrollKick * .18)
      model.rotation.y = damp(model.rotation.y, baseEuler.y + pointerX * .48 + travel * 1.1 + Math.sin(elapsed * .65) * .045)
      model.rotation.z = damp(model.rotation.z, baseEuler.z - pointerX * .075 - scrollKick * .10)
      model.position.x = damp(model.position.x, basePosition.x + pointerX * .13)
      model.position.y = damp(model.position.y, baseY + Math.sin(elapsed * 1.4) * .075 + travel * .22 + scrollKick * .10)
      model.position.z = damp(model.position.z, basePosition.z + Math.abs(scrollKick) * .12)
    } else if(!reactive && !interacted && animated) {
      model.position.y = baseY + Math.sin(elapsed*1.4)*.055
      model.rotation.y = baseRotation + (scrollProgress-.4)*.55
    }
    scrollKick = THREE.MathUtils.damp(scrollKick, 0, 4, delta)
    controls.autoRotate = animated && spinning
    controls.update(delta)
    renderer.render(scene,camera)
    frame = requestAnimationFrame(render)
  }
  function wake() {
    previous = 0
    if(!frame && visible && !document.hidden && !disposed) frame = requestAnimationFrame(render)
  }
  const intersection = new IntersectionObserver(entries=>{
    visible = entries[0].isIntersecting
    if(visible) wake()
    else {cancelAnimationFrame(frame);frame=0;clearPointer();scrollKick=0}
  },{rootMargin:'80px'})
  intersection.observe(host)
  document.addEventListener('visibilitychange',wake)
  const contextLost = (event:Event) => { event.preventDefault(); onFailure() }
  renderer.domElement.addEventListener('webglcontextlost',contextLost)
  wake()

  return {
    pause(value:boolean) { paused=value;clearPointer();scrollKick=0 },
    spin(value:boolean) { spinning=value },
    rotate() {
      interacted=true
      const offset=camera.position.clone().sub(controls.target)
      offset.applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI/6)
      camera.position.copy(controls.target).add(offset)
      controls.update()
    },
    zoom(factor:number) {
      const offset=camera.position.clone().sub(controls.target)
      offset.setLength(THREE.MathUtils.clamp(offset.length()*factor,distance*.6,distance*1.6))
      camera.position.copy(controls.target).add(offset)
      controls.update()
    },
    reset() {controls.reset();model.position.copy(basePosition);model.rotation.copy(baseEuler);clearPointer();scrollKick=0;resumeAt=performance.now()+700;interacted=false;spinning=false},
    async download() {
      const result=await new GLTFExporter().parseAsync(model,{binary:true})
      if(disposed) return
      const blob=new Blob([result as ArrayBuffer],{type:'model/gltf-binary'})
      const url=URL.createObjectURL(blob)
      const link=document.createElement('a');link.href=url;link.download=`ai-juicing-${kind}.glb`;link.click()
      window.setTimeout(()=>URL.revokeObjectURL(url),1000)
    },
    dispose() {
      disposed=true;cancelAnimationFrame(frame);trigger.kill();intersection.disconnect();resizeObserver.disconnect()
      document.removeEventListener('visibilitychange',wake)
      renderer.domElement.removeEventListener('webglcontextlost',contextLost)
      renderer.domElement.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointermove',onPointerMove)
      document.documentElement.removeEventListener('pointerleave',clearPointer)
      window.removeEventListener('blur',clearPointer)
      controls.removeEventListener('start',onStart);controls.removeEventListener('end',onEnd);controls.dispose()
      const geometries=new Set<THREE.BufferGeometry>(), materials=new Set<THREE.Material>()
      model.traverse(object=>{if(object instanceof THREE.Mesh){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>materials.add(m))}})
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());environment.dispose()
      renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove()
    },
  }
}

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

export type ModelKind = 'robot' | 'camera' | 'chip'

/** Real geometry, with modeled fronts, sides, and backs. No image planes. */
export function buildModel(kind: ModelKind) {
  const group = new THREE.Group()
  group.name = `AI Juicing ${kind}`
  const dark = new THREE.MeshStandardMaterial({ color: '#181522', metalness: .55, roughness: .26 })
  const chrome = new THREE.MeshStandardMaterial({ color: '#c5cfda', metalness: .95, roughness: .2 })
  const pink = new THREE.MeshPhysicalMaterial({ color: '#ff19ae', metalness: .2, roughness: .22, clearcoat: 1 })
  const cyan = new THREE.MeshPhysicalMaterial({ color: '#04deeb', metalness: .2, roughness: .2, clearcoat: 1 })
  const yellow = new THREE.MeshPhysicalMaterial({ color: '#ffe52d', metalness: .15, roughness: .24, clearcoat: 1 })
  const white = new THREE.MeshPhysicalMaterial({ color: '#fffbea', roughness: .23, clearcoat: 1 })
  const glow = new THREE.MeshStandardMaterial({ color: '#00e7ff', emissive: '#00c4ff', emissiveIntensity: .8, roughness: .2 })
  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0) {
    const m = new THREE.Mesh(geometry, material)
    m.position.set(x,y,z)
    group.add(m)
    return m
  }
  function box(w: number,h: number,d: number, material: THREE.Material,x=0,y=0,z=0,r=.12) {
    return mesh(new RoundedBoxGeometry(w,h,d,3,r),material,x,y,z)
  }
  function sphere(r: number,material: THREE.Material,x=0,y=0,z=0) {
    return mesh(new THREE.SphereGeometry(r,32,24),material,x,y,z)
  }
  function disk(r: number,d: number,material: THREE.Material,x=0,y=0,z=0) {
    const m=mesh(new THREE.CylinderGeometry(r,r,d,48),material,x,y,z)
    m.rotation.x=Math.PI/2
    return m
  }
  if (kind === 'robot') {
    // A rounded cube with neon paint wrapping continuously around every face.
    // Dense vertices keep the original neon color transitions smooth in real 3D.
    function headGeometry() {
      const geometry = new RoundedBoxGeometry(2.16, 2.04, 1.95, 12, .30)
      const positions = geometry.getAttribute('position')
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i)
        const crown = .10 * (1 - Math.pow(Math.abs(x) / 1.08, 2)) * THREE.MathUtils.smoothstep(y, -.1, 1.02)
        // Keep the face in place while adding depth behind it.
        positions.setXYZ(i, x, y + crown, z - .325)
      }
      geometry.computeVertexNormals()
      return geometry
    }
    const shell = headGeometry()
    const positions = shell.getAttribute('position')
    const uv: number[] = []
    for (let i = 0; i < positions.count; i++) {
      uv.push((positions.getX(i) + 1.08) / 2.16, (positions.getY(i) + 1.02) / 2.14)
    }
    shell.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
    // A continuous hue gradient avoids white bands from interpolating RGB
    // vertex colors across the broad, flat faces of the cube.
    const pixels = new Uint8Array(128 * 128 * 4)
    const color = new THREE.Color()
    for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
      const across = x / 127
      const top = THREE.MathUtils.smoothstep(y / 127, .25, .85)
      // Spread the warm transition across the full face, with room for orange
      // and red before reaching magenta; retain the cool blue upper corner.
      const warmHue = across < .60
        ? THREE.MathUtils.lerp(.16, 0, across / .60)
        : THREE.MathUtils.lerp(0, -.15, (across - .60) / .40)
      const coolHue = THREE.MathUtils.lerp(.16, .62, across)
      const hue = THREE.MathUtils.lerp(warmHue, coolHue, top)
      color.setHSL((hue + 1) % 1, 1, .40)
      const index = (y * 128 + x) * 4
      pixels[index] = Math.round(color.r * 255)
      pixels[index + 1] = Math.round(color.g * 255)
      pixels[index + 2] = Math.round(color.b * 255)
      pixels[index + 3] = 255
    }
    const neonTexture = new THREE.DataTexture(pixels, 128, 128)
    neonTexture.magFilter = THREE.LinearFilter
    neonTexture.minFilter = THREE.LinearFilter
    neonTexture.needsUpdate = true
    const paint = new THREE.MeshPhysicalMaterial({ map: neonTexture, roughness: .4, metalness: 0, clearcoat: .12, clearcoatRoughness: .3, specularIntensity: .08, envMapIntensity: .15, toneMapped: false })
    mesh(shell, paint, 0, .77, .05)
    // Large, slightly bulging eye and tiny off-centre eye preserve the mascot's expression.
    sphere(.50, dark, .43, .89, .70).scale.set(1, 1.04, .35)
    sphere(.411, white, .43, .90, .80).scale.set(1, 1.03, .30)
    const pupil = sphere(.107, dark, .43, .88, .922)
    pupil.name = 'robot-pupil'
    pupil.scale.z = .42
    sphere(.116, dark, -.68, .72, .707).scale.set(.84, 1, .4)
    const smallPupil = sphere(.035, cyan, -.69, .75, .754)
    smallPupil.name = 'robot-small-pupil'
    smallPupil.scale.z = .3
    mesh(new THREE.ConeGeometry(.065, .115, 3), dark, -.24, .49, .724).rotation.x = Math.PI / 2
    box(.095, .027, .025, dark, -.23, .31, .72, .01)
    const mouth = box(1.03, .027, .028, dark, -.13, .005, .694, .01)
    mouth.rotation.z = -.035
    const brow = box(.78, .027, .028, dark, -.34, 1.43, .696, .01)
    brow.rotation.z = -.055
    for (const x of [-.76, .06]) sphere(.022, dark, x, 1.45, .704)
    const highlight = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-.94, 1.30, .68), new THREE.Vector3(-.91, 1.60, .66),
      new THREE.Vector3(-.73, 1.77, .63), new THREE.Vector3(-.36, 1.85, .58),
    ])
    mesh(new THREE.TubeGeometry(highlight, 32, .027, 8, false), white)
    const purple = new THREE.MeshPhysicalMaterial({ color: '#753695', metalness: .5, roughness: .26, clearcoat: .7 })
    for (const side of [-1, 1]) {
      const ear = disk(.35, .22, dark, side * 1.10, .58, 0); ear.rotation.set(0, 0, Math.PI / 2)
      const outer = disk(.28, .15, chrome, side * 1.24, .58, 0); outer.rotation.set(0, 0, Math.PI / 2)
      const inset = disk(.22, .13, purple, side * 1.34, .58, 0); inset.rotation.set(0, 0, Math.PI / 2)
      const ring = disk(.155, .14, dark, side * 1.41, .58, 0); ring.rotation.set(0, 0, Math.PI / 2)
      const bolt = disk(.095, .15, chrome, side * 1.44, .58, 0); bolt.rotation.set(0, 0, Math.PI / 2)
      sphere(.16, dark, side * .60, -.52, 0)
      const arm = box(.25, .49, .28, dark, side * .73, -.79, 0, .09); arm.rotation.z = side * .32
      const sleeve = box(.22, .18, .30, side === 1 ? pink : yellow, side * .73, -.74, .02, .045); sleeve.rotation.z = side * .32
      const cuff = box(.23, .12, .30, chrome, side * .79, -.94, .02, .04); cuff.rotation.z = side * .32
      sphere(.155, dark, side * .83, -1.10, .03)
      sphere(.105, yellow, side * .83, -1.10, .15)
      box(.43, .22, .56, dark, side * .29, -1.42, .10, .1)
      box(.30, .055, .27, side === 1 ? pink : cyan, side * .29, -1.45, .30, .025)
    }
    box(.45, .18, .46, chrome, 0, -.31, 0)
    box(1.10, .94, .78, dark, 0, -.85, 0, .16)
    box(.99, .82, .80, pink, 0, -.85, .02, .14)
    box(.45, .78, .81, yellow, -.24, -.85, .025, .13)
    box(.55, .17, .09, dark, -.02, -.54, .46, .03)
    box(.38, .085, .035, glow, -.035, -.53, .52, .015)
    box(.84, .45, .13, dark, -.06, -.92, .49, .04)
    box(.76, .38, .13, chrome, -.06, -.92, .52, .035)
    box(.43, .20, .035, dark, -.17, -.91, .595, .015)
    const screen = new THREE.MeshStandardMaterial({ color: '#91b8b3', metalness: .3, roughness: .38 })
    box(.35, .13, .035, screen, -.17, -.90, .62, .01)
    box(.09, .22, .035, dark, .23, -.92, .60, .012)
    box(.043, .15, .025, screen, .23, -.92, .63, .007)
    box(.73, .58, .1, dark, 0, -.86, -.43, .05)
    for (let i = 0; i < 3; i++) box(.4, .035, .03, chrome, 0, -.7 - i * .12, -.495, .01)
    const flameMat = new THREE.MeshPhysicalMaterial({ color: '#ffb000', emissive: '#ff6a00', emissiveIntensity: .35, roughness: .2, clearcoat: 1 })
    const points = [new THREE.Vector2(0, -.38), new THREE.Vector2(.16, -.33), new THREE.Vector2(.23, -.17), new THREE.Vector2(.18, .02), new THREE.Vector2(.08, .24), new THREE.Vector2(0, .46)]
    // Pivot at the nozzle so the growing drop stays attached until release.
    const drop = new THREE.Group()
    drop.name = 'juice-drop'
    drop.position.y = -1.50
    group.add(drop)
    const outline = mesh(new THREE.LatheGeometry(points, 48), dark, 0, -.46, 0)
    outline.scale.set(1.1, 1.04, 1.1)
    const juice = mesh(new THREE.LatheGeometry(points, 48), flameMat, 0, -.46, .045)
    drop.add(outline, juice)
    group.position.y = .08
  } else if(kind === 'camera') {
    box(2.3,1.45,1.1,dark,0,0,0,.2)
    box(2.18,1.31,1.12,pink,0,0,.015,.17)
    box(1.2,.37,.85,dark,-.27,.81,0,.1)
    box(.65,.25,.7,chrome,-.27,1.04,0,.06)
    disk(.64,.27,dark,.18,0,.67)
    disk(.54,.33,chrome,.18,0,.84)
    disk(.45,.37,dark,.18,0,1.01)
    disk(.34,.045,cyan,.18,0,1.22)
    disk(.23,.05,dark,.18,0,1.25)
    sphere(.06,white,.08,.13,1.29).scale.z=.15
    box(.39,.24,.06,yellow,-.75,.39,.61,.03)
    box(.3,1.07,1.16,dark,.98,-.07,0,.1)
    disk(.14,.12,yellow,.76,.78,0).rotation.x=0
    box(1.4,.9,.08,chrome,-.25,0,-.6,.07)
    box(1.23,.73,.05,dark,-.25,0,-.665,.04)
    for(let i=0;i<3;i++) disk(.08,.04,cyan,.7,.25-i*.23,-.64)
    group.rotation.y=-.35
  } else {
    box(2.15,2.15,.22,dark,0,0,0,.16)
    box(1.82,1.82,.25,cyan,0,0,.03,.12)
    box(1.25,1.25,.31,chrome,0,0,.18,.12)
    box(1.03,1.03,.33,dark,0,0,.2,.09)
    // A small connected neural network is actual geometry on the chip surface.
    const nodes=[[-.3,.3],[.3,.3],[0,0],[-.3,-.3],[.3,-.3]]
    nodes.forEach(([x,y])=>sphere(.08,glow,x,y,.41))
    nodes.filter((_,i)=>i!==2).forEach(([x,y])=>{
      const a=new THREE.Vector3(x,y,.405),b=new THREE.Vector3(0,0,.405)
      mesh(new THREE.TubeGeometry(new THREE.LineCurve3(a,b),1,.015,8,false),pink)
    })
    for(const side of [-1,1]) for(let i=0;i<6;i++) {
      const offset=-.77+i*.31
      box(.3,.12,.13,chrome,side*1.18,offset,0,.025)
      box(.12,.3,.13,chrome,offset,side*1.18,0,.025)
    }
    box(1.3,1.3,.12,pink,0,0,-.19,.1)
    group.rotation.set(.12,-.3,.15)
  }
  return group
}

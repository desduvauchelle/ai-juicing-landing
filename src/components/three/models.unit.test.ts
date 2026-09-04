import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Box3, Vector3, Mesh } from 'three'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { buildModel, type ModelKind } from './models'

// GLTFExporter uses this browser API to package the binary payload.
beforeAll(() => vi.stubGlobal('FileReader', class {
  result: ArrayBuffer | null = null
  onloadend: (() => void) | null = null
  readAsArrayBuffer(blob: Blob) {
    void blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.() })
  }
}))
afterAll(() => vi.unstubAllGlobals())

describe('interactive models', () => {
  for (const kind of ['robot', 'camera', 'chip'] as ModelKind[]) {
    it(`exports ${kind} as a self-contained 3D GLB with depth`, async () => {
      const model = buildModel(kind)
      const size = new Box3().setFromObject(model).getSize(new Vector3())
      expect([size.x, size.y, size.z].every(n => Number.isFinite(n) && n > .5)).toBe(true)
      const glb = await new GLTFExporter().parseAsync(model, { binary: true }) as ArrayBuffer
      const view = new DataView(glb)
      expect(view.getUint32(0, true)).toBe(0x46546c67)
      expect(view.getUint32(4, true)).toBe(2)
      expect(view.getUint32(8, true)).toBe(glb.byteLength)
      const json = JSON.parse(new TextDecoder().decode(new Uint8Array(glb, 20, view.getUint32(12, true))))
      expect(json.meshes.length).toBeGreaterThan(10)
      expect(json.buffers[0].uri).toBeUndefined()
      model.traverse(object => {
        if (object instanceof Mesh) {
          object.geometry.dispose()
          for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose()
        }
      })
    })
  }
})

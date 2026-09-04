'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useVisualMotionPaused } from '@/components/landing/CosmicScene'
import type { ModelKind } from './models'
import type { createViewer } from './viewer-runtime'

type Viewer = ReturnType<typeof createViewer>

export function ObjectViewer({kind, compact=false, reactive=false}:{kind:ModelKind;compact?:boolean;reactive?:boolean}) {
  const host=useRef<HTMLDivElement>(null)
  const viewer=useRef<Viewer|null>(null)
  const [status,setStatus]=useState<'loading'|'ready'|'error'>('loading')
  const paused=useVisualMotionPaused()
  const pausedRef=useRef(paused)
  pausedRef.current=paused

  useEffect(()=>{
    let cancelled=false,started=false
    const element=host.current!
    const observer=new IntersectionObserver(entries=>{
      if(!entries[0].isIntersecting || started) return
      started=true;observer.disconnect()
      import('./viewer-runtime').then(({createViewer})=>{
        if(cancelled)return
        try {
          viewer.current=createViewer(element,kind,()=>setStatus('error'),reactive)
          viewer.current.pause(pausedRef.current)
          setStatus('ready')
        } catch(error) {console.error('3D viewer unavailable',error);setStatus('error')}
      }).catch(()=>{if(!cancelled)setStatus('error')})
    },{rootMargin:'200px'})
    observer.observe(element)
    return ()=>{cancelled=true;observer.disconnect();viewer.current?.dispose();viewer.current=null}
  },[kind,reactive])
  useEffect(()=>{viewer.current?.pause(paused)},[paused])

  const name=kind==='robot'?'The mascot':kind==='camera'?'Behind the camera':'Inside the AI'
  return <div className={`object-viewer ${compact?'object-viewer-compact':''}`}>
    <div className="object-stage" ref={host} />
    {status!=='ready' && <div className="object-fallback">
      {kind==='robot' && <Image src="/images/ai-juicing-mascot-3d.png" alt="AI Juicing robot mascot preview" width={1254} height={1254} priority />}
      <p role="status">{status==='error'?'3D is unavailable in this browser.':`Loading ${name.toLowerCase()}…`}</p>
    </div>}

  </div>
}

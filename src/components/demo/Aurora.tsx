"use client"

import React, { useEffect, useRef } from "react"
import { Renderer, Program, Mesh, Color, Triangle } from "ogl"
import { AuroraProps, FRAG, VERT } from "@/types/aurora"

export default function Aurora(props: AuroraProps) {
    const { colorStops = ["#00d8ff", "#7cff67", "#00d8ff"], amplitude = 1.0, blend = 0.5 } = props
    const propsRef = useRef<AuroraProps>(props)
    propsRef.current = props

    const ctnDom = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctn = ctnDom.current
        if (!ctn) return

        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: true,
            antialias: true,
        })
        const gl = renderer.gl
        gl.clearColor(0, 0, 0, 0)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        gl.canvas.style.backgroundColor = "transparent"

        let program: Program | undefined

        function resize() {
            if (!ctn) return
            const width = ctn.offsetWidth
            const height = ctn.offsetHeight
            renderer.setSize(width, height)
            if (program) {
                program.uniforms.uResolution.value = [width, height]
            }
        }
        window.addEventListener("resize", resize)

        const geometry = new Triangle(gl)
        if (geometry.attributes.uv) {
            // TypeScript may require a type assertion here.
            delete (geometry.attributes as any).uv
        }

        const colorStopsArray = colorStops.map((hex) => {
            const c = new Color(hex)
            return [c.r, c.g, c.b]
        })

        program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uAmplitude: { value: amplitude },
                uColorStops: { value: colorStopsArray },
                uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
                uBlend: { value: blend },
            },
        })

        const mesh = new Mesh(gl, { geometry, program })
        ctn.appendChild(gl.canvas)

        let animateId = 0
        const update = (t: number) => {
            animateId = requestAnimationFrame(update)
            const { time = t * 0.01, speed = 1.0 } = propsRef.current
            if (program) {
                program.uniforms.uTime.value = time * speed * 0.1
                program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0
                program.uniforms.uBlend.value = propsRef.current.blend ?? blend
                const stops = propsRef.current.colorStops ?? colorStops
                program.uniforms.uColorStops.value = stops.map((hex: string) => {
                    const c = new Color(hex)
                    return [c.r, c.g, c.b]
                })
                renderer.render({ scene: mesh })
            }
        }
        animateId = requestAnimationFrame(update)

        resize()

        return () => {
            cancelAnimationFrame(animateId)
            window.removeEventListener("resize", resize)
            if (ctn && gl.canvas.parentNode === ctn) {
                ctn.removeChild(gl.canvas)
            }
            gl.getExtension("WEBGL_lose_context")?.loseContext()
        }
    }, [amplitude])

    return <div ref={ctnDom} className="w-full h-full" />
}


import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, Play, RotateCcw } from 'lucide-react'

interface Point {
  x: number
  y: number
}

interface EasingPreset {
  name: string
  p1: Point
  p2: Point
}

const presets: EasingPreset[] = [
  { name: 'ease', p1: { x: 0.25, y: 0.1 }, p2: { x: 0.25, y: 1 } },
  { name: 'linear', p1: { x: 0, y: 0 }, p2: { x: 1, y: 1 } },
  { name: 'ease-in', p1: { x: 0.42, y: 0 }, p2: { x: 1, y: 1 } },
  { name: 'ease-out', p1: { x: 0, y: 0 }, p2: { x: 0.58, y: 1 } },
  { name: 'ease-in-out', p1: { x: 0.42, y: 0 }, p2: { x: 0.58, y: 1 } },
  { name: 'ease-in-back', p1: { x: 0.6, y: -0.28 }, p2: { x: 0.735, y: 0.045 } },
  { name: 'ease-out-back', p1: { x: 0.175, y: 0.885 }, p2: { x: 0.32, y: 1.275 } },
  { name: 'ease-in-out-back', p1: { x: 0.68, y: -0.55 }, p2: { x: 0.265, y: 1.55 } },
]

export function EasingVisualizer() {
  const [p1, setP1] = useState<Point>({ x: 0.25, y: 0.1 })
  const [p2, setP2] = useState<Point>({ x: 0.25, y: 1 })
  const [dragging, setDragging] = useState<'p1' | 'p2' | null>(null)
  const [copied, setCopied] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const size = 200
  const padding = 20

  // Convert normalized coordinates (0-1) to SVG coordinates
  const toSvg = useCallback(
    (point: Point): Point => ({
      x: padding + point.x * (size - padding * 2),
      y: size - padding - point.y * (size - padding * 2),
    }),
    []
  )

  // Convert SVG coordinates to normalized (0-1)
  const fromSvg = useCallback(
    (point: Point): Point => ({
      x: Math.max(0, Math.min(1, (point.x - padding) / (size - padding * 2))),
      y: Math.max(-0.5, Math.min(1.5, (size - padding - point.y) / (size - padding * 2))),
    }),
    []
  )

  const handleMouseDown = useCallback((point: 'p1' | 'p2') => {
    setDragging(point)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const normalized = fromSvg({ x, y })

      if (dragging === 'p1') {
        setP1(normalized)
      } else {
        setP2(normalized)
      }
    },
    [dragging, fromSvg]
  )

  const handleMouseUp = useCallback(() => {
    setDragging(null)
  }, [])

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  const cubicBezier = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cubicBezier)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePlay = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setAnimationKey((k) => k + 1)
      setIsAnimating(true)
    }, 50)
  }

  const handlePreset = (preset: EasingPreset) => {
    setP1(preset.p1)
    setP2(preset.p2)
  }

  const handleReset = () => {
    setP1({ x: 0.25, y: 0.1 })
    setP2({ x: 0.25, y: 1 })
  }

  // SVG coordinates
  const p1Svg = toSvg(p1)
  const p2Svg = toSvg(p2)
  const start = toSvg({ x: 0, y: 0 })
  const end = toSvg({ x: 1, y: 1 })

  // Generate path
  const pathD = `M ${start.x} ${start.y} C ${p1Svg.x} ${p1Svg.y}, ${p2Svg.x} ${p2Svg.y}, ${end.x} ${end.y}`

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <span>📊</span>
          Easing Visualizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* SVG Editor */}
          <div className="space-y-4">
            <svg
              ref={svgRef}
              width={size}
              height={size}
              className="bg-card border border-border rounded-lg cursor-crosshair mx-auto block"
              style={{ touchAction: 'none' }}
            >
              {/* Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.1"
                  />
                </pattern>
              </defs>
              <rect width={size} height={size} fill="url(#grid)" />

              {/* Diagonal reference line */}
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />

              {/* Control point lines */}
              <line
                x1={start.x}
                y1={start.y}
                x2={p1Svg.x}
                y2={p1Svg.y}
                stroke="#06b6d4"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <line
                x1={end.x}
                y1={end.y}
                x2={p2Svg.x}
                y2={p2Svg.y}
                stroke="#0891b2"
                strokeWidth="1.5"
                opacity="0.5"
              />

              {/* Bezier curve */}
              <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="3" />

              {/* Start and end points */}
              <circle cx={start.x} cy={start.y} r="4" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              <circle cx={end.x} cy={end.y} r="4" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />

              {/* Control points (draggable) */}
              <circle
                cx={p1Svg.x}
                cy={p1Svg.y}
                r="8"
                fill="#06b6d4"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-grab active:cursor-grabbing"
                onMouseDown={() => handleMouseDown('p1')}
              />
              <circle
                cx={p2Svg.x}
                cy={p2Svg.y}
                r="8"
                fill="#0891b2"
                stroke="#fff"
                strokeWidth="2"
                className="cursor-grab active:cursor-grabbing"
                onMouseDown={() => handleMouseDown('p2')}
              />
            </svg>

            {/* Controls */}
            <div className="flex justify-center gap-2">
              <Button size="sm" variant="outline" onClick={handlePlay}>
                <Play className="w-4 h-4 mr-1" />
                Play
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <Button size="sm" variant="outline" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                Copy
              </Button>
            </div>
          </div>

          {/* Preview and presets */}
          <div className="space-y-4">
            {/* Animation preview */}
            <div className="h-16 bg-card border border-border rounded-lg relative overflow-hidden">
              <div
                key={animationKey}
                className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-lg"
                style={{
                  left: isAnimating ? 'calc(100% - 56px)' : '16px',
                  transition: isAnimating ? `left 1s ${cubicBezier}` : 'none',
                }}
              />
            </div>

            {/* CSS output */}
            <div className="p-3 bg-[#1e1e1e] rounded-lg font-mono text-sm">
              <span className="text-purple-400">transition-timing-function</span>
              <span className="text-white">: </span>
              <span className="text-cyan-400">{cubicBezier}</span>
              <span className="text-white">;</span>
            </div>

            {/* Presets */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Presets</p>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handlePreset(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

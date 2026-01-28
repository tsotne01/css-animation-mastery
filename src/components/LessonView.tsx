import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CodePlayground } from '@/components/CodePlayground'
import { EasingVisualizer } from '@/components/EasingVisualizer'
import { type Lesson, getAdjacentLessons, curriculum } from '@/data/curriculum'
import { type LessonContent } from '@/types/lesson'
import { Check, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'

interface LessonViewProps {
  lesson: Lesson
  onNavigate?: (lesson: Lesson) => void
  isComplete?: boolean
  onMarkComplete?: (lessonId: string) => void
}

export function LessonView({ lesson, onNavigate, isComplete, onMarkComplete }: LessonViewProps) {
  const { t } = useTranslation()
  const { prev, next } = getAdjacentLessons(lesson.id)
  const module = curriculum.find((m) => m.id === lesson.module)

  // Get lesson content from translations
  const rawContent = t(`lessons.${lesson.id}.content`, { returnObjects: true })
  const content: LessonContent | null = typeof rawContent === 'object' && rawContent !== null
    ? rawContent as LessonContent
    : null

  const handleComplete = () => {
    if (!isComplete) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#0891b2', '#0e7490'],
      })
      onMarkComplete?.(lesson.id)
    }
  }

  // Lesson-specific code examples and preview HTML
  const lessonExamples: Record<string, { code: string; html: string }> = {
    // Module 1: Transitions
    'intro-motion': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.3s ease;
}

.box:hover {
  transform: scale(1.2);
}`,
      html: '<div class="box"></div>',
    },
    'transition-property': {
      code: `.box {
  background: #06b6d4;
  transition-property: transform;
  transition-duration: 0.3s;
}

.box:hover {
  transform: scale(1.2);
}`,
      html: '<div class="box"></div>',
    },
    'timing-function': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.5s ease-out;
}

.box:hover {
  transform: translateX(100px);
}`,
      html: '<div class="box"></div>',
    },
    'transition-delay': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.3s ease-out 0.2s;
}

.box:hover {
  transform: rotate(180deg);
}`,
      html: '<div class="box"></div>',
    },
    'multi-transitions': {
      code: `.box {
  background: #06b6d4;
  opacity: 0.7;
  transition: 
    transform 0.3s ease-out,
    opacity 0.2s ease-in,
    background-color 0.3s ease;
}

.box:hover {
  transform: scale(1.2) rotate(10deg);
  opacity: 1;
  background-color: #0891b2;
}`,
      html: '<div class="box"></div>',
    },
    'challenge-hover-card': {
      code: `.card {
  background: #1e293b;
  padding: 24px;
  border-radius: 12px;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(6, 182, 212, 0.3);
}`,
      html: '<div class="card"><h3>Hover Me</h3><p>Watch the magic happen!</p></div>',
    },

    // Module 2: Transforms
    'translate': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.4s ease-out;
}

.box:hover {
  transform: translate(60px, -30px);
}`,
      html: '<div class="box"></div>',
    },
    'rotate': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.5s ease-in-out;
}

.box:hover {
  transform: rotate(360deg);
}`,
      html: '<div class="box"></div>',
    },
    'scale': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.3s ease-out;
}

.box:hover {
  transform: scale(1.5);
}`,
      html: '<div class="box"></div>',
    },
    'skew': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.4s ease-out;
}

.box:hover {
  transform: skew(15deg, 5deg);
}`,
      html: '<div class="box"></div>',
    },
    'combining-transforms': {
      code: `.box {
  background: #06b6d4;
  transition: transform 0.5s ease-out;
}

.box:hover {
  transform: 
    translateY(-20px) 
    rotate(15deg) 
    scale(1.2);
}`,
      html: '<div class="box"></div>',
    },
    'transform-origin': {
      code: `.box {
  background: #06b6d4;
  transform-origin: top left;
  transition: transform 0.5s ease-out;
}

.box:hover {
  transform: rotate(45deg);
}`,
      html: '<div class="box"></div>',
    },
    'challenge-card-flip': {
      code: `.scene {
  perspective: 600px;
  width: 200px;
  height: 120px;
}

.flip-card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
}

.scene:hover .flip-card {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
}

.front { background: #06b6d4; }

.back {
  background: #0e7490;
  transform: rotateY(180deg);
}`,
      html: '<div class="scene"><div class="flip-card"><div class="front">Front</div><div class="back">Back!</div></div></div>',
    },

    // Module 3: Keyframe Animations
    'keyframes-basics': {
      code: `@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.box {
  background: #06b6d4;
  animation: pulse 1.5s ease-in-out infinite;
}`,
      html: '<div class="box"></div>',
    },
    'animation-name-duration': {
      code: `@keyframes slideIn {
  from { transform: translateX(-120px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

.box {
  background: #06b6d4;
  animation-name: slideIn;
  animation-duration: 0.8s;
  animation-fill-mode: both;
}`,
      html: '<div class="box"></div>',
    },
    'animation-timing': {
      code: `@keyframes move {
  to { transform: translateX(100px); }
}

.box {
  background: #06b6d4;
  animation: move 1s ease-in-out infinite alternate;
}`,
      html: '<div class="box"></div>',
    },
    'animation-delay-iteration': {
      code: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-40px); }
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

.dot {
  animation: bounce 0.8s ease-in-out infinite;
}`,
      html: '<div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>',
    },
    'animation-direction': {
      code: `@keyframes slide {
  from { transform: translateX(-60px); }
  to   { transform: translateX(60px); }
}

.box {
  background: #06b6d4;
  animation: slide 1s ease-in-out infinite alternate;
}`,
      html: '<div class="box"></div>',
    },
    'animation-fill-mode': {
      code: `@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.box {
  background: #06b6d4;
  opacity: 0;
  animation: fadeSlide 0.6s ease-out 0.5s;
  animation-fill-mode: forwards;
}`,
      html: '<div class="box"></div>',
    },
    'animation-play-state': {
      code: `@keyframes spin {
  to { transform: rotate(360deg); }
}

.box {
  background: #06b6d4;
  animation: spin 2s linear infinite;
}

.box:hover {
  animation-play-state: paused;
}`,
      html: '<div class="box"></div>',
    },
    'animation-shorthand': {
      code: `@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 8px #06b6d4;
  }
  50% {
    box-shadow: 0 0 30px #06b6d4,
                0 0 60px rgba(6,182,212,0.4);
  }
}

.box {
  background: #06b6d4;
  /* name | duration | timing | delay | count | direction | fill | state */
  animation: glow 2s ease-in-out 0s infinite alternate both running;
}`,
      html: '<div class="box"></div>',
    },
    'multi-step-keyframes': {
      code: `@keyframes journey {
  0%   { transform: translate(0, 0) rotate(0); background: #06b6d4; }
  25%  { transform: translate(80px, 0) rotate(90deg); background: #0891b2; }
  50%  { transform: translate(80px, 60px) rotate(180deg); background: #0e7490; }
  75%  { transform: translate(0, 60px) rotate(270deg); background: #0891b2; }
  100% { transform: translate(0, 0) rotate(360deg); background: #06b6d4; }
}

.box {
  width: 50px;
  height: 50px;
  background: #06b6d4;
  border-radius: 8px;
  animation: journey 3s ease-in-out infinite;
}`,
      html: '<div class="box"></div>',
    },
    'challenge-bouncing-loader': {
      code: `@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.dot {
  animation: bounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
.dot:nth-child(3) { animation-delay: 0s; }`,
      html: '<div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>',
    },

    // Module 4: Timing Deep Dive
    'cubic-bezier': {
      code: `@keyframes move {
  to { transform: translateX(100px); }
}

.box {
  background: #06b6d4;
  /* "Bounce out" custom curve */
  animation: move 1s cubic-bezier(0.34, 1.56, 0.64, 1) infinite alternate;
}`,
      html: '<div class="box"></div>',
    },
    'steps': {
      code: `@keyframes flicker {
  to { opacity: 0; }
}

.box {
  background: #06b6d4;
  box-shadow: 0 0 20px #06b6d4;
  animation: flicker 1s steps(5, end) infinite alternate;
}`,
      html: '<div class="box"></div>',
    },
    'easing-visualizer': {
      code: `@keyframes move {
  to { transform: translateX(100px); }
}

.box {
  background: #06b6d4;
  animation: move 1.5s ease-in-out infinite alternate;
}`,
      html: '<div class="box"></div>',
    },
    'challenge-typewriter': {
      code: `.typewriter {
  font-family: monospace;
  font-size: 20px;
  color: #06b6d4;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #06b6d4;
  width: 0;
  animation:
    typing 3s steps(18) 0.5s forwards,
    blink 0.7s step-end infinite;
}

@keyframes typing {
  to { width: 18ch; }
}

@keyframes blink {
  50% { border-color: transparent; }
}`,
      html: '<div class="typewriter">CSS is amazing! 🚀</div>',
    },

    // Module 5: Performance
    'layout-paint-composite': {
      code: `/* ✅ GOOD: composite-only */
.box {
  background: #06b6d4;
  transition: transform 0.3s ease-out;
}

.box:hover {
  transform: translateX(80px);
}

/* Composite = fast (GPU).
   Layout triggers (width, top) 
   cause reflow and are slow. */`,
      html: '<div class="box"></div>',
    },
    'will-change': {
      code: `.box {
  background: #06b6d4;
  will-change: transform;
  transition: transform 0.3s ease-out;
}

.box:hover {
  transform: scale(1.3) rotate(10deg);
}

/* will-change hints the browser
   to promote to its own GPU layer.
   Remove it when not animating! */`,
      html: '<div class="box"></div>',
    },
    'safe-properties': {
      code: `/* ✅ Safe: transform + opacity */
.box {
  background: #06b6d4;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}

.box:hover {
  transform: translateY(-20px) scale(1.1);
  opacity: 0.8;
}

/* Avoid animating: width, height,
   top, left, margin, padding */`,
      html: '<div class="box"></div>',
    },
    'reduced-motion': {
      code: `@keyframes spin {
  to { transform: rotate(360deg); }
}

.box {
  background: #06b6d4;
  animation: spin 2s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .box {
    animation: none;
    /* Provide non-motion alternative */
    opacity: 0.9;
  }
}`,
      html: '<div class="box"></div>',
    },
    'challenge-optimize': {
      code: `/* ❌ BAD: animating layout props */
/*
.box {
  width: 80px;
  transition: width 0.3s, margin-left 0.3s;
}
.box:hover {
  width: 120px;
  margin-left: 20px;
}
*/

/* ✅ FIXED: use transform instead */
.box {
  background: #06b6d4;
  will-change: transform;
  transition: transform 0.3s ease-out;
}

.box:hover {
  transform: scaleX(1.5) translateX(10px);
}`,
      html: '<div class="box"></div>',
    },

    // Module 6: Scroll Animations
    'animation-timeline-intro': {
      code: `@keyframes grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.bar {
  width: 200px;
  height: 8px;
  background: #06b6d4;
  border-radius: 4px;
  transform-origin: left;
  animation: grow linear both;
  animation-timeline: scroll();
}`,
      html: '<div style="height:300vh;display:flex;align-items:start;justify-content:center;padding-top:40px"><div class="bar"></div></div>',
    },
    'scroll-function': {
      code: `@keyframes progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: #06b6d4;
  transform-origin: left;
  animation: progress linear;
  animation-timeline: scroll();
}`,
      html: '<div class="bar"></div><div style="height:400vh;padding:60px 20px"><p style="color:#06b6d4">↕ Scroll to see progress bar</p></div>',
    },
    'view-function': {
      code: `@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  animation: fadeIn linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

.reveal {
  width: 120px;
  height: 60px;
  background: #06b6d4;
  border-radius: 12px;
  margin: 80vh auto 20px;
}`,
      html: '<div style="height:200vh;padding-top:20px"><p style="color:#94a3b8;text-align:center">↓ Scroll down</p></div><div class="reveal"></div><div style="height:100vh"></div>',
    },
    'scroll-view-timeline': {
      code: `@keyframes rotate {
  to { transform: rotate(360deg); }
}

.box {
  background: #06b6d4;
  animation: rotate linear both;
  animation-timeline: scroll();
}`,
      html: '<div style="height:300vh;display:flex;align-items:start;justify-content:center;padding:40px"><div class="box"></div></div>',
    },
    'animation-range': {
      code: `@keyframes reveal {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}

.box {
  background: #06b6d4;
  margin: 100vh auto 20px;
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}`,
      html: '<div style="height:80vh"><p style="color:#94a3b8;text-align:center;padding:20px">↓ Scroll down</p></div><div class="box"></div><div style="height:100vh"></div>',
    },
    'challenge-parallax': {
      code: `@keyframes parallax {
  from { transform: translateY(60px); }
  to   { transform: translateY(-60px); }
}

.box {
  background: #06b6d4;
  animation: parallax linear both;
  animation-timeline: scroll();
}`,
      html: '<div style="height:400vh;display:flex;align-items:center;justify-content:center"><div class="box"></div></div>',
    },
    'challenge-reveal': {
      code: `@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.box {
  background: #06b6d4;
  margin: 100vh auto 40px;
  animation: slideUp linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}`,
      html: '<div style="height:60vh"><p style="color:#94a3b8;text-align:center;padding:20px">↓ Scroll to reveal</p></div><div class="box"></div><div style="height:100vh"></div>',
    },

    // Module 7: Advanced
    'motion-path': {
      code: `@keyframes follow {
  to { offset-distance: 100%; }
}

.circle {
  width: 30px;
  height: 30px;
  background: #06b6d4;
  border-radius: 50%;
  offset-path: path("M 0,0 C 50,-80 150,80 200,0");
  animation: follow 2s ease-in-out infinite alternate;
}`,
      html: '<div style="padding:60px"><div class="circle"></div></div>',
    },
    '3d-perspective': {
      code: `.scene {
  perspective: 400px;
  display: flex;
  justify-content: center;
}

.box {
  background: #06b6d4;
  transition: transform 0.6s ease-out;
  transform-style: preserve-3d;
}

.box:hover {
  transform: rotateY(45deg) rotateX(15deg);
}`,
      html: '<div class="scene"><div class="box"></div></div>',
    },
    'clip-path-animations': {
      code: `.box {
  background: #06b6d4;
  width: 100px;
  height: 100px;
  clip-path: circle(50% at 50% 50%);
  transition: clip-path 0.5s ease-out;
}

.box:hover {
  clip-path: polygon(
    50% 0%, 100% 38%, 82% 100%,
    18% 100%, 0% 38%
  );
}`,
      html: '<div class="box"></div>',
    },
    'filter-animations': {
      code: `@keyframes glow {
  0%, 100% {
    filter: brightness(1) blur(0px);
  }
  50% {
    filter: brightness(1.4) blur(2px);
  }
}

.box {
  background: #06b6d4;
  animation: glow 2s ease-in-out infinite;
}`,
      html: '<div class="box"></div>',
    },
    'variable-fonts': {
      code: `@keyframes breathe {
  0%, 100% { font-weight: 300; letter-spacing: 2px; }
  50%      { font-weight: 900; letter-spacing: 8px; }
}

.text {
  font-size: 28px;
  color: #06b6d4;
  font-family: system-ui;
  animation: breathe 3s ease-in-out infinite;
}`,
      html: '<div class="text" style="text-align:center">Animate</div>',
    },
    'discrete-animations': {
      code: `@keyframes fadeOut {
  from {
    opacity: 1;
    display: block;
  }
  to {
    opacity: 0;
    display: none;
  }
}

.box {
  background: #06b6d4;
  transition: opacity 0.4s ease-out,
              display 0.4s allow-discrete;
}

.box:hover {
  opacity: 0;
}`,
      html: '<div class="box"></div>',
    },
    'view-transitions': {
      code: `@keyframes morph {
  0%   { border-radius: 12px; background: #06b6d4; }
  50%  { border-radius: 50%; background: #0e7490; }
  100% { border-radius: 12px; background: #06b6d4; }
}

.box {
  background: #06b6d4;
  animation: morph 2.5s ease-in-out infinite;
  view-transition-name: hero;
}`,
      html: '<div class="box"></div>',
    },

    // Module 8: Bonus Topics
    'houdini-property': {
      code: `@property --hue {
  syntax: "<number>";
  inherits: false;
  initial-value: 190;
}

@keyframes hueShift {
  to { --hue: 260; }
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: hsl(var(--hue) 80% 50%);
  animation: hueShift 2s ease-in-out infinite alternate;
}`,
      html: '<div class="box"></div>',
    },
    'color-interpolation': {
      code: `@keyframes spectrum {
  0%   { background: oklch(0.7 0.15 190); }
  33%  { background: oklch(0.7 0.15 260); }
  66%  { background: oklch(0.7 0.15 330); }
  100% { background: oklch(0.7 0.15 190); }
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  animation: spectrum 4s linear infinite;
}`,
      html: '<div class="box"></div>',
    },
    'orchestration': {
      code: `@keyframes pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.dot {
  animation: pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.12s; }
.dot:nth-child(3) { animation-delay: 0.24s; }`,
      html: '<div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>',
    },
    'spring-physics': {
      code: `@keyframes spring {
  0%   { transform: scale(0.3); }
  40%  { transform: scale(1.15); }
  60%  { transform: scale(0.95); }
  75%  { transform: scale(1.05); }
  90%  { transform: scale(0.98); }
  100% { transform: scale(1); }
}

.box {
  background: #06b6d4;
  animation: spring 0.8s ease-out;
}

.box:hover {
  animation: spring 0.8s ease-out;
}`,
      html: '<div class="box"></div>',
    },
  }

  // Get default code from lesson examples, then translations, then fallback
  const example = lessonExamples[lesson.id]
  const defaultCode = example?.code || content?.defaultCode || `.box {
  background: #06b6d4;
  transition: transform 0.3s ease;
}

.box:hover {
  transform: scale(1.2);
}`

  // Determine preview HTML based on lesson
  const getPreviewHtml = () => {
    if (example?.html) return example.html
    if (lesson.id === 'challenge-hover-card') {
      return `<div class="card"><h3>Hover Me</h3><p>Watch the magic happen!</p></div>`
    }
    return '<div class="box"></div>'
  }

  // Challenge validation
  const validateChallenge = lesson.id === 'challenge-hover-card' 
    ? (code: string) => {
        const hasTransition = code.includes('transition')
        const hasTransform = code.includes('transform') && code.includes('translateY')
        const hasHover = code.includes(':hover')
        
        if (hasTransition && hasTransform && hasHover) {
          return { valid: true, message: content?.successMessage || '🎉 Great job!' }
        }
        return { valid: false, message: 'Keep trying! Make sure you have transition, transform with translateY, and :hover styles.' }
      }
    : undefined

  return (
    <div className="min-h-screen p-4 lg:p-8 pt-16 lg:pt-8">
      <div
        key={lesson.id}
        className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {module?.icon} {t(`modules.${module?.id}`) || module?.title}
            </Badge>
            {isComplete && (
              <Badge className="bg-green-600 text-white text-xs">
                <Check className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl glow-border">
              {lesson.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold gradient-text">
                {t(`lessons.${lesson.id}.title`, { defaultValue: lesson.title })}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t(`lessons.${lesson.id}.subtitle`, { defaultValue: lesson.subtitle })}
              </p>
            </div>
          </div>
        </header>

        {/* Lesson Content */}
        {content && (
          <Card className="glass border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-100 fill-mode-both">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📚</span>
                {t('lesson.content')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Introduction */}
              {content.intro && (
                <p className="text-foreground leading-relaxed">{content.intro}</p>
              )}

              {/* Why Motion Matters */}
              {content.whyMotion && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.whyMotion}</h3>
                  {content.whyMotionText && (
                    <p className="text-muted-foreground">{content.whyMotionText}</p>
                  )}
                  {content.whyMotionList && (
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {content.whyMotionList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* 12 Principles */}
              {content.principles && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.principles}</h3>
                  {content.principlesText && (
                    <p className="text-muted-foreground">{content.principlesText}</p>
                  )}
                  {content.principlesList && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {content.principlesList.map((item, i) => (
                        <div key={i} className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <div className="font-medium text-primary">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CSS Overview */}
              {content.cssOverview && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.cssOverview}</h3>
                  {content.cssOverviewText && (
                    <p className="text-muted-foreground">{content.cssOverviewText}</p>
                  )}
                  {content.cssOverviewList && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {content.cssOverviewList.map((item, i) => (
                        <div key={i} className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* What can transition */}
              {content.whatCanTransition && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.whatCanTransition}</h3>
                  {content.whatCanTransitionText && (
                    <p className="text-muted-foreground">{content.whatCanTransitionText}</p>
                  )}
                  {content.transitionableList && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {content.transitionableList.map((item, i) => (
                        <div key={i} className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <div className="font-medium text-primary">{item.category}</div>
                          <code className="text-xs text-muted-foreground">{item.props}</code>
                        </div>
                      ))}
                    </div>
                  )}
                  {content.cantTransition && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <p className="text-sm text-amber-400">⚠️ {content.cantTransition}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Property explanation */}
              {content.property && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.property}</h3>
                  {content.propertyText && (
                    <p className="text-muted-foreground">{content.propertyText}</p>
                  )}
                  {content.propertyOptions && (
                    <div className="space-y-2">
                      {content.propertyOptions.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2">
                          <code className="px-2 py-0.5 bg-primary/20 text-primary rounded text-sm">{item.value}</code>
                          <span className="text-muted-foreground">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Duration */}
              {content.duration && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.duration}</h3>
                  {content.durationText && (
                    <p className="text-muted-foreground">{content.durationText}</p>
                  )}
                  {content.durationSyntax && (
                    <div className="space-y-2">
                      {content.durationSyntax.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2">
                          <code className="px-2 py-0.5 bg-primary/20 text-primary rounded text-sm">{item.value}</code>
                          <span className="text-muted-foreground">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Built-in timing functions */}
              {content.builtIn && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.builtIn}</h3>
                  {content.builtInText && (
                    <p className="text-muted-foreground">{content.builtInText}</p>
                  )}
                  {content.builtInList && (
                    <div className="space-y-2">
                      {content.builtInList.map((item, i) => (
                        <div key={i} className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <div className="flex items-center gap-2">
                            <code className="px-2 py-0.5 bg-primary/20 text-primary rounded text-sm">{item.name}</code>
                            <span className="text-muted-foreground text-sm">{item.desc}</span>
                          </div>
                          <code className="text-xs text-muted-foreground mt-1 block">{item.curve}</code>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* When to use */}
              {content.whenToUse && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.whenToUse}</h3>
                  {content.whenToUseList && (
                    <div className="space-y-2">
                      {content.whenToUseList.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2">
                          <code className="px-2 py-0.5 bg-primary/20 text-primary rounded text-sm">{item.func}</code>
                          <span className="text-muted-foreground">{item.use}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Delay */}
              {content.delay && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.delay}</h3>
                  {content.delayText && (
                    <p className="text-muted-foreground">{content.delayText}</p>
                  )}
                </div>
              )}

              {/* Shorthand */}
              {content.shorthand && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.shorthand}</h3>
                  {content.shorthandText && (
                    <p className="text-muted-foreground">{content.shorthandText}</p>
                  )}
                  {content.shorthandSyntax && (
                    <code className="block p-3 bg-[#1e1e1e] rounded-lg text-cyan-400">
                      {content.shorthandSyntax}
                    </code>
                  )}
                </div>
              )}

              {/* Multiple transitions */}
              {content.commaSeparated && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.commaSeparated}</h3>
                  {content.commaSeparatedText && (
                    <p className="text-muted-foreground">{content.commaSeparatedText}</p>
                  )}
                </div>
              )}

              {/* all vs specific */}
              {content.allVsSpecific && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{content.allVsSpecific}</h3>
                  {content.allVsSpecificText && (
                    <p className="text-muted-foreground">{content.allVsSpecificText}</p>
                  )}
                  {content.allVsSpecificList && (
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {content.allVsSpecificList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Challenge requirements */}
              {content.requirements && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">🎯 {content.requirements}</h3>
                  {content.requirementsList && (
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {content.requirementsList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Hints */}
              {content.hints && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">💡 {content.hints}</h3>
                  {content.hintsList && (
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {content.hintsList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Tip */}
              {content.tip && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm">
                    <span className="text-primary font-medium">💡 {t('lesson.tip')}:</span>{' '}
                    <span className="text-foreground">{content.tip}</span>
                  </p>
                </div>
              )}

              {/* Common mistakes */}
              {content.commonMistakes && content.commonMistakes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">⚠️ {t('lesson.commonMistakes')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {content.commonMistakes.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key points */}
              {content.keyPoints && content.keyPoints.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">✨ {t('lesson.keyPoints')}</h3>
                  <ul className="space-y-2">
                    {content.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Interactive Playground */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-200 fill-mode-both">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🎮</span>
            {t('playground.title')}
          </h2>
          <CodePlayground
            defaultCode={defaultCode}
            previewHtml={getPreviewHtml()}
            height="250px"
            validateCode={validateChallenge}
          />
        </div>

        {/* Easing Visualizer for timing function and easing-visualizer lessons */}
        {(lesson.id === 'timing-function' || lesson.id === 'easing-visualizer') && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 delay-300 fill-mode-both">
            <EasingVisualizer />
          </div>
        )}

        {/* Mark Complete Button */}
        {!isComplete && (
          <div className="flex justify-center animate-in fade-in duration-300 delay-300 fill-mode-both">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleComplete}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Mark as Complete
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 animate-in fade-in duration-300 delay-400 fill-mode-both">
          {prev ? (
            <Button variant="outline" className="gap-2" onClick={() => onNavigate?.(prev)}>
              <span>←</span>
              <span className="hidden sm:inline">{t(`lessons.${prev.id}.title`, { defaultValue: prev.title })}</span>
              <span className="sm:hidden">{t('nav.previous')}</span>
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => onNavigate?.(next)}
            >
              <span className="hidden sm:inline">{t(`lessons.${next.id}.title`, { defaultValue: next.title })}</span>
              <span className="sm:hidden">{t('nav.next')}</span>
              <span>→</span>
            </Button>
          ) : (
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              <span>🎉</span>
              <span>{t('nav.completeCourse')}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

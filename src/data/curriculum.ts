export interface Lesson {
  id: string
  title: string
  subtitle: string
  icon: string
  module: string
  content?: string
  defaultCode?: string
}

export interface Module {
  id: string
  title: string
  icon: string
  lessons: Lesson[]
}

export const curriculum: Module[] = [
  {
    id: 'transitions',
    title: 'Transitions',
    icon: '🌊',
    lessons: [
      {
        id: 'intro-motion',
        title: 'Introduction to Motion',
        subtitle: 'Why animation matters for user experience',
        icon: '✨',
        module: 'transitions',
      },
      {
        id: 'transition-property',
        title: 'transition-property & duration',
        subtitle: 'Controlling what animates and how long',
        icon: '⏱️',
        module: 'transitions',
      },
      {
        id: 'timing-function',
        title: 'transition-timing-function',
        subtitle: 'ease, linear, ease-in-out and more',
        icon: '📈',
        module: 'transitions',
      },
      {
        id: 'transition-delay',
        title: 'transition-delay & shorthand',
        subtitle: 'Delaying animations and the shorthand syntax',
        icon: '⏳',
        module: 'transitions',
      },
      {
        id: 'multi-transitions',
        title: 'Multiple Transitions',
        subtitle: 'Transitioning multiple properties at once',
        icon: '🎭',
        module: 'transitions',
      },
      {
        id: 'challenge-hover-card',
        title: 'Challenge: Smooth Hover Card',
        subtitle: 'Build a beautiful hover effect',
        icon: '🎮',
        module: 'transitions',
      },
    ],
  },
  {
    id: 'transforms',
    title: 'Transforms',
    icon: '🔄',
    lessons: [
      {
        id: 'translate',
        title: 'translate()',
        subtitle: 'Moving elements in 2D space',
        icon: '↔️',
        module: 'transforms',
      },
      {
        id: 'rotate',
        title: 'rotate()',
        subtitle: 'Spinning elements around',
        icon: '🔁',
        module: 'transforms',
      },
      {
        id: 'scale',
        title: 'scale()',
        subtitle: 'Growing and shrinking elements',
        icon: '🔍',
        module: 'transforms',
      },
      {
        id: 'skew',
        title: 'skew()',
        subtitle: 'Slanting elements',
        icon: '📐',
        module: 'transforms',
      },
      {
        id: 'combining-transforms',
        title: 'Combining Transforms',
        subtitle: 'Using multiple transforms together',
        icon: '🎯',
        module: 'transforms',
      },
      {
        id: 'transform-origin',
        title: 'transform-origin',
        subtitle: 'Changing the pivot point',
        icon: '📍',
        module: 'transforms',
      },
      {
        id: 'challenge-card-flip',
        title: 'Challenge: 3D Card Flip',
        subtitle: 'Build a flipping card effect',
        icon: '🎮',
        module: 'transforms',
      },
    ],
  },
  {
    id: 'keyframes',
    title: 'Keyframe Animations',
    icon: '🎬',
    lessons: [
      {
        id: 'keyframes-basics',
        title: '@keyframes Basics',
        subtitle: 'Creating custom animations',
        icon: '🎞️',
        module: 'keyframes',
      },
      {
        id: 'animation-name-duration',
        title: 'animation-name & duration',
        subtitle: 'Applying keyframe animations',
        icon: '🏷️',
        module: 'keyframes',
      },
      {
        id: 'animation-timing',
        title: 'animation-timing-function',
        subtitle: 'Easing in keyframe animations',
        icon: '📊',
        module: 'keyframes',
      },
      {
        id: 'animation-delay-iteration',
        title: 'delay & iteration-count',
        subtitle: 'Timing and repetition',
        icon: '🔄',
        module: 'keyframes',
      },
      {
        id: 'animation-direction',
        title: 'animation-direction',
        subtitle: 'reverse, alternate, and more',
        icon: '↩️',
        module: 'keyframes',
      },
      {
        id: 'animation-fill-mode',
        title: 'animation-fill-mode',
        subtitle: 'forwards, backwards, both',
        icon: '🎨',
        module: 'keyframes',
      },
      {
        id: 'animation-play-state',
        title: 'animation-play-state',
        subtitle: 'Pausing and playing animations',
        icon: '⏯️',
        module: 'keyframes',
      },
      {
        id: 'animation-shorthand',
        title: 'Animation Shorthand',
        subtitle: 'The complete animation property',
        icon: '📝',
        module: 'keyframes',
      },
      {
        id: 'multi-step-keyframes',
        title: 'Multi-Step Keyframes',
        subtitle: '0%, 25%, 50%, 75%, 100%',
        icon: '📈',
        module: 'keyframes',
      },
      {
        id: 'challenge-bouncing-loader',
        title: 'Challenge: Bouncing Loader',
        subtitle: 'Build an animated loading indicator',
        icon: '🎮',
        module: 'keyframes',
      },
    ],
  },
  {
    id: 'timing',
    title: 'Timing Deep Dive',
    icon: '⏰',
    lessons: [
      {
        id: 'cubic-bezier',
        title: 'cubic-bezier()',
        subtitle: 'Custom easing curves',
        icon: '〰️',
        module: 'timing',
      },
      {
        id: 'steps',
        title: 'steps()',
        subtitle: 'Frame-by-frame animations',
        icon: '🎯',
        module: 'timing',
      },
      {
        id: 'easing-visualizer',
        title: 'Easing Visualizer',
        subtitle: 'Interactive timing function explorer',
        icon: '📊',
        module: 'timing',
      },
      {
        id: 'challenge-typewriter',
        title: 'Challenge: Typewriter Effect',
        subtitle: 'Build a typing animation with steps()',
        icon: '🎮',
        module: 'timing',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: '⚡',
    lessons: [
      {
        id: 'layout-paint-composite',
        title: 'Layout, Paint, Composite',
        subtitle: 'How browsers render animations',
        icon: '🖥️',
        module: 'performance',
      },
      {
        id: 'will-change',
        title: 'will-change & GPU',
        subtitle: 'Optimizing with hardware acceleration',
        icon: '🚀',
        module: 'performance',
      },
      {
        id: 'safe-properties',
        title: 'Safe Properties',
        subtitle: 'transform & opacity for smooth animations',
        icon: '✅',
        module: 'performance',
      },
      {
        id: 'reduced-motion',
        title: 'prefers-reduced-motion',
        subtitle: 'Accessible animation practices',
        icon: '♿',
        module: 'performance',
      },
      {
        id: 'challenge-optimize',
        title: 'Challenge: Fix Janky Animation',
        subtitle: 'Optimize a poorly performing animation',
        icon: '🎮',
        module: 'performance',
      },
    ],
  },
  {
    id: 'scroll-animations',
    title: 'Scroll Animations',
    icon: '📜',
    lessons: [
      {
        id: 'animation-timeline-intro',
        title: 'Introduction to animation-timeline',
        subtitle: 'The future of scroll-driven animations',
        icon: '🆕',
        module: 'scroll-animations',
      },
      {
        id: 'scroll-function',
        title: 'scroll() Function',
        subtitle: 'Linking animations to scroll position',
        icon: '📏',
        module: 'scroll-animations',
      },
      {
        id: 'view-function',
        title: 'view() Function',
        subtitle: 'Animations based on element visibility',
        icon: '👁️',
        module: 'scroll-animations',
      },
      {
        id: 'scroll-view-timeline',
        title: 'scroll-timeline & view-timeline',
        subtitle: 'Named timelines for complex animations',
        icon: '🎯',
        module: 'scroll-animations',
      },
      {
        id: 'animation-range',
        title: 'animation-range',
        subtitle: 'entry, exit, contain, cover',
        icon: '📐',
        module: 'scroll-animations',
      },
      {
        id: 'challenge-parallax',
        title: 'Challenge: Parallax Effect',
        subtitle: 'Build a scroll-based parallax',
        icon: '🎮',
        module: 'scroll-animations',
      },
      {
        id: 'challenge-reveal',
        title: 'Challenge: Reveal on Scroll',
        subtitle: 'Animate elements as they enter view',
        icon: '🎮',
        module: 'scroll-animations',
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    icon: '🧪',
    lessons: [
      {
        id: 'motion-path',
        title: 'Motion Path',
        subtitle: 'offset-path & offset-distance',
        icon: '🛤️',
        module: 'advanced',
      },
      {
        id: '3d-perspective',
        title: '3D & Perspective',
        subtitle: 'Creating depth with CSS',
        icon: '🎲',
        module: 'advanced',
      },
      {
        id: 'clip-path-animations',
        title: 'clip-path Animations',
        subtitle: 'Animating clipping masks',
        icon: '✂️',
        module: 'advanced',
      },
      {
        id: 'filter-animations',
        title: 'Filter Animations',
        subtitle: 'blur, brightness, and more',
        icon: '🌈',
        module: 'advanced',
      },
      {
        id: 'variable-fonts',
        title: 'Variable Font Animations',
        subtitle: 'Animating font-weight & font-stretch',
        icon: '🔤',
        module: 'advanced',
      },
      {
        id: 'discrete-animations',
        title: 'Discrete Property Animations',
        subtitle: 'Animating display & visibility (NEW)',
        icon: '🆕',
        module: 'advanced',
      },
      {
        id: 'view-transitions',
        title: 'View Transitions API',
        subtitle: 'Page transitions made easy',
        icon: '🔀',
        module: 'advanced',
      },
    ],
  },
  {
    id: 'bonus',
    title: 'Bonus Topics',
    icon: '🌶️',
    lessons: [
      {
        id: 'houdini-property',
        title: 'CSS Houdini @property',
        subtitle: 'Custom animatable properties',
        icon: '🎩',
        module: 'bonus',
      },
      {
        id: 'color-interpolation',
        title: 'Color Interpolation',
        subtitle: 'oklch & color-mix animations',
        icon: '🎨',
        module: 'bonus',
      },
      {
        id: 'orchestration',
        title: 'Animation Orchestration',
        subtitle: 'Stagger, sequence, and choreography',
        icon: '🎼',
        module: 'bonus',
      },
      {
        id: 'spring-physics',
        title: 'Spring Physics in CSS',
        subtitle: 'Approximating natural motion',
        icon: '🌀',
        module: 'bonus',
      },
    ],
  },
]

// Helper to get all lessons flat
export const getAllLessons = (): Lesson[] => {
  return curriculum.flatMap(module => module.lessons)
}

// Helper to get next/previous lesson
export const getAdjacentLessons = (currentId: string) => {
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex(l => l.id === currentId)
  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
  }
}

// Stats
export const totalLessons = getAllLessons().length
export const totalModules = curriculum.length

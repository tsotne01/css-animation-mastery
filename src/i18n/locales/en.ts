export default {
  // Navigation
  nav: {
    progress: 'Progress',
    previous: 'Previous',
    next: 'Next',
    completeCourse: 'Complete Course!',
    toggleMenu: 'Toggle menu',
  },

  // Header
  header: {
    title: 'Animation Mastery',
    subtitle: 'CSS Animations Course',
    builtFor: 'Built for',
    by: 'by Kai & Tsotne',
  },

  // Playground
  playground: {
    title: 'Interactive Playground',
    runCode: 'Run Code',
    reset: 'Reset',
    copy: 'Copy',
    preview: 'Preview',
    hoverTip: 'Hover over elements to test!',
    css: 'CSS',
  },

  // Lesson
  lesson: {
    content: 'Lesson Content',
    tip: 'Tip',
    warning: 'Warning',
    example: 'Example',
    tryIt: 'Try it yourself!',
    challenge: 'Challenge',
    commonMistakes: 'Common Mistakes',
    keyPoints: 'Key Points',
  },

  // Theme
  theme: {
    toggle: 'Toggle theme',
    light: 'Light',
    dark: 'Dark',
  },

  // Language
  language: {
    toggle: 'Toggle language',
    en: 'English',
    ka: 'ქართული',
  },

  // Module titles
  modules: {
    transitions: 'Transitions',
    transforms: 'Transforms',
    keyframes: 'Keyframe Animations',
    timing: 'Timing Deep Dive',
    performance: 'Performance',
    scrollAnimations: 'Scroll Animations',
    advanced: 'Advanced',
    bonus: 'Bonus Topics',
  },

  // Lessons - Module 1: Transitions
  lessons: {
    'intro-motion': {
      title: 'Introduction to Motion',
      subtitle: 'Why animation matters for user experience',
      content: {
        intro: `Welcome to CSS Animation Mastery! In this course, you'll learn everything about creating smooth, performant, and delightful animations using pure CSS.`,
        
        whyMotion: `Why Does Motion Matter?`,
        whyMotionText: `Motion is fundamental to how we perceive and interact with the world. In user interfaces, well-designed animations:`,
        whyMotionList: [
          'Guide user attention to important elements',
          'Provide feedback that actions were successful',
          'Create a sense of direct manipulation',
          'Make interfaces feel more natural and intuitive',
          'Reduce cognitive load by showing relationships',
        ],
        
        principles: 'The 12 Principles of Animation',
        principlesText: `Disney animators developed 12 principles that make animation feel alive. Many apply to UI:`,
        principlesList: [
          { name: 'Squash & Stretch', desc: 'Give objects weight and flexibility' },
          { name: 'Anticipation', desc: 'Prepare the user for an action' },
          { name: 'Staging', desc: 'Direct attention to what matters' },
          { name: 'Ease In/Out', desc: 'Natural acceleration and deceleration' },
          { name: 'Follow Through', desc: 'Parts continue moving after stopping' },
          { name: 'Secondary Action', desc: 'Supporting actions add richness' },
        ],
        
        cssOverview: 'CSS Animation Overview',
        cssOverviewText: `CSS provides two main ways to create animations:`,
        cssOverviewList: [
          { name: 'Transitions', desc: 'Animate between two states (A → B)' },
          { name: 'Keyframe Animations', desc: 'Define complex multi-step animations' },
        ],
        
        keyPoints: [
          'Motion makes interfaces feel alive and intuitive',
          'Good animations guide attention and provide feedback',
          'CSS offers transitions and keyframes for different needs',
          'We\'ll start with transitions - the foundation of CSS animation',
        ],
      },
    },

    'transition-property': {
      title: 'transition-property & duration',
      subtitle: 'Controlling what animates and how long',
      content: {
        intro: `The \`transition-property\` and \`transition-duration\` properties are the foundation of CSS transitions. Let's learn how to use them.`,
        
        whatCanTransition: 'What Can Be Transitioned?',
        whatCanTransitionText: `Not all CSS properties can be transitioned. Transitionable properties have intermediate values between states:`,
        transitionableList: [
          { category: 'Layout', props: 'width, height, margin, padding' },
          { category: 'Colors', props: 'color, background-color, border-color' },
          { category: 'Transform', props: 'transform (translate, rotate, scale)' },
          { category: 'Visual', props: 'opacity, box-shadow, filter' },
        ],
        
        cantTransition: `Properties like \`display\`, \`font-family\`, or \`position\` cannot be transitioned because they don't have intermediate values.`,
        
        property: 'transition-property',
        propertyText: `Specifies which property to animate. You can use:`,
        propertyOptions: [
          { value: 'all', desc: 'Animate all transitionable properties (default but not recommended)' },
          { value: 'none', desc: 'Disable all transitions' },
          { value: 'specific', desc: 'Name specific properties like opacity, transform' },
        ],
        
        duration: 'transition-duration',
        durationText: `Specifies how long the transition takes:`,
        durationSyntax: [
          { value: '0.3s', desc: '300 milliseconds (recommended for UI)' },
          { value: '300ms', desc: 'Same as above, in milliseconds' },
          { value: '1s', desc: 'One second (feels slow for UI)' },
        ],
        
        tip: `For UI interactions, keep durations between 150ms-400ms. Faster feels snappy, slower feels smooth.`,
        
        commonMistakes: [
          'Using `all` instead of specific properties (performance issue)',
          'Forgetting to add duration (default is 0s)',
          'Making durations too long (over 500ms feels sluggish)',
        ],
        
        defaultCode: `.box {
  background: #06b6d4;
  transition-property: transform;
  transition-duration: 0.3s;
}

.box:hover {
  transform: scale(1.2);
}`,
      },
    },

    'timing-function': {
      title: 'transition-timing-function',
      subtitle: 'ease, linear, ease-in-out and more',
      content: {
        intro: `The timing function controls the acceleration curve of your transition. It determines how the animation progresses over time.`,
        
        builtIn: 'Built-in Timing Functions',
        builtInText: `CSS provides five keyword values:`,
        builtInList: [
          { name: 'ease', desc: 'Starts slow, speeds up, ends slow (default)', curve: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
          { name: 'linear', desc: 'Constant speed throughout', curve: 'cubic-bezier(0, 0, 1, 1)' },
          { name: 'ease-in', desc: 'Starts slow, accelerates', curve: 'cubic-bezier(0.42, 0, 1, 1)' },
          { name: 'ease-out', desc: 'Starts fast, decelerates', curve: 'cubic-bezier(0, 0, 0.58, 1)' },
          { name: 'ease-in-out', desc: 'Symmetric acceleration/deceleration', curve: 'cubic-bezier(0.42, 0, 0.58, 1)' },
        ],
        
        whenToUse: 'When to Use Each',
        whenToUseList: [
          { func: 'ease-out', use: 'User-triggered actions (clicks, hovers)' },
          { func: 'ease-in', use: 'Exit animations (elements leaving)' },
          { func: 'ease-in-out', use: 'Looping or reversing animations' },
          { func: 'linear', use: 'Progress bars, color changes' },
        ],
        
        tip: `For most UI interactions, ease-out feels the most natural because it gives immediate feedback (fast start) and settles smoothly (slow end).`,
        
        defaultCode: `.box {
  background: #06b6d4;
  transition: transform 0.5s ease-out;
}

.box:hover {
  transform: translateX(100px);
}`,
      },
    },

    'transition-delay': {
      title: 'transition-delay & shorthand',
      subtitle: 'Delaying animations and the shorthand syntax',
      content: {
        intro: `The delay property lets you wait before starting a transition, and the shorthand combines all transition properties into one.`,
        
        delay: 'transition-delay',
        delayText: `Specifies a wait time before the transition starts:`,
        delaySyntax: [
          { value: '0s', desc: 'No delay (default)' },
          { value: '0.2s', desc: 'Wait 200ms before animating' },
          { value: '-0.1s', desc: 'Start 100ms into the animation (skip ahead)' },
        ],
        
        delayUses: 'Creative Uses for Delay',
        delayUsesList: [
          'Staggered animations (each item delays slightly more)',
          'Preventing accidental hover triggers',
          'Creating sequential effects',
        ],
        
        shorthand: 'The Transition Shorthand',
        shorthandText: `Combine all properties in one declaration:`,
        shorthandSyntax: 'transition: property duration timing-function delay;',
        shorthandExample: `/* These are equivalent */
transition-property: transform;
transition-duration: 0.3s;
transition-timing-function: ease-out;
transition-delay: 0.1s;

/* Shorthand */
transition: transform 0.3s ease-out 0.1s;`,
        
        tip: `Order matters in shorthand! The first time value is duration, the second is delay.`,
        
        defaultCode: `.box {
  background: #06b6d4;
  transition: transform 0.3s ease-out 0.2s;
}

.box:hover {
  transform: rotate(180deg);
}`,
      },
    },

    'multi-transitions': {
      title: 'Multiple Transitions',
      subtitle: 'Transitioning multiple properties at once',
      content: {
        intro: `Often you'll want to animate several properties at once, each with different timing. Let's learn how!`,
        
        commaSeparated: 'Comma-Separated Values',
        commaSeparatedText: `Separate multiple transitions with commas:`,
        commaSeparatedExample: `transition: 
  transform 0.3s ease-out,
  opacity 0.2s ease-in,
  background-color 0.5s linear;`,
        
        differentTimings: 'Why Different Timings?',
        differentTimingsList: [
          'Transform might need longer for complex movements',
          'Opacity changes look good with quick ease-in',
          'Colors often benefit from linear timing',
        ],
        
        allVsSpecific: 'all vs Specific Properties',
        allVsSpecificText: `While \`transition: all 0.3s\` is convenient, it has downsides:`,
        allVsSpecificList: [
          'Animates properties you might not want animated',
          'Can cause performance issues',
          'Makes debugging harder',
          'Less control over individual properties',
        ],
        
        tip: `Always list specific properties for production code. It's more verbose but gives you precise control.`,
        
        defaultCode: `.box {
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
      },
    },

    'challenge-hover-card': {
      title: 'Challenge: Smooth Hover Card',
      subtitle: 'Build a beautiful hover effect',
      content: {
        intro: `Time to put your skills to the test! Create a smooth hover effect for a card component.`,
        
        requirements: 'Challenge Requirements',
        requirementsList: [
          'Card should lift up slightly on hover (translateY)',
          'Add a subtle scale increase',
          'Smooth shadow transition',
          'Use appropriate easing and duration',
        ],
        
        starterCode: `/* Your task: Create a smooth hover effect */
.card {
  /* Add your transitions here */
}

.card:hover {
  /* Add your hover state here */
}`,
        
        hints: 'Hints',
        hintsList: [
          'Use translateY with negative values to lift up',
          'Scale between 1 and 1.02 for subtle growth',
          'box-shadow can be transitioned too!',
          'ease-out works great for hover effects',
        ],
        
        successMessage: '🎉 Great job! Your card has a beautiful hover effect!',
        
        defaultCode: `.card {
  background: #1e293b;
  padding: 24px;
  border-radius: 12px;
  /* Add your transition here */
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}

.card:hover {
  /* Add your hover styles */
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(6, 182, 212, 0.3);
}`,
      },
    },
  },
}

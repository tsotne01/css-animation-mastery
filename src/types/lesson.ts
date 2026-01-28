export interface LessonContent {
  intro?: string
  whyMotion?: string
  whyMotionText?: string
  whyMotionList?: string[]
  principles?: string
  principlesText?: string
  principlesList?: Array<{ name: string; desc: string }>
  cssOverview?: string
  cssOverviewText?: string
  cssOverviewList?: Array<{ name: string; desc: string }>
  keyPoints?: string[]
  whatCanTransition?: string
  whatCanTransitionText?: string
  transitionableList?: Array<{ category: string; props: string }>
  cantTransition?: string
  property?: string
  propertyText?: string
  propertyOptions?: Array<{ value: string; desc: string }>
  duration?: string
  durationText?: string
  durationSyntax?: Array<{ value: string; desc: string }>
  builtIn?: string
  builtInText?: string
  builtInList?: Array<{ name: string; desc: string; curve: string }>
  whenToUse?: string
  whenToUseList?: Array<{ func: string; use: string }>
  delay?: string
  delayText?: string
  delaySyntax?: Array<{ value: string; desc: string }>
  delayUses?: string
  delayUsesList?: string[]
  shorthand?: string
  shorthandText?: string
  shorthandSyntax?: string
  shorthandExample?: string
  commaSeparated?: string
  commaSeparatedText?: string
  commaSeparatedExample?: string
  differentTimings?: string
  differentTimingsList?: string[]
  allVsSpecific?: string
  allVsSpecificText?: string
  allVsSpecificList?: string[]
  requirements?: string
  requirementsList?: string[]
  hints?: string
  hintsList?: string[]
  starterCode?: string
  successMessage?: string
  tip?: string
  commonMistakes?: string[]
  defaultCode?: string
}

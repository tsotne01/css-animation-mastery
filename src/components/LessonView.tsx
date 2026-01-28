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

  // Get default code from translations or use fallback
  const defaultCode = content?.defaultCode || `.box {
  background: #06b6d4;
  transition: transform 0.3s ease;
}

.box:hover {
  transform: scale(1.2);
}`

  // Determine preview HTML based on lesson
  const getPreviewHtml = () => {
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

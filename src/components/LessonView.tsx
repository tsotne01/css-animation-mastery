import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type Lesson, getAdjacentLessons, curriculum } from '@/data/curriculum'

interface LessonViewProps {
  lesson: Lesson
}

export function LessonView({ lesson }: LessonViewProps) {
  const { prev, next } = getAdjacentLessons(lesson.id)
  const module = curriculum.find(m => m.id === lesson.module)

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-4 animate-slide-in">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {module?.icon} {module?.title}
            </Badge>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl glow-border">
              {lesson.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold gradient-text">{lesson.title}</h1>
              <p className="text-muted-foreground mt-1">{lesson.subtitle}</p>
            </div>
          </div>
        </header>

        {/* Placeholder content */}
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📚</span>
              Lesson Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This lesson will teach you about <strong className="text-foreground">{lesson.title}</strong>.
            </p>
            
            {/* Demo animation box */}
            <div className="h-48 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="w-20 h-20 bg-primary rounded-xl animate-float shadow-lg shadow-primary/30" />
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">💡 Tip:</span> This is where interactive code examples and explanations will go.
                Content coming soon!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Playground placeholder */}
        <Card className="border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎮</span>
              Interactive Playground
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Code editor placeholder */}
              <div className="h-64 rounded-lg bg-[#1e1e1e] border border-border p-4 font-mono text-sm">
                <div className="text-muted-foreground mb-2">/* CSS */</div>
                <div>
                  <span className="text-purple-400">.box</span> {'{'}
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">animation</span>: float 3s ease-in-out infinite;
                </div>
                <div>{'}'}</div>
              </div>
              
              {/* Preview placeholder */}
              <div className="h-64 rounded-lg bg-card border border-border flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg animate-float" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          {prev ? (
            <Button variant="outline" className="gap-2">
              <span>←</span>
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <span className="hidden sm:inline">{next.title}</span>
              <span className="sm:hidden">Next</span>
              <span>→</span>
            </Button>
          ) : (
            <Button className="gap-2 bg-green-600 hover:bg-green-700">
              <span>🎉</span>
              <span>Complete Course!</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

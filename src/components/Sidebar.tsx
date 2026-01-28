import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { curriculum, totalLessons, type Lesson } from '@/data/curriculum'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentLesson: Lesson
  onSelectLesson: (lesson: Lesson) => void
}

export function Sidebar({ isOpen, onClose, currentLesson, onSelectLesson }: SidebarProps) {
  // TODO: Track completed lessons in localStorage
  const completedLessons = 0
  const progressPercent = (completedLessons / totalLessons) * 100

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-50',
          'transform transition-transform duration-300 ease-in-out',
          'flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-float">
              <span className="text-2xl">🎬</span>
            </div>
            <div>
              <h1 className="font-bold text-lg gradient-text">Animation Mastery</h1>
              <p className="text-xs text-muted-foreground">CSS Animations Course</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completedLessons}/{totalLessons}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="space-y-4">
            {curriculum.map((module) => (
              <div key={module.id} className="space-y-1">
                {/* Module header */}
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted-foreground">
                  <span>{module.icon}</span>
                  <span>{module.title}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {module.lessons.length}
                  </Badge>
                </div>

                {/* Lessons */}
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson)
                      onClose()
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
                      'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      currentLesson.id === lesson.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-muted-foreground'
                    )}
                  >
                    <span className="text-base">{lesson.icon}</span>
                    <span className="truncate text-left">{lesson.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            Built for{' '}
            <a href="https://10x.edu.ge" target="_blank" rel="noopener" className="text-primary hover:underline">
              10x Academy
            </a>
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            by Kai & Tsotne
          </p>
        </div>
      </aside>
    </>
  )
}

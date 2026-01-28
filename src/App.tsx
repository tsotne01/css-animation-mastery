import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { LessonView } from '@/components/LessonView'
import { curriculum, type Lesson } from '@/data/curriculum'

function App() {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(curriculum[0].lessons[0])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentLesson={currentLesson}
        onSelectLesson={setCurrentLesson}
      />

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
        <LessonView lesson={currentLesson} onNavigate={setCurrentLesson} />
      </main>
    </div>
  )
}

export default App

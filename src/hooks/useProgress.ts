import { useState, useEffect, useCallback } from 'react'
import { getAllLessons } from '@/data/curriculum'

const STORAGE_KEY = 'css-animation-mastery-progress'

interface ProgressState {
  completedLessons: string[]
  currentLessonId: string | null
}

const getInitialState = (): ProgressState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore parsing errors
  }
  return {
    completedLessons: [],
    currentLessonId: null,
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(getInitialState)
  const allLessons = getAllLessons()

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Ignore storage errors
    }
  }, [state])

  const markComplete = useCallback((lessonId: string) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev
      }
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      }
    })
  }, [])

  const markIncomplete = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.filter((id) => id !== lessonId),
    }))
  }, [])

  const setCurrentLesson = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      currentLessonId: lessonId,
    }))
  }, [])

  const isComplete = useCallback(
    (lessonId: string) => state.completedLessons.includes(lessonId),
    [state.completedLessons]
  )

  const progressPercent = (state.completedLessons.length / allLessons.length) * 100

  const resetProgress = useCallback(() => {
    setState({
      completedLessons: [],
      currentLessonId: null,
    })
  }, [])

  return {
    completedLessons: state.completedLessons,
    completedCount: state.completedLessons.length,
    totalCount: allLessons.length,
    progressPercent,
    currentLessonId: state.currentLessonId,
    markComplete,
    markIncomplete,
    setCurrentLesson,
    isComplete,
    resetProgress,
  }
}

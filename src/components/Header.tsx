import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Globe } from 'lucide-react'
import { changeLanguage } from '@/i18n'

interface HeaderProps {
  isDark: boolean
  toggleTheme: () => void
}

export function Header({ isDark, toggleTheme }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  const handleLanguageToggle = () => {
    changeLanguage(currentLang === 'en' ? 'ka' : 'en')
  }

  return (
    <header className="fixed top-0 right-0 z-40 p-4 flex items-center gap-2">
      {/* Language toggle */}
      <Button
        size="sm"
        variant="ghost"
        onClick={handleLanguageToggle}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
        title={t('language.toggle')}
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium">
          {currentLang === 'en' ? 'EN' : 'KA'}
        </span>
      </Button>

      {/* Theme toggle */}
      <Button
        size="sm"
        variant="ghost"
        onClick={toggleTheme}
        className="text-muted-foreground hover:text-foreground"
        title={t('theme.toggle')}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
    </header>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RotateCcw, Play, Copy, Check } from 'lucide-react'

interface CodePlaygroundProps {
  defaultCode: string
  previewHtml?: string
  height?: string
  onCodeChange?: (code: string) => void
  validateCode?: (code: string) => { valid: boolean; message: string }
}

export function CodePlayground({
  defaultCode,
  previewHtml = '<div class="box"></div>',
  height = '300px',
  onCodeChange,
  validateCode,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(defaultCode)
  const [appliedCode, setAppliedCode] = useState(defaultCode)
  const [copied, setCopied] = useState(false)
  const [validation, setValidation] = useState<{ valid: boolean; message: string } | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Generate the iframe content with the CSS
  const generatePreviewHTML = useCallback((cssCode: string) => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #111827;
      overflow: hidden;
    }
    .box {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #06b6d4, #0891b2);
      border-radius: 12px;
      cursor: pointer;
    }
    .card {
      width: 200px;
      padding: 24px;
      background: #1e293b;
      border-radius: 12px;
      border: 1px solid #334155;
      cursor: pointer;
    }
    .card h3 {
      color: #f0f6fc;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .card p {
      color: #94a3b8;
      font-size: 14px;
    }
    .button {
      padding: 12px 24px;
      background: #06b6d4;
      color: #0a0f1a;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
    .circle {
      width: 60px;
      height: 60px;
      background: #06b6d4;
      border-radius: 50%;
    }
    .loader {
      display: flex;
      gap: 8px;
    }
    .loader .dot {
      width: 12px;
      height: 12px;
      background: #06b6d4;
      border-radius: 50%;
    }
    ${cssCode}
  </style>
</head>
<body>
  ${previewHtml}
</body>
</html>`
  }, [previewHtml])

  // Update iframe when code is applied
  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument
      if (doc) {
        doc.open()
        doc.write(generatePreviewHTML(appliedCode))
        doc.close()
      }
    }
  }, [appliedCode, generatePreviewHTML])

  const handleRun = () => {
    setAppliedCode(code)
    onCodeChange?.(code)
    
    if (validateCode) {
      const result = validateCode(code)
      setValidation(result)
    }
  }

  const handleReset = () => {
    setCode(defaultCode)
    setAppliedCode(defaultCode)
    setValidation(null)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Auto-run on first mount
  useEffect(() => {
    handleRun()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="overflow-hidden border-primary/20">
      <div className="grid md:grid-cols-2 divide-x divide-border">
        {/* Code Editor */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-border">
            <span className="text-sm font-medium text-muted-foreground">CSS</span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={handleCopy}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={handleReset}
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <CodeMirror
            value={code}
            height={height}
            theme={oneDark}
            extensions={[css()]}
            onChange={(value) => setCode(value)}
            className="text-sm"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              foldGutter: true,
              autocompletion: true,
            }}
          />
          <div className="p-2 bg-[#1e1e1e] border-t border-border">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleRun}
            >
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
            <span className="text-sm font-medium text-muted-foreground">Preview</span>
            <span className="text-xs text-muted-foreground">Hover over elements to test!</span>
          </div>
          <div className="relative" style={{ height: `calc(${height} + 44px)` }}>
            <iframe
              ref={iframeRef}
              title="Preview"
              className="absolute inset-0 w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>

      {/* Validation feedback */}
      {validation && (
        <div
          className={`p-3 border-t ${
            validation.valid
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{validation.valid ? '✅' : '💡'}</span>
            <span className="text-sm">{validation.message}</span>
          </div>
        </div>
      )}
    </Card>
  )
}

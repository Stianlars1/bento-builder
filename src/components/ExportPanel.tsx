'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BentoGrid } from '@/types/bento'
import { cn } from '@/lib/utils'
import { Copy, Download, Code, FileCode, FileText } from 'lucide-react'

interface ExportPanelProps {
  grid: BentoGrid
}

type ExportFormat = 'html' | 'css' | 'react' | 'tailwind' | 'json'

const exportFormats = [
  { 
    id: 'html' as ExportFormat, 
    label: 'HTML', 
    icon: FileCode, 
    description: 'Pure HTML structure',
    extension: 'html'
  },
  { 
    id: 'css' as ExportFormat, 
    label: 'CSS', 
    icon: FileText, 
    description: 'CSS Grid styles',
    extension: 'css'
  },
  { 
    id: 'react' as ExportFormat, 
    label: 'React', 
    icon: Code, 
    description: 'React component',
    extension: 'jsx'
  },
  { 
    id: 'tailwind' as ExportFormat, 
    label: 'Tailwind', 
    icon: FileCode, 
    description: 'Tailwind CSS classes',
    extension: 'html'
  },
  { 
    id: 'json' as ExportFormat, 
    label: 'JSON', 
    icon: FileText, 
    description: 'Configuration data',
    extension: 'json'
  }
]

export function ExportPanel({ grid }: ExportPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('react')
  const [copied, setCopied] = useState(false)

  const generateCode = (format: ExportFormat): string => {
    switch (format) {
      case 'html':
        return generateHTML()
      case 'css':
        return generateCSS()
      case 'react':
        return generateReact()
      case 'tailwind':
        return generateTailwind()
      case 'json':
        return generateJSON()
      default:
        return ''
    }
  }

  const generateHTML = (): string => {
    const cards = grid.cards
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(card => `
    <div class="bento-card bento-card--${card.size}" style="${card.color ? `background-color: ${card.color};` : ''}${card.gradient ? `background: ${card.gradient};` : ''}">
      <h3>${card.title}</h3>
      ${card.description ? `<p>${card.description}</p>` : ''}
      ${card.content ? `<div class="content">${card.content}</div>` : ''}
    </div>`).join('')

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bento Grid</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="bento-grid" style="grid-template-columns: repeat(${grid.columns}, 1fr); gap: ${grid.gap}px;">
        ${cards}
    </div>
</body>
</html>`
  }

  const generateCSS = (): string => {
    return `.bento-grid {
    display: grid;
    grid-template-columns: repeat(${grid.columns}, 1fr);
    gap: ${grid.gap}px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.bento-card {
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    background: white;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.bento-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bento-card--sm {
    grid-column: span 1;
    grid-row: span 1;
    min-height: 120px;
}

.bento-card--md {
    grid-column: span 1;
    grid-row: span 1;
    min-height: 160px;
}

.bento-card--lg {
    grid-column: span 1;
    grid-row: span 2;
    min-height: 200px;
}

.bento-card--xl {
    grid-column: span 2;
    grid-row: span 1;
    min-height: 160px;
}

.bento-card--2xl {
    grid-column: span 2;
    grid-row: span 2;
    min-height: 240px;
}

.bento-card--full {
    grid-column: 1 / -1;
    grid-row: span 2;
    min-height: 280px;
}

.bento-card h3 {
    margin: 0 0 12px 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
}

.bento-card p {
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
}

.bento-card .content {
    margin-top: auto;
    font-size: 0.75rem;
    opacity: 0.7;
}`
  }

  const generateReact = (): string => {
    const cardComponents = grid.cards
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(card => `
      <div 
        className="bento-card bento-card--${card.size}"
        style={{
          ${card.color ? `backgroundColor: '${card.color}',` : ''}
          ${card.gradient ? `background: '${card.gradient}',` : ''}
        }}
      >
        <h3>{${JSON.stringify(card.title)}}</h3>
        ${card.description ? `<p>{${JSON.stringify(card.description)}}</p>` : ''}
        ${card.content ? `<div className="content">{${JSON.stringify(card.content)}}</div>` : ''}
      </div>`).join('')

    return `import React from 'react';
import './BentoGrid.css';

const BentoGrid = () => {
  return (
    <div 
      className="bento-grid" 
      style={{
        gridTemplateColumns: 'repeat(${grid.columns}, 1fr)',
        gap: '${grid.gap}px'
      }}
    >
      ${cardComponents}
    </div>
  );
};

export default BentoGrid;`
  }

  const generateTailwind = (): string => {
    const sizeClasses = {
      sm: 'col-span-1 row-span-1 min-h-[120px]',
      md: 'col-span-1 row-span-1 min-h-[160px]',
      lg: 'col-span-1 row-span-2 min-h-[200px]',
      xl: 'col-span-2 row-span-1 min-h-[160px]',
      '2xl': 'col-span-2 row-span-2 min-h-[240px]',
      full: 'col-span-full row-span-2 min-h-[280px]'
    }

    const cards = grid.cards
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(card => `
    <div class="relative overflow-hidden rounded-xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${sizeClasses[card.size]}" ${card.color ? `style="background-color: ${card.color};"` : ''}>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">${card.title}</h3>
      ${card.description ? `<p class="text-sm text-gray-600">${card.description}</p>` : ''}
      ${card.content ? `<div class="mt-auto text-xs opacity-70">${card.content}</div>` : ''}
    </div>`).join('')

    return `<div class="grid gap-${Math.floor(grid.gap/4)} grid-cols-${grid.columns} max-w-6xl mx-auto p-6">
    ${cards}
</div>`
  }

  const generateJSON = (): string => {
    return JSON.stringify(grid, null, 2)
  }

  const copyToClipboard = async () => {
    const code = generateCode(selectedFormat)
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadFile = () => {
    const code = generateCode(selectedFormat)
    const format = exportFormats.find(f => f.id === selectedFormat)
    const filename = `bento-grid.${format?.extension || 'txt'}`
    
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const currentCode = generateCode(selectedFormat)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-2xl font-bold mb-6">Export Your Bento Grid</h2>
        
        {/* Format Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Export Format
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {exportFormats.map((format) => {
              const Icon = format.icon
              return (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all text-left',
                    selectedFormat === format.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <div className="font-medium text-sm">{format.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {format.description}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Code Display */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {exportFormats.find(f => f.id === selectedFormat)?.label} Code
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadFile}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto max-h-96">
            <pre>{currentCode}</pre>
          </div>
        </div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h4 className="font-medium text-blue-900 mb-2">Usage Instructions</h4>
          <div className="text-sm text-blue-800">
            {selectedFormat === 'html' && (
              <p>Save as an HTML file and include the CSS file. Open in any web browser.</p>
            )}
            {selectedFormat === 'css' && (
              <p>Save as a CSS file and link it to your HTML. Use with the HTML export for complete setup.</p>
            )}
            {selectedFormat === 'react' && (
              <p>Save as a .jsx/.tsx file in your React project. Import and use as a component. Don't forget to include the CSS file.</p>
            )}
            {selectedFormat === 'tailwind' && (
              <p>Copy the HTML structure with Tailwind classes. Make sure Tailwind CSS is installed in your project.</p>
            )}
            {selectedFormat === 'json' && (
              <p>Configuration data that can be used to recreate this bento grid or integrate with your own builder.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
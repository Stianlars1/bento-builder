'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BentoTemplate, BentoGrid as BentoGridType, BentoCard, GridConfig } from '@/types/bento'
import { bentoTemplates } from '@/lib/bento-templates'
import { TemplateGallery } from './TemplateGallery'
import { BentoGrid } from './BentoGrid'
import { ConfigPanel } from './ConfigPanel'
import { ExportPanel } from './ExportPanel'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import { Shuffle, Download, Settings, Eye, Code } from 'lucide-react'

type BuilderStep = 'template' | 'configure' | 'preview' | 'export'

export function BentoBuilder() {
  const [currentStep, setCurrentStep] = useState<BuilderStep>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<BentoTemplate | null>(null)
  const [currentGrid, setCurrentGrid] = useState<BentoGridType | null>(null)
  const [config, setConfig] = useState<GridConfig>({
    columns: 4,
    gap: 16,
    cardCount: 6,
    style: 'apple',
    autoArrange: true
  })

  const handleTemplateSelect = useCallback((template: BentoTemplate) => {
    setSelectedTemplate(template)
    setCurrentGrid({
      id: Date.now().toString(),
      name: `${template.name} - Custom`,
      ...template.grid
    })
    setConfig({
      columns: template.grid.columns,
      gap: template.grid.gap,
      cardCount: template.grid.cards.length,
      style: template.style,
      autoArrange: true
    })
    setCurrentStep('configure')
  }, [])

  const handleConfigChange = useCallback((newConfig: GridConfig) => {
    setConfig(newConfig)
    if (currentGrid) {
      setCurrentGrid({
        ...currentGrid,
        columns: newConfig.columns,
        gap: newConfig.gap,
        style: newConfig.style
      })
    }
  }, [currentGrid])

  const handleShuffle = useCallback(() => {
    if (!currentGrid) return

    const shuffledCards = [...currentGrid.cards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        order: index + 1
      }))

    setCurrentGrid({
      ...currentGrid,
      cards: shuffledCards
    })
  }, [currentGrid])

  const generateRandomGrid = useCallback(() => {
    const randomTemplate = bentoTemplates[Math.floor(Math.random() * bentoTemplates.length)]
    setCurrentStep('template')
    setTimeout(() => {
      handleTemplateSelect(randomTemplate)
    }, 100)
  }, [handleTemplateSelect])

  const steps = [
    { id: 'template', name: 'Choose Template', icon: Eye },
    { id: 'configure', name: 'Configure', icon: Settings },
    { id: 'preview', name: 'Preview', icon: Eye },
    { id: 'export', name: 'Export', icon: Code }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bento Builder
              </h1>
              <span className="text-sm text-gray-500">Design beautiful bento grids</span>
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              
              <button
                onClick={handleShuffle}
                disabled={!currentGrid}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                <Shuffle className="w-4 h-4" />
                <span>Shuffle</span>
              </button>

              <button
                onClick={generateRandomGrid}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Shuffle className="w-4 h-4" />
                <span>Random</span>
              </button>
            </div>
          </div>

          {/* Step Navigation */}
          <nav className="flex space-x-8 border-t border-gray-100 pt-4 pb-4">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index
              const Icon = step.icon

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id as BuilderStep)}
                  disabled={step.id === 'configure' && !selectedTemplate}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    isActive 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : isCompleted
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{step.name}</span>
                  {isCompleted && (
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'template' && (
            <motion.div
              key="template"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TemplateGallery
                onSelectTemplate={handleTemplateSelect}
                selectedTemplate={selectedTemplate?.id}
              />
            </motion.div>
          )}

          {currentStep === 'configure' && currentGrid && (
            <motion.div
              key="configure"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              <div className="lg:col-span-1">
                <ConfigPanel
                  config={config}
                  onChange={handleConfigChange}
                  grid={currentGrid}
                  onGridUpdate={setCurrentGrid}
                />
              </div>
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h3>
                    <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      Drag cards to reorder
                    </div>
                  </div>
                  <div className="min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <BentoGrid
                      grid={currentGrid}
                      isEditable={true}
                      onCardsReorder={(cards) => setCurrentGrid({ ...currentGrid, cards })}
                      onCardEdit={(card) => {
                        // Handle card edit
                        console.log('Edit card:', card)
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'preview' && currentGrid && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Preview Your Bento Grid</h3>
                  <button
                    onClick={() => setCurrentStep('export')}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Code</span>
                  </button>
                </div>
                <BentoGrid grid={currentGrid} />
              </div>
            </motion.div>
          )}

          {currentStep === 'export' && currentGrid && (
            <motion.div
              key="export"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ExportPanel grid={currentGrid} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
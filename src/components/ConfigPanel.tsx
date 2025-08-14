'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BentoGrid as BentoGridType, BentoCard, GridConfig, BentoStyle, BentoSize } from '@/types/bento'
import { cn } from '@/lib/utils'
import { Plus, Minus, Palette, Grid, Sliders, X } from 'lucide-react'

interface ConfigPanelProps {
  config: GridConfig
  onChange: (config: GridConfig) => void
  grid: BentoGridType
  onGridUpdate: (grid: BentoGridType) => void
}

const styleOptions: { value: BentoStyle; label: string; description: string; color: string }[] = [
  { value: 'apple', label: 'Apple', description: 'Clean, minimal design', color: '#007AFF' },
  { value: 'linear', label: 'Linear', description: 'Modern developer style', color: '#5E6AD2' },
  { value: 'supabase', label: 'Supabase', description: 'Database-inspired', color: '#3ECF8E' },
  { value: 'vercel', label: 'Vercel', description: 'Sleek and fast', color: '#000000' },
  { value: 'github', label: 'GitHub', description: 'Developer-friendly', color: '#24292E' },
  { value: 'stripe', label: 'Stripe', description: 'Payment-focused', color: '#635BFF' },
  { value: 'notion', label: 'Notion', description: 'Note-taking style', color: '#000000' },
  { value: 'figma', label: 'Figma', description: 'Design-oriented', color: '#F24E1E' },
  { value: 'minimal', label: 'Minimal', description: 'Ultra-clean', color: '#808080' },
  { value: 'gradient', label: 'Gradient', description: 'Colorful gradients', color: '#FF6B6B' }
]

const sizeOptions: { value: BentoSize; label: string }[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
  { value: '2xl', label: '2X Large' },
  { value: 'full', label: 'Full Width' }
]

export function ConfigPanel({ config, onChange, grid, onGridUpdate }: ConfigPanelProps) {
  const [activeTab, setActiveTab] = useState<'grid' | 'cards' | 'style'>('grid')

  const handleConfigChange = (key: keyof GridConfig, value: any) => {
    const newConfig = { ...config, [key]: value }
    onChange(newConfig)
    
    // If style is being changed, update all cards to use the new style
    if (key === 'style') {
      const updatedCards = grid.cards.map(card => ({
        ...card,
        style: value as BentoStyle
      }))
      onGridUpdate({
        ...grid,
        style: value as BentoStyle,
        cards: updatedCards
      })
    }
  }

  const addCard = () => {
    const newCard: BentoCard = {
      id: Date.now().toString(),
      title: `New Feature`,
      description: 'Add your description here',
      icon: '⭐',
      size: 'md',
      style: config.style,
      colspan: 1,
      rowspan: 1,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      order: grid.cards.length + 1
    }

    onGridUpdate({
      ...grid,
      cards: [...grid.cards, newCard]
    })

    handleConfigChange('cardCount', grid.cards.length + 1)
  }

  const removeCard = (cardId: string) => {
    const updatedCards = grid.cards.filter(card => card.id !== cardId)
    onGridUpdate({
      ...grid,
      cards: updatedCards
    })
    handleConfigChange('cardCount', updatedCards.length)
  }

  const updateCard = (cardId: string, updates: Partial<BentoCard>) => {
    const updatedCards = grid.cards.map(card =>
      card.id === cardId ? { ...card, ...updates } : card
    )
    onGridUpdate({
      ...grid,
      cards: updatedCards
    })
  }

  const tabs = [
    { id: 'grid', label: 'Grid', icon: Grid },
    { id: 'cards', label: 'Cards', icon: Plus },
    { id: 'style', label: 'Style', icon: Palette }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
      {/* Tab Navigation */}
      <div className="border-b border-gray-100 dark:border-gray-700">
        <nav className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex-1 flex items-center justify-center space-x-2 py-4 px-4 text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-6">
        {/* Grid Configuration */}
        {activeTab === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Grid Columns
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleConfigChange('columns', Math.max(2, config.columns - 1))}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1">
                  <div className="text-center font-bold text-lg text-gray-900 dark:text-white">
                    {config.columns}
                  </div>
                  <div className="text-xs text-gray-500 text-center">columns</div>
                </div>
                <button
                  onClick={() => handleConfigChange('columns', Math.min(8, config.columns + 1))}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Gap: {config.gap}px
              </label>
              <input
                type="range"
                min="8"
                max="48"
                value={config.gap}
                onChange={(e) => handleConfigChange('gap', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>8px</span>
                <span>48px</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={config.autoArrange}
                  onChange={(e) => handleConfigChange('autoArrange', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-arrange cards</span>
                  <div className="text-xs text-gray-500">Automatically position cards for optimal layout</div>
                </div>
              </label>
            </div>
          </motion.div>
        )}

        {/* Cards Management */}
        {activeTab === 'cards' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cards ({grid.cards.length})
                </h4>
                <p className="text-xs text-gray-500">Manage your bento grid cards</p>
              </div>
              <button
                onClick={addCard}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card</span>
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {grid.cards.map((card, index) => (
                <div
                  key={card.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateCard(card.id, { title: e.target.value })}
                        className="w-full font-medium text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Card title"
                      />
                      <input
                        type="text"
                        value={card.icon || ''}
                        onChange={(e) => updateCard(card.id, { icon: e.target.value })}
                        className="w-full text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Icon (emoji)"
                      />
                    </div>
                    <button
                      onClick={() => removeCard(card.id)}
                      className="ml-3 flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    value={card.description || ''}
                    onChange={(e) => updateCard(card.id, { description: e.target.value })}
                    placeholder="Card description"
                    rows={2}
                    className="w-full text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-3"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Size</label>
                      <select
                        value={card.size}
                        onChange={(e) => updateCard(card.id, { size: e.target.value as BentoSize })}
                        className="w-full text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        {sizeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Color</label>
                      <input
                        type="color"
                        value={card.color || '#667eea'}
                        onChange={(e) => updateCard(card.id, { color: e.target.value, gradient: undefined })}
                        className="w-full h-9 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Style Configuration */}
        {activeTab === 'style' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Choose Style Template
              </label>
              <div className="grid grid-cols-2 gap-3">
                {styleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleConfigChange('style', option.value)}
                    className={cn(
                      'p-4 text-left border-2 rounded-xl transition-all duration-200 group',
                      config.style === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                      <div className="font-medium text-sm text-gray-900 dark:text-white">{option.label}</div>
                      {config.style === option.value && (
                        <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
              <button 
                disabled
                className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
              >
                <Sliders className="w-4 h-4" />
                <span className="text-sm">Advanced Styling (Coming Soon)</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
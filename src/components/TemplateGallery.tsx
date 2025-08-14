'use client'

import { motion } from 'framer-motion'
import { BentoTemplate } from '@/types/bento'
import { bentoTemplates } from '@/lib/bento-templates'
import { BentoGrid } from './BentoGrid'
import { cn } from '@/lib/utils'

interface TemplateGalleryProps {
  onSelectTemplate: (template: BentoTemplate) => void
  selectedTemplate?: string
  className?: string
}

export function TemplateGallery({ 
  onSelectTemplate, 
  selectedTemplate, 
  className 
}: TemplateGalleryProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className={cn('space-y-8', className)}>
      <div className="text-center space-y-4">
        <motion.h2 
          className="text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Bento Style
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Select a template to start with or get inspired by different design styles. 
          Each template can be fully customized to match your needs.
        </motion.p>
      </div>

      <motion.div
        className="grid gap-8 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {bentoTemplates.map((template) => (
          <motion.div
            key={template.id}
            variants={itemVariants}
            className={cn(
              'relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300',
              'hover:shadow-xl hover:border-blue-300',
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            )}
            onClick={() => onSelectTemplate(template)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            layout
          >
            {/* Template Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  {template.featured && (
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex space-x-1">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Template Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border overflow-hidden">
              <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200px' }}>
                <BentoGrid
                  grid={{
                    id: template.id,
                    name: template.name,
                    ...template.grid
                  }}
                  className="max-w-4xl"
                />
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-600/0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

interface TemplatePreviewProps {
  template: BentoTemplate
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

export function TemplatePreview({
  template,
  isSelected = false,
  onClick,
  className
}: TemplatePreviewProps) {
  return (
    <motion.div
      className={cn(
        'relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300',
        isSelected
          ? 'border-blue-500 shadow-lg'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md',
        className
      )}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 overflow-hidden">
        <div className="transform scale-40 origin-top-left" style={{ width: '250%', height: '250%' }}>
          <BentoGrid
            grid={{
              id: template.id,
              name: template.name,
              ...template.grid
            }}
          />
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900">{template.name}</h4>
          {template.featured && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isSelected && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}
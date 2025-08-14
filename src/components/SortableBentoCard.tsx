'use client'

import { motion } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BentoCard as BentoCardType } from '@/types/bento'
import { cn } from '@/lib/utils'
import { GripVertical, Edit3 } from 'lucide-react'

interface SortableBentoCardProps {
  card: BentoCardType
  isEditable?: boolean
  onClick?: () => void
  onEdit?: (card: BentoCardType) => void
}

export function SortableBentoCard({ card, isEditable = false, onClick, onEdit }: SortableBentoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: card.colspan ? `span ${card.colspan}` : '1',
    gridRow: card.rowspan ? `span ${card.rowspan}` : '1',
    gridColumnStart: card.column,
    gridRowStart: card.row,
  }

  // Apple-style design based on card style
  const getCardDesign = () => {
    const baseClasses = 'relative overflow-hidden cursor-pointer group transition-all duration-300'
    
    switch (card.style) {
      case 'apple':
        return cn(baseClasses, 'bg-white rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.16)] hover:scale-[1.02]')
      case 'linear':
        return cn(baseClasses, 'bg-gray-900 rounded-[20px] border border-gray-800 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]')
      case 'supabase':
        return cn(baseClasses, 'bg-white rounded-[16px] border border-gray-200 shadow-[0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]')
      default:
        return cn(baseClasses, 'bg-white rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.16)]')
    }
  }

  const getBackgroundStyle = () => {
    if (card.gradient) {
      return { background: card.gradient }
    }
    if (card.color) {
      return { backgroundColor: card.color }
    }
    if (card.image) {
      return {
        backgroundImage: `url(${card.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }

    // Default Apple-style backgrounds
    const defaultBackgrounds = {
      apple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      linear: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      supabase: 'linear-gradient(135deg, #3ecf8e 0%, #20bf6b 100%)',
      vercel: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
      github: 'linear-gradient(135deg, #24292e 0%, #586069 100%)',
      stripe: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      notion: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      figma: 'linear-gradient(135deg, #ff7262 0%, #a855f7 100%)',
      minimal: '#ffffff',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }

    return { background: defaultBackgrounds[card.style] || defaultBackgrounds.apple }
  }

  const getTextColor = () => {
    if (card.style === 'minimal' || card.style === 'notion') return 'text-gray-900'
    if (card.style === 'apple' && !card.gradient && !card.color) return 'text-white'
    return 'text-white'
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        getCardDesign(),
        isDragging && 'z-50 rotate-3 scale-105',
        'min-h-[160px]'
      )}
      variants={itemVariants}
      onClick={onClick}
    >
      {/* Background with gradient/color */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={getBackgroundStyle()}
      />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.15] via-transparent to-black/[0.15] transition-all duration-300 group-hover:from-white/[0.08]" />

      {/* Content */}
      <div className={cn('relative z-10 h-full flex flex-col justify-between p-8', getTextColor())}>
        {/* Header */}
        <div className="space-y-3">
          {card.icon && (
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] bg-white/20 backdrop-blur-sm">
              <span className="text-2xl">{card.icon}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold leading-tight tracking-tight">
              {card.title}
            </h3>
            {card.description && (
              <p className="text-sm font-medium opacity-90 leading-relaxed max-w-sm">
                {card.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer content */}
        {card.content && (
          <div className="mt-auto pt-6">
            <div className="text-xs font-semibold opacity-75 uppercase tracking-wider">
              {card.content}
            </div>
          </div>
        )}

        {/* Large typography for key metrics (Apple style) */}
        {card.metric && (
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              {card.metric}
            </div>
            <div className="text-sm font-medium opacity-80">
              {card.metricLabel}
            </div>
          </div>
        )}
      </div>

      {/* Drag handle for editable mode */}
      {isEditable && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(card)
            }}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          
          <div
            {...listeners}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </motion.div>
  )
}
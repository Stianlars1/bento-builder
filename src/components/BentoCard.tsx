'use client'

import { motion } from 'framer-motion'
import { BentoCard as BentoCardType } from '@/types/bento'
import { cn } from '@/lib/utils'

interface BentoCardProps {
  card: BentoCardType
  isEditable?: boolean
  onClick?: () => void
  onEdit?: (card: BentoCardType) => void
}

const sizeClasses = {
  sm: 'col-span-1 row-span-1 min-h-[120px]',
  md: 'col-span-1 row-span-1 min-h-[160px]',
  lg: 'col-span-1 row-span-2 min-h-[200px]',
  xl: 'col-span-2 row-span-1 min-h-[160px]',
  '2xl': 'col-span-2 row-span-2 min-h-[240px]',
  full: 'col-span-full row-span-2 min-h-[280px]'
}

const styleVariants = {
  apple: 'rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-0 hover:shadow-[0_16px_48px_rgba(0,0,0,0.16)] hover:scale-[1.02] transition-all duration-500 backdrop-blur-xl',
  linear: 'rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-white/20 backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:scale-[1.01] transition-all duration-300',
  supabase: 'rounded-[12px] shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:border-emerald-300 transition-all duration-300',
  vercel: 'rounded-[14px] shadow-[0_1px_12px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200',
  github: 'rounded-[10px] shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-250',
  stripe: 'rounded-[18px] shadow-[0_6px_28px_rgba(99,102,241,0.1)] border-0 hover:shadow-[0_12px_40px_rgba(99,102,241,0.15)] hover:scale-[1.01] transition-all duration-400',
  notion: 'rounded-[12px] shadow-[0_2px_14px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-all duration-300',
  figma: 'rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-purple-100 hover:shadow-[0_8px_32px_rgba(136,19,255,0.1)] transition-all duration-350',
  minimal: 'rounded-[8px] shadow-none border-none hover:bg-gray-50/80 transition-all duration-200',
  gradient: 'rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] border-0 hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-400'
}

export function BentoCard({ card, isEditable = false, onClick, onEdit }: BentoCardProps) {
  const baseClasses = cn(
    'relative overflow-hidden cursor-pointer group',
    'flex flex-col justify-between p-8',
    sizeClasses[card.size],
    styleVariants[card.style]
  )

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
    
    // Default beautiful backgrounds based on style
    const defaultBgs = {
      apple: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      linear: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      supabase: { background: 'linear-gradient(135deg, #3ecf8e 0%, #20bf6b 100%)' },
      vercel: { background: 'linear-gradient(135deg, #000000 0%, #434343 100%)' },
      github: { background: 'linear-gradient(135deg, #24292e 0%, #586069 100%)' },
      stripe: { background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
      notion: { background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' },
      figma: { background: 'linear-gradient(135deg, #ff7262 0%, #a855f7 100%)' },
      minimal: { background: '#ffffff' },
      gradient: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    }
    
    return defaultBgs[card.style] || defaultBgs.apple
  }

  const getTextColor = () => {
    // Always use white text for gradient backgrounds except minimal and notion
    if (card.style === 'minimal' || card.style === 'notion') {
      return 'text-gray-900'
    }
    if (card.gradient || card.image || !card.color) return 'text-white'
    if (card.color) {
      const hex = card.color.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      return brightness > 128 ? 'text-gray-900' : 'text-white'
    }
    return 'text-white'
  }

  return (
    <motion.div
      className={baseClasses}
      style={{
        gridColumn: card.colspan ? `span ${card.colspan}` : undefined,
        gridRow: card.rowspan ? `span ${card.rowspan}` : undefined,
        order: card.order,
        ...getBackgroundStyle()
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      layout
      layoutId={card.id}
    >
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 group-hover:from-white/5 transition-all duration-300" />

      {/* Content */}
      <div className={cn('relative z-10', getTextColor())}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {card.icon && (
              <div className="mb-3">
                <span className="text-2xl">{card.icon}</span>
              </div>
            )}
            <h3 className="text-xl font-bold leading-tight tracking-tight mb-2">
              {card.title}
            </h3>
            {card.description && (
              <p className="text-sm font-medium opacity-90 leading-relaxed">
                {card.description}
              </p>
            )}
          </div>
        </div>

        {card.content && (
          <div className="mt-auto">
            <div className="text-xs font-semibold opacity-75 uppercase tracking-wider">
              {card.content}
            </div>
          </div>
        )}
      </div>

      {/* Edit button for editable mode */}
      {isEditable && (
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30"
          onClick={(e) => {
            e.stopPropagation()
            onEdit?.(card)
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="m18.5 2.5 a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
          </svg>
        </button>
      )}

      {/* Hover effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </motion.div>
  )
}
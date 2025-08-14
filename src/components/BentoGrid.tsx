'use client'

import { motion } from 'framer-motion'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable'
import { BentoGrid as BentoGridType, BentoCard as BentoCardType } from '@/types/bento'
import { SortableBentoCard } from './SortableBentoCard'
import { cn } from '@/lib/utils'

interface BentoGridProps {
  grid: BentoGridType
  isEditable?: boolean
  onCardClick?: (card: BentoCardType) => void
  onCardEdit?: (card: BentoCardType) => void
  onCardsReorder?: (cards: BentoCardType[]) => void
  className?: string
}

export function BentoGrid({ 
  grid, 
  isEditable = false, 
  onCardClick, 
  onCardEdit,
  onCardsReorder,
  className 
}: BentoGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = grid.cards.findIndex(card => card.id === active.id)
      const newIndex = grid.cards.findIndex(card => card.id === over?.id)
      
      const newCards = arrayMove(grid.cards, oldIndex, newIndex)
      onCardsReorder?.(newCards)
    }
  }

  // Create proper CSS Grid template based on card positions
  const generateGridTemplate = () => {
    const maxRow = Math.max(...grid.cards.map(card => (card.rowspan || 1) + (card.row || 1) - 1), 4)
    const rows = `repeat(${maxRow}, minmax(120px, 1fr))`
    const cols = `repeat(${grid.columns}, 1fr)`
    
    return {
      gridTemplateRows: rows,
      gridTemplateColumns: cols,
      gap: `${grid.gap}px`
    }
  }

  const containerClasses = cn(
    'grid w-full h-full',
    'transition-all duration-300 ease-in-out',
    className
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  if (isEditable) {
    return (
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          className={containerClasses}
          style={generateGridTemplate()}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SortableContext items={grid.cards.map(card => card.id)} strategy={rectSortingStrategy}>
            {grid.cards.map((card) => (
              <SortableBentoCard
                key={card.id}
                card={card}
                isEditable={isEditable}
                onClick={() => onCardClick?.(card)}
                onEdit={onCardEdit}
              />
            ))}
          </SortableContext>
        </motion.div>
      </DndContext>
    )
  }

  return (
    <motion.div
      className={containerClasses}
      style={generateGridTemplate()}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {grid.cards.map((card) => (
        <SortableBentoCard
          key={card.id}
          card={card}
          isEditable={false}
          onClick={() => onCardClick?.(card)}
          onEdit={onCardEdit}
        />
      ))}
    </motion.div>
  )
}
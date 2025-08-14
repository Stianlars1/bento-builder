export type BentoSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export type BentoStyle = 
  | 'apple'
  | 'linear'
  | 'supabase'
  | 'vercel'
  | 'github'
  | 'stripe'
  | 'notion'
  | 'figma'
  | 'minimal'
  | 'gradient'

export interface BentoCard {
  id: string
  title: string
  description?: string
  content?: string
  icon?: string
  size: BentoSize
  color?: string
  gradient?: string
  image?: string
  style: BentoStyle
  colspan?: number
  rowspan?: number
  column?: number
  row?: number
  order?: number
  metric?: string
  metricLabel?: string
}

export interface BentoGrid {
  id: string
  name: string
  style: BentoStyle
  cards: BentoCard[]
  columns: number
  gap: number
  maxWidth?: string
  className?: string
}

export interface BentoTemplate {
  id: string
  name: string
  description: string
  style: BentoStyle
  preview: string
  grid: Omit<BentoGrid, 'id' | 'name'>
  tags: string[]
  featured?: boolean
}

export interface GridConfig {
  columns: number
  gap: number
  cardCount: number
  style: BentoStyle
  autoArrange: boolean
}

export interface ExportOptions {
  format: 'html' | 'css' | 'react' | 'vue' | 'tailwind'
  includeJS: boolean
  minify: boolean
  framework?: 'vanilla' | 'react' | 'vue' | 'next' | 'nuxt'
}

export interface BentoTheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
  }
  gradients: string[]
  borderRadius: string
  shadows: {
    sm: string
    md: string
    lg: string
  }
}
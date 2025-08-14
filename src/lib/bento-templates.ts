import { BentoTemplate, BentoCard } from '@/types/bento'

const createAppleStudioTemplate = (): BentoTemplate => ({
  id: 'apple-studio',
  name: 'Apple Mac Studio',
  description: 'Inspired by Apple\'s Mac Studio presentation with clean typography and perfect spacing',
  style: 'apple',
  preview: '/templates/apple-preview.jpg',
  tags: ['minimal', 'clean', 'professional'],
  featured: true,
  grid: {
    style: 'apple',
    columns: 6,
    gap: 16,
    cards: [
      // Top row - connectivity features
      {
        id: '1',
        title: 'Wi-Fi 6',
        description: 'Next-generation wireless',
        icon: '📶',
        size: 'sm',
        style: 'apple',
        colspan: 1,
        rowspan: 1,
        column: 1,
        row: 1,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        order: 1
      },
      {
        id: '2',
        title: 'Bluetooth 5.0',
        description: 'Enhanced connectivity',
        icon: '🔵',
        size: 'sm',
        style: 'apple',
        colspan: 1,
        rowspan: 1,
        column: 2,
        row: 1,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        order: 2
      },
      {
        id: '3',
        title: 'Up to',
        metric: '8TB',
        metricLabel: 'SSD storage',
        size: 'sm',
        style: 'apple',
        colspan: 2,
        rowspan: 1,
        column: 3,
        row: 1,
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        order: 3
      },
      {
        id: '4',
        title: 'Up to',
        metric: '7.4GB/s',
        metricLabel: 'storage performance',
        size: 'sm',
        style: 'apple',
        colspan: 2,
        rowspan: 1,
        column: 5,
        row: 1,
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        order: 4
      },
      
      // Main content area - CPU
      {
        id: '5',
        title: 'Up to',
        metric: '20-core',
        metricLabel: 'CPU',
        size: 'lg',
        style: 'apple',
        colspan: 2,
        rowspan: 2,
        column: 1,
        row: 2,
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        order: 5
      },
      
      // Center - Mac Studio image area
      {
        id: '6',
        title: 'Mac Studio',
        description: 'Designed for professionals who need maximum performance',
        size: 'xl',
        style: 'apple',
        colspan: 2,
        rowspan: 3,
        column: 3,
        row: 2,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        order: 6
      },
      
      // Memory
      {
        id: '7',
        title: 'Up to',
        metric: '128GB',
        metricLabel: 'unified memory',
        size: 'lg',
        style: 'apple',
        colspan: 2,
        rowspan: 2,
        column: 5,
        row: 2,
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        order: 7
      },
      
      // GPU
      {
        id: '8',
        title: 'Up to',
        metric: '64-core',
        metricLabel: 'GPU',
        size: 'lg',
        style: 'apple',
        colspan: 2,
        rowspan: 2,
        column: 1,
        row: 4,
        gradient: 'linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)',
        order: 8
      },
      
      // Memory bandwidth
      {
        id: '9',
        title: 'Up to',
        metric: '800GB/s',
        metricLabel: 'memory bandwidth',
        size: 'lg',
        style: 'apple',
        colspan: 2,
        rowspan: 2,
        column: 5,
        row: 4,
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        order: 9
      }
    ]
  }
})

const createLinearDashboardTemplate = (): BentoTemplate => ({
  id: 'linear-dashboard',
  name: 'Linear Dashboard',
  description: 'Modern developer-focused dashboard with dark theme',
  style: 'linear',
  preview: '/templates/linear-preview.jpg',
  tags: ['developer', 'modern', 'dark'],
  featured: true,
  grid: {
    style: 'linear',
    columns: 4,
    gap: 12,
    cards: [
      {
        id: '1',
        title: 'Issues Completed',
        metric: '1,247',
        metricLabel: 'this month',
        icon: '✅',
        size: 'xl',
        style: 'linear',
        colspan: 2,
        rowspan: 1,
        column: 1,
        row: 1,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        order: 1
      },
      {
        id: '2',
        title: 'Team Velocity',
        metric: '+23%',
        metricLabel: 'increase',
        icon: '🚀',
        size: 'lg',
        style: 'linear',
        colspan: 1,
        rowspan: 2,
        column: 3,
        row: 1,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        order: 2
      },
      {
        id: '3',
        title: 'Active Sprints',
        metric: '12',
        metricLabel: 'in progress',
        icon: '⚡',
        size: 'lg',
        style: 'linear',
        colspan: 1,
        rowspan: 2,
        column: 4,
        row: 1,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        order: 3
      },
      {
        id: '4',
        title: 'Code Reviews',
        description: 'Automated quality checks and team collaboration',
        icon: '👀',
        size: 'md',
        style: 'linear',
        colspan: 1,
        rowspan: 1,
        column: 1,
        row: 2,
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        order: 4
      },
      {
        id: '5',
        title: 'Deployments',
        description: 'Successful releases this week',
        metric: '45',
        icon: '🚢',
        size: 'md',
        style: 'linear',
        colspan: 1,
        rowspan: 1,
        column: 2,
        row: 2,
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        order: 5
      }
    ]
  }
})

const createSupabaseAnalyticsTemplate = (): BentoTemplate => ({
  id: 'supabase-analytics',
  name: 'Supabase Analytics',
  description: 'Database analytics dashboard with real-time metrics',
  style: 'supabase',
  preview: '/templates/supabase-preview.jpg',
  tags: ['database', 'analytics', 'realtime'],
  grid: {
    style: 'supabase',
    columns: 4,
    gap: 16,
    cards: [
      {
        id: '1',
        title: 'Database Queries',
        metric: '2.3M',
        metricLabel: 'today',
        icon: '🗄️',
        size: 'xl',
        style: 'supabase',
        colspan: 2,
        rowspan: 1,
        column: 1,
        row: 1,
        gradient: 'linear-gradient(135deg, #3ecf8e 0%, #20bf6b 100%)',
        order: 1
      },
      {
        id: '2',
        title: 'Storage',
        metric: '847GB',
        metricLabel: 'used',
        icon: '💾',
        size: 'lg',
        style: 'supabase',
        colspan: 1,
        rowspan: 1,
        column: 3,
        row: 1,
        gradient: 'linear-gradient(135deg, #1f1f1f 0%, #4a5568 100%)',
        order: 2
      },
      {
        id: '3',
        title: 'Active Users',
        metric: '12.8K',
        metricLabel: 'online',
        icon: '👥',
        size: 'lg',
        style: 'supabase',
        colspan: 1,
        rowspan: 1,
        column: 4,
        row: 1,
        gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        order: 3
      },
      {
        id: '4',
        title: 'API Performance',
        description: 'Real-time monitoring and analytics across all endpoints',
        icon: '⚡',
        size: '2xl',
        style: 'supabase',
        colspan: 2,
        rowspan: 2,
        column: 1,
        row: 2,
        gradient: 'linear-gradient(135deg, #3ecf8e 0%, #667eea 100%)',
        order: 4
      },
      {
        id: '5',
        title: 'Edge Functions',
        metric: '156',
        metricLabel: 'deployed',
        icon: '⚙️',
        size: 'md',
        style: 'supabase',
        colspan: 1,
        rowspan: 1,
        column: 3,
        row: 2,
        gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        order: 5
      },
      {
        id: '6',
        title: 'Uptime',
        metric: '99.99%',
        metricLabel: 'availability',
        icon: '🔄',
        size: 'md',
        style: 'supabase',
        colspan: 1,
        rowspan: 1,
        column: 4,
        row: 2,
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        order: 6
      }
    ]
  }
})

const createMinimalPortfolioTemplate = (): BentoTemplate => ({
  id: 'minimal-portfolio',
  name: 'Minimal Portfolio',
  description: 'Clean, typography-focused design for creative professionals',
  style: 'minimal',
  preview: '/templates/minimal-preview.jpg',
  tags: ['minimal', 'portfolio', 'creative'],
  grid: {
    style: 'minimal',
    columns: 3,
    gap: 24,
    cards: [
      {
        id: '1',
        title: 'Creative Focus',
        description: 'Design with purpose and intention',
        icon: '🎯',
        size: 'xl',
        style: 'minimal',
        colspan: 2,
        rowspan: 1,
        column: 1,
        row: 1,
        color: '#ffffff',
        order: 1
      },
      {
        id: '2',
        title: 'Projects',
        metric: '47',
        metricLabel: 'completed',
        icon: '💎',
        size: 'lg',
        style: 'minimal',
        colspan: 1,
        rowspan: 2,
        column: 3,
        row: 1,
        color: '#f8f9fa',
        order: 2
      },
      {
        id: '3',
        title: 'Experience',
        metric: '8+',
        metricLabel: 'years',
        icon: '✨',
        size: 'lg',
        style: 'minimal',
        colspan: 1,
        rowspan: 1,
        column: 1,
        row: 2,
        color: '#f1f3f4',
        order: 3
      },
      {
        id: '4',
        title: 'Philosophy',
        description: 'Every element serves a purpose in creating meaningful experiences',
        icon: '📐',
        size: 'lg',
        style: 'minimal',
        colspan: 2,
        rowspan: 1,
        column: 1,
        row: 3,
        color: '#ffffff',
        order: 4
      }
    ]
  }
})

export const bentoTemplates: BentoTemplate[] = [
  createAppleStudioTemplate(),
  createLinearDashboardTemplate(),
  createSupabaseAnalyticsTemplate(),
  createMinimalPortfolioTemplate()
]

export const getTemplateByStyle = (style: string): BentoTemplate | undefined => {
  return bentoTemplates.find(template => template.style === style)
}

export const getFeaturedTemplates = (): BentoTemplate[] => {
  return bentoTemplates.filter(template => template.featured)
}
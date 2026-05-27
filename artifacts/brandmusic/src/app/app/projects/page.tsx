
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Folder, Search, Grid, List, MoreVertical, Users, Calendar, Tag } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const mockProjects = [
  {
    id: 1,
    name: 'Q1 Skincare Campaign',
    description: 'Luxury skincare product launch across digital channels',
    tracks: 12,
    collaborators: 4,
    status: 'active',
    lastUpdated: '2 hours ago',
    tags: ['Skincare', 'Luxury', 'Digital'],
  },
  {
    id: 2,
    name: 'Tech Product Reveal',
    description: 'Product announcement video and social media assets',
    tracks: 8,
    collaborators: 3,
    status: 'review',
    lastUpdated: '1 day ago',
    tags: ['Tech', 'Launch', 'Video'],
  },
  {
    id: 3,
    name: 'Holiday Brand Film',
    description: 'Seasonal brand storytelling content',
    tracks: 15,
    collaborators: 6,
    status: 'draft',
    lastUpdated: '3 days ago',
    tags: ['Brand', 'Seasonal', 'Film'],
  },
  {
    id: 4,
    name: 'Social Media Q2',
    description: 'Ongoing social content music library',
    tracks: 24,
    collaborators: 2,
    status: 'active',
    lastUpdated: '5 hours ago',
    tags: ['Social', 'Ongoing'],
  },
]

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'review': return 'warning'
      case 'draft': return 'text-tertiary'
      default: return 'text-tertiary'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'review': return 'In Review'
      case 'draft': return 'Draft'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/5 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-2xl mb-1">Projects</h1>
              <p className="text-text-secondary">Organize tracks into campaigns and collaborate with your team</p>
            </div>
            <Button>
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-12 pr-4 py-3 bg-surface-elevated border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:border-electric-blue/50 transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-surface-elevated border border-white/10 rounded-lg text-white focus:outline-none focus:border-electric-blue/50 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="review">In Review</option>
                <option value="draft">Draft</option>
              </select>

              <div className="flex items-center bg-surface-elevated rounded-lg border border-white/10 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-electric-blue/20 text-electric-blue'
                      : 'text-text-tertiary hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-electric-blue/20 text-electric-blue'
                      : 'text-text-tertiary hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-text-secondary">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center">
                      <Folder className="w-6 h-6 text-electric-blue" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full bg-${getStatusColor(project.status)}/20 text-${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                      <button className="p-1 hover:bg-surface-hover rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4 text-text-tertiary" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 group-hover:text-electric-blue transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-surface rounded-full text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-text-tertiary">
                          <Tag className="w-4 h-4" />
                          <span>{project.tracks}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-text-tertiary">
                          <Users className="w-4 h-4" />
                          <span>{project.collaborators}</span>
                        </div>
                      </div>
                      <span className="text-text-tertiary text-xs">
                        {project.lastUpdated}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="cursor-pointer group hover:border-electric-blue/30">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Folder className="w-6 h-6 text-electric-blue" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg group-hover:text-electric-blue transition-colors truncate">
                          {project.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full bg-${getStatusColor(project.status)}/20 text-${getStatusColor(project.status)} flex-shrink-0`}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary truncate">
                        {project.description}
                      </p>
                    </div>

                    <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Tag className="w-4 h-4" />
                        <span className="text-sm">{project.tracks} tracks</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-text-tertiary">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{project.collaborators}</span>
                      </div>
                      <span className="text-text-tertiary text-sm w-24 text-right">
                        {project.lastUpdated}
                      </span>
                    </div>

                    <button className="p-2 hover:bg-surface-hover rounded transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                      <MoreVertical className="w-5 h-5 text-text-tertiary" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-surface-elevated rounded-full flex items-center justify-center mx-auto mb-6">
              <Folder className="w-10 h-10 text-text-tertiary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">No projects found</h3>
            <p className="text-text-secondary mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first project to get started'}
            </p>
            {!searchQuery && (
              <Button>
                <Plus className="w-4 h-4" />
                Create Project
              </Button>
            )}
          </div>
        )}

        {/* Quick Stats */}
        {filteredProjects.length > 0 && (
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <Card className="text-center">
              <div className="text-3xl font-display font-bold text-electric-blue mb-2">
                {mockProjects.length}
              </div>
              <div className="text-sm text-text-secondary">Total Projects</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-display font-bold text-electric-purple mb-2">
                {mockProjects.reduce((sum, p) => sum + p.tracks, 0)}
              </div>
              <div className="text-sm text-text-secondary">Tracks Organized</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-display font-bold text-electric-cyan mb-2">
                {mockProjects.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-text-secondary">Active Campaigns</div>
            </Card>
            <Card className="text-center">
              <div className="text-3xl font-display font-bold text-electric-pink mb-2">
                {Math.max(...mockProjects.map(p => p.collaborators))}
              </div>
              <div className="text-sm text-text-secondary">Team Members</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

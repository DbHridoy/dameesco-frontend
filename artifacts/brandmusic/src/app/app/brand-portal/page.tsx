
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Search, 
  Filter, 
  MoreVertical, 
  Play, 
  Download, 
  Share2, 
  Fingerprint,
  BarChart3,
  Users,
  Shield,
  Folder,
  Music
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const mockAssets = [
  {
    id: 1,
    name: 'Brand Sonic Logo v3',
    type: 'Mnemonic',
    duration: '0:03',
    format: 'WAV',
    licensed: true,
    usage: 'Global',
    uploadDate: '2024-01-15',
    tags: ['Brand', 'Logo', 'Signature'],
  },
  {
    id: 2,
    name: 'Q1 Hero Track - Luxury',
    type: 'Licensed Track',
    duration: '3:24',
    format: 'MP3, WAV',
    licensed: true,
    usage: 'Digital, TV, Radio',
    uploadDate: '2024-02-01',
    tags: ['Campaign', 'Q1', 'Luxury'],
  },
  {
    id: 3,
    name: 'Social Media Loop 30s',
    type: 'Custom Edit',
    duration: '0:30',
    format: 'MP3',
    licensed: true,
    usage: 'Social Media',
    uploadDate: '2024-02-10',
    tags: ['Social', 'Instagram', 'TikTok'],
  },
  {
    id: 4,
    name: 'Holiday Campaign Suite',
    type: 'Campaign Kit',
    duration: 'Various',
    format: 'ZIP',
    licensed: true,
    usage: 'Seasonal 2024',
    uploadDate: '2024-01-20',
    tags: ['Holiday', 'Campaign', 'Multi-track'],
  },
]

const categories = [
  { id: 'all', name: 'All Assets', count: 47, icon: Music },
  { id: 'licensed', name: 'Licensed Tracks', count: 23, icon: Download },
  { id: 'custom', name: 'Custom Edits', count: 12, icon: Folder },
  { id: 'mnemonics', name: 'Mnemonics', count: 6, icon: Fingerprint },
  { id: 'campaigns', name: 'Campaign Kits', count: 6, icon: Package },
]

function Package(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

export default function BrandPortalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAssets = mockAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/5 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display font-bold text-2xl">Brand Portal</h1>
                <span className="px-3 py-1 bg-electric-purple/20 text-electric-purple text-xs font-semibold rounded-full">
                  Enterprise
                </span>
              </div>
              <p className="text-text-secondary">Centralized audio asset management for your brand</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Fingerprint className="w-4 h-4" />
                Sonic DNA
              </Button>
              <Button>
                <Upload className="w-4 h-4" />
                Upload Asset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-electric-blue" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">47</div>
                <div className="text-sm text-text-secondary">Total Assets</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-electric-purple/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-electric-purple" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">12</div>
                <div className="text-sm text-text-secondary">Active Campaigns</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-electric-cyan/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-electric-cyan" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">24</div>
                <div className="text-sm text-text-secondary">Team Members</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-white">100%</div>
                <div className="text-sm text-text-secondary">Compliant</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Categories */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-electric-blue/10 text-electric-blue'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-white'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="flex-1 text-left text-sm font-medium">
                      {category.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-surface rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-electric-purple/10 to-electric-pink/10 border-electric-purple/30">
              <div className="flex items-center gap-3 mb-3">
                <Fingerprint className="w-6 h-6 text-electric-purple" />
                <h3 className="font-semibold">Sonic DNA</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Your brand sound profile ensures all assets align with your sonic identity.
              </p>
              <Button variant="outline" size="sm" fullWidth>
                View Profile
              </Button>
            </Card>

            <Card>
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" fullWidth>
                  <Upload className="w-4 h-4" />
                  Upload New Asset
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  <Users className="w-4 h-4" />
                  Manage Team
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search assets..."
                    className="w-full pl-12 pr-4 py-3 bg-surface border border-white/10 rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:border-electric-blue/50 transition-colors"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </Card>

            {/* Assets Grid */}
            <div className="space-y-3">
              {filteredAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="hover:border-electric-blue/30 transition-all">
                    <div className="flex items-center gap-6">
                      {/* Play Button */}
                      <button className="w-14 h-14 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center hover:from-electric-blue/30 hover:to-electric-purple/30 transition-all flex-shrink-0 group">
                        <Play className="w-6 h-6 text-electric-blue group-hover:scale-110 transition-transform" />
                      </button>

                      {/* Asset Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 truncate">
                          {asset.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary">
                          <span>{asset.type}</span>
                          <span>•</span>
                          <span>{asset.duration}</span>
                          <span>•</span>
                          <span>{asset.format}</span>
                          {asset.licensed && (
                            <>
                              <span>•</span>
                              <span className="text-success">✓ Licensed</span>
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {asset.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs bg-surface rounded-full text-text-tertiary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Usage Info */}
                      <div className="hidden md:block text-right flex-shrink-0">
                        <div className="text-sm text-text-secondary mb-1">Usage</div>
                        <div className="text-sm text-white font-medium">
                          {asset.usage}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                          <Download className="w-5 h-5 text-text-tertiary hover:text-electric-blue" />
                        </button>
                        <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                          <Share2 className="w-5 h-5 text-text-tertiary hover:text-electric-blue" />
                        </button>
                        <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-text-tertiary hover:text-white" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredAssets.length === 0 && (
              <Card className="text-center py-20">
                <div className="w-20 h-20 bg-surface-elevated rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-text-tertiary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">No assets found</h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

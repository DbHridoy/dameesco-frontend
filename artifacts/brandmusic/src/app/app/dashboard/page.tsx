
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { 
  Search, 
  Video, 
  Sliders, 
  Package, 
  TrendingUp, 
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  Music
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const quickActions = [
  {
    icon: Search,
    title: 'AI Search',
    description: 'Find music with natural language',
    href: '/app/search',
    color: 'electric-blue',
  },
  {
    icon: Video,
    title: 'Video Sync',
    description: 'Test tracks against picture',
    href: '/app/video-sync',
    color: 'electric-purple',
  },
  {
    icon: Sliders,
    title: 'Stem Studio',
    description: 'Customize at stem level',
    href: '/app/stem-studio',
    color: 'electric-cyan',
  },
  {
    icon: Package,
    title: 'Projects',
    description: 'Manage campaign kits',
    href: '/app/projects',
    color: 'electric-pink',
  },
]

const recentActivity = [
  {
    type: 'search',
    title: 'Searched for luxury skincare music',
    time: '2 hours ago',
    icon: Search,
  },
  {
    type: 'video',
    title: 'Synced 3 tracks to Q1 campaign video',
    time: '5 hours ago',
    icon: Video,
  },
  {
    type: 'export',
    title: 'Exported custom edit - Luxury Nights',
    time: '1 day ago',
    icon: Sliders,
  },
  {
    type: 'project',
    title: 'Created project: Tech Product Launch',
    time: '2 days ago',
    icon: Package,
  },
]

const trendingTracks = [
  { id: 1, title: 'Luxury Nights', plays: 1247 },
  { id: 2, title: 'Premium Flow', plays: 982 },
  { id: 3, title: 'Modern Elegance', plays: 874 },
  { id: 4, title: 'Serene Vista', plays: 743 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/5 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-3xl mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-xl text-text-secondary">
              Ready to discover your next perfect track?
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="font-semibold text-lg mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={action.href}>
                  <Card className="group cursor-pointer h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${action.color}/20 to-${action.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-6 h-6 text-${action.color}`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-electric-blue transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">
                      {action.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Get started</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-lg mb-6">Recent Activity</h2>
            <Card>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    <div className="w-10 h-10 bg-surface-elevated rounded-lg flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-text-tertiary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white mb-1">{activity.title}</p>
                      <p className="text-xs text-text-tertiary">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" fullWidth className="mt-6">
                View All Activity
              </Button>
            </Card>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-electric-blue" />
                  <span className="text-sm text-text-secondary">This Week</span>
                </div>
                <div className="text-2xl font-display font-bold text-white">47</div>
                <div className="text-xs text-text-tertiary mt-1">Tracks discovered</div>
              </Card>
              <Card>
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-5 h-5 text-electric-purple" />
                  <span className="text-sm text-text-secondary">This Week</span>
                </div>
                <div className="text-2xl font-display font-bold text-white">12</div>
                <div className="text-xs text-text-tertiary mt-1">Videos synced</div>
              </Card>
              <Card>
                <div className="flex items-center gap-3 mb-2">
                  <Sliders className="w-5 h-5 text-electric-cyan" />
                  <span className="text-sm text-text-secondary">This Week</span>
                </div>
                <div className="text-2xl font-display font-bold text-white">5</div>
                <div className="text-xs text-text-tertiary mt-1">Custom exports</div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <Card>
              <h3 className="font-semibold mb-4">Trending Tracks</h3>
              <div className="space-y-3">
                {trendingTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate group-hover:text-electric-blue transition-colors">
                        {track.title}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        {track.plays.toLocaleString()} plays
                      </div>
                    </div>
                    <div className="text-lg font-display font-bold text-text-tertiary">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Tip */}
            <Card className="bg-gradient-to-br from-electric-blue/10 to-electric-purple/10 border-electric-blue/30">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-electric-blue" />
                <h3 className="font-semibold">AI Tip</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Try using more specific mood descriptors in your searches like "confident but not aggressive" for better results.
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Learn More
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="font-semibold mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Token Usage</span>
                    <span className="text-sm font-semibold text-white">12%</span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <div className="h-full w-[12%] bg-gradient-to-r from-electric-blue to-electric-purple rounded-full"></div>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1">
                    2,200 of 2,500 tokens remaining
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Active Projects</span>
                    <span className="text-sm font-semibold text-electric-blue">3</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Team Members</span>
                    <span className="text-sm font-semibold text-electric-purple">4</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

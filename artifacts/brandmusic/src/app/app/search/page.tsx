
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, Play, Heart, Download, Plus, SlidersHorizontal, Link2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const mockTracks = [
  {
    id: 1,
    title: 'Luxury Nights',
    artist: 'Modern Ambient',
    duration: '3:24',
    bpm: 110,
    key: 'Am',
    mood: ['Elegant', 'Sophisticated', 'Calm'],
    energy: 65,
    genre: 'Ambient',
  },
  {
    id: 2,
    title: 'Premium Flow',
    artist: 'Electronic Dreams',
    duration: '2:58',
    bpm: 120,
    key: 'C',
    mood: ['Uplifting', 'Modern', 'Premium'],
    energy: 75,
    genre: 'Electronic',
  },
  {
    id: 3,
    title: 'Serene Vista',
    artist: 'Ambient Collective',
    duration: '4:12',
    bpm: 95,
    key: 'Gm',
    mood: ['Peaceful', 'Refined', 'Spacious'],
    energy: 55,
    genre: 'Ambient',
  },
  {
    id: 4,
    title: 'Modern Elegance',
    artist: 'Minimal Beats',
    duration: '3:45',
    bpm: 105,
    key: 'Dm',
    mood: ['Sophisticated', 'Clean', 'Confident'],
    energy: 70,
    genre: 'Minimal',
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/5 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display font-bold text-2xl mb-1">AI Search</h1>
              <p className="text-text-secondary">Describe what you need in natural language</p>
            </div>
            <Button variant="ghost" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Similarity Search
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="relative flex items-center">
              <Sparkles className="absolute left-4 w-5 h-5 text-electric-blue" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., 'luxury skincare, calm, premium, perfect for Instagram'"
                className="w-full pl-12 pr-32 py-4 bg-surface-elevated border border-white/10 rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-electric-blue/50 transition-colors"
              />
              <div className="absolute right-2 flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-electric-blue/20 text-electric-blue' : 'text-text-tertiary hover:text-white hover:bg-surface-hover'}`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
                <Button onClick={handleSearch} disabled={isSearching}>
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-surface-elevated rounded-xl border border-white/10"
              >
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Mood</label>
                    <select className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-white text-sm">
                      <option>Any</option>
                      <option>Happy</option>
                      <option>Calm</option>
                      <option>Energetic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Energy</label>
                    <select className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-white text-sm">
                      <option>Any</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Genre</label>
                    <select className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-white text-sm">
                      <option>Any</option>
                      <option>Electronic</option>
                      <option>Ambient</option>
                      <option>Pop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Duration</label>
                    <select className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-white text-sm">
                      <option>Any</option>
                      <option>&lt; 1 min</option>
                      <option>1-3 min</option>
                      <option>&gt; 3 min</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-text-tertiary">Try:</span>
            {['Luxury skincare ad', 'Tech product launch', 'Travel vlog', 'Fashion runway'].map((prompt) => (
              <button
                key={prompt}
                onClick={() => setSearchQuery(prompt)}
                className="px-3 py-1.5 text-sm bg-surface-elevated border border-white/10 rounded-full text-text-secondary hover:text-white hover:border-electric-blue/50 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-text-secondary">
              {isSearching ? 'Searching...' : `${mockTracks.length} tracks found`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 bg-surface-elevated border border-white/10 rounded-lg text-sm text-text-secondary">
              <option>Relevance</option>
              <option>Duration</option>
              <option>BPM</option>
              <option>Energy</option>
            </select>
          </div>
        </div>

        {/* Track Grid */}
        <div className="grid gap-4">
          {mockTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:border-electric-blue/30 transition-all">
                <div className="flex items-center gap-6">
                  {/* Waveform Preview */}
                  <div className="w-24 h-24 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    {/* Mock waveform bars */}
                    <div className="flex items-center gap-0.5 h-full p-2">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-electric-blue/50 rounded-full"
                          style={{ height: `${Math.random() * 60 + 40}%` }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-white mb-1 truncate">
                      {track.title}
                    </h3>
                    <p className="text-text-tertiary text-sm mb-3">
                      {track.artist} • {track.duration} • {track.bpm} BPM • {track.key}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {track.mood.map((mood) => (
                        <span
                          key={mood}
                          className="px-2 py-1 text-xs bg-electric-blue/10 text-electric-blue rounded-full"
                        >
                          {mood}
                        </span>
                      ))}
                      <span className="px-2 py-1 text-xs bg-surface-elevated text-text-tertiary rounded-full">
                        {track.genre}
                      </span>
                    </div>
                  </div>

                  {/* Energy Bar */}
                  <div className="hidden md:flex flex-col items-center gap-2 w-24">
                    <span className="text-xs text-text-tertiary">Energy</span>
                    <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-electric-blue to-electric-purple rounded-full"
                        style={{ width: `${track.energy}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-electric-blue">
                      {track.energy}%
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                      <Heart className="w-5 h-5 text-text-tertiary hover:text-electric-pink" />
                    </button>
                    <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                      <Plus className="w-5 h-5 text-text-tertiary hover:text-electric-blue" />
                    </button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                      Stems
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline">
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  )
}

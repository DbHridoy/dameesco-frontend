
import { motion } from 'framer-motion'
import { Search, Sparkles, Music, TrendingUp, Heart, Zap } from 'lucide-react'
import { useState } from 'react'

const searchExamples = [
  {
    query: "Confident but not aggressive for a tech startup",
    results: [
      { title: "Digital Horizon", mood: "Confident", energy: "Medium", genre: "Electronic" },
      { title: "Innovation Drive", mood: "Optimistic", energy: "High", genre: "Corporate" },
      { title: "Future Forward", mood: "Ambitious", energy: "Medium", genre: "Indie Electronic" },
    ]
  },
  {
    query: "Luxury spa background music, calm and sophisticated",
    results: [
      { title: "Serene Waters", mood: "Peaceful", energy: "Low", genre: "Ambient" },
      { title: "Tranquil Moments", mood: "Calm", energy: "Low", genre: "New Age" },
      { title: "Zen Garden", mood: "Meditative", energy: "Low", genre: "Ambient" },
    ]
  },
  {
    query: "Upbeat workout motivation without vocals",
    results: [
      { title: "Power Drive", mood: "Energetic", energy: "High", genre: "Electronic" },
      { title: "Beast Mode", mood: "Intense", energy: "High", genre: "Hip Hop" },
      { title: "Victory Lap", mood: "Triumphant", energy: "High", genre: "Rock" },
    ]
  },
]

export default function AISearchDemo() {
  const [activeExample, setActiveExample] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  const handleExampleClick = (index: number) => {
    setIsSearching(true)
    setActiveExample(index)
    setTimeout(() => setIsSearching(false), 1500)
  }

  const currentExample = searchExamples[activeExample]

  return (
    <section className="py-20 lg:py-32 bg-surface/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated/50 backdrop-blur-sm rounded-full border border-electric-blue/30 mb-6">
            <Sparkles className="w-4 h-4 text-electric-blue" />
            <span className="text-sm font-medium text-electric-blue">AI-Powered Search</span>
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Describe What You Need,
            <br />
            <span className="gradient-blue-purple text-gradient">We'll Find It</span>
          </h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our AI understands context, mood, and emotion—not just keywords. Search the way you think.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Search Bar Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-surface-elevated border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-4">
                  <Search className="w-6 h-6 text-text-tertiary flex-shrink-0" />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={currentExample.query}
                      readOnly
                      className="w-full bg-transparent text-white text-lg outline-none"
                    />
                  </div>
                  {isSearching && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Example Queries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <span className="text-sm text-text-tertiary">Try:</span>
            {searchExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeExample === index
                    ? 'bg-electric-blue text-black'
                    : 'bg-surface-elevated text-text-secondary hover:bg-surface-hover'
                }`}
              >
                {example.query.split(',')[0].substring(0, 30)}...
              </button>
            ))}
          </motion.div>

          {/* Results */}
          <motion.div
            key={activeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {currentExample.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: isSearching ? 1.5 + index * 0.1 : index * 0.1 }}
                className="bg-surface-elevated border border-white/10 rounded-xl p-6 hover:border-electric-blue/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  {/* Waveform Visual */}
                  <div className="w-16 h-16 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-0.5 h-8">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-electric-blue rounded-full transition-all group-hover:bg-electric-cyan"
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-electric-blue transition-colors">
                      {result.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-text-tertiary">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>{result.mood}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{result.energy} Energy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4" />
                        <span>{result.genre}</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-electric-blue mb-1">
                      {95 - index * 3}%
                    </div>
                    <div className="text-xs text-text-tertiary">
                      Match
                    </div>
                  </div>

                  {/* Play Button */}
                  <button className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <Zap className="w-6 h-6 text-black" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-surface-elevated/50 border border-electric-blue/20 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-electric-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">How Our AI Search Works</h3>
                <p className="text-text-secondary text-sm mb-4">
                  Our semantic search engine analyzes your query to understand intent, mood, energy level, and context—then matches against our entire catalog's metadata, instrumentation, and sonic characteristics.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-surface rounded-lg">
                    <div className="font-semibold text-sm text-electric-blue mb-1">Mood Analysis</div>
                    <div className="text-xs text-text-tertiary">Detects emotional tone and atmosphere</div>
                  </div>
                  <div className="p-3 bg-surface rounded-lg">
                    <div className="font-semibold text-sm text-electric-purple mb-1">Context Understanding</div>
                    <div className="text-xs text-text-tertiary">Understands use case and environment</div>
                  </div>
                  <div className="p-3 bg-surface rounded-lg">
                    <div className="font-semibold text-sm text-electric-cyan mb-1">Sonic Matching</div>
                    <div className="text-xs text-text-tertiary">Analyzes instrumentation and production style</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

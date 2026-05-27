
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Download, Scissors, Copy, Sparkles, Coins, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const stems = [
  { id: 'drums', name: 'Drums', color: 'electric-blue', volume: 100, solo: false, muted: false },
  { id: 'bass', name: 'Bass', color: 'electric-purple', volume: 100, solo: false, muted: false },
  { id: 'melody', name: 'Melody', color: 'electric-cyan', volume: 100, solo: false, muted: false },
  { id: 'vocals', name: 'Vocals', color: 'electric-pink', volume: 100, solo: false, muted: false },
  { id: 'fx', name: 'FX', color: 'success', volume: 100, solo: false, muted: false },
]

const exportOptions = [
  { type: 'full', label: 'Full Track', cost: 100, duration: 'Original length' },
  { type: 'cutdown', label: '30s Cutdown', cost: 50, duration: '30 seconds' },
  { type: 'stems', label: 'All Stems', cost: 150, duration: 'Original length' },
]

export default function StemStudioPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(45)
  const [duration] = useState(204)
  const [stemControls, setStemControls] = useState(stems)
  const [showExportModal, setShowExportModal] = useState(false)
  const [tokenBalance] = useState(2500)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const updateStem = (id: string, key: keyof typeof stems[0], value: any) => {
    setStemControls(stemControls.map(stem => 
      stem.id === id ? { ...stem, [key]: value } : stem
    ))
  }

  const toggleSolo = (id: string) => {
    const newControls = stemControls.map(stem => ({
      ...stem,
      solo: stem.id === id ? !stem.solo : false
    }))
    setStemControls(newControls)
  }

  const hasModifications = stemControls.some(s => 
    s.volume !== 100 || s.muted || s.solo
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/5 bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl mb-1">Stem Studio</h1>
              <p className="text-text-secondary">Customize music at the stem level</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-elevated rounded-lg border border-white/10">
                <Coins className="w-4 h-4 text-electric-blue" />
                <span className="text-sm">
                  <span className="font-semibold text-white">{tokenBalance.toLocaleString()}</span>
                  <span className="text-text-tertiary ml-1">tokens</span>
                </span>
              </div>
              <Button 
                onClick={() => setShowExportModal(true)}
                disabled={!hasModifications}
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Track Info */}
        <Card className="mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-electric-blue/20 to-electric-purple/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-electric-blue" />
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-2xl mb-1">Luxury Nights</h2>
              <p className="text-text-secondary">Modern Ambient • 3:24 • 110 BPM • Am</p>
            </div>
            {hasModifications && (
              <div className="px-4 py-2 bg-warning/20 text-warning rounded-lg text-sm font-semibold">
                Modified • Preview Free
              </div>
            )}
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Waveform Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Master Controls */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Master Controls</h3>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm bg-surface-elevated rounded-lg hover:bg-surface-hover transition-colors">
                    <Scissors className="w-4 h-4 inline mr-1" />
                    Trim
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-surface-elevated rounded-lg hover:bg-surface-hover transition-colors">
                    <Copy className="w-4 h-4 inline mr-1" />
                    Loop
                  </button>
                </div>
              </div>

              {/* Timeline/Waveform */}
              <div className="mb-6">
                <div className="h-32 bg-surface rounded-xl p-4 relative overflow-hidden">
                  {/* Mock waveform */}
                  <div className="flex items-center justify-center h-full gap-1">
                    {[...Array(100)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-electric-blue/30 to-electric-blue/80 rounded-full"
                        style={{ 
                          height: `${Math.sin(i / 10) * 40 + 50}%`,
                          opacity: i / 100 < currentTime / duration ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Playhead */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-electric-blue shadow-glow-sm"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                {/* Timeline controls */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center hover:bg-electric-cyan transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-black" />
                    ) : (
                      <Play className="w-6 h-6 text-black ml-0.5" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm text-text-secondary font-mono w-12">
                        {formatTime(currentTime)}
                      </span>
                      <div className="flex-1 relative">
                        <div className="h-2 bg-surface rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-electric-blue to-electric-purple"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={duration}
                          value={currentTime}
                          onChange={(e) => setCurrentTime(Number(e.target.value))}
                          className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-text-secondary font-mono w-12 text-right">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Individual Stems */}
            <Card>
              <h3 className="font-semibold text-lg mb-4">Individual Stems</h3>
              <div className="space-y-4">
                {stemControls.map((stem) => (
                  <div
                    key={stem.id}
                    className={`p-4 rounded-xl border transition-all ${
                      stem.solo
                        ? `border-${stem.color} bg-${stem.color}/10`
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      {/* Stem Name */}
                      <div className="flex items-center gap-3 w-32">
                        <div className={`w-3 h-3 rounded-full bg-${stem.color}`}></div>
                        <span className="font-semibold text-white">{stem.name}</span>
                      </div>

                      {/* Solo/Mute */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSolo(stem.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            stem.solo
                              ? 'bg-electric-blue text-black'
                              : 'bg-surface-elevated text-text-secondary hover:text-white'
                          }`}
                        >
                          S
                        </button>
                        <button
                          onClick={() => updateStem(stem.id, 'muted', !stem.muted)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            stem.muted
                              ? 'bg-error/20 text-error'
                              : 'bg-surface-elevated text-text-secondary hover:text-white'
                          }`}
                        >
                          M
                        </button>
                      </div>

                      {/* Volume Control */}
                      <div className="flex-1 flex items-center gap-3">
                        <button
                          onClick={() => updateStem(stem.id, 'muted', !stem.muted)}
                          className="text-text-tertiary hover:text-white transition-colors"
                        >
                          {stem.muted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        <div className="flex-1 relative">
                          <div className="h-2 bg-surface rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r from-${stem.color}/50 to-${stem.color}`}
                              style={{ width: `${stem.volume}%` }}
                            />
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={stem.volume}
                            onChange={(e) => updateStem(stem.id, 'volume', Number(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                            disabled={stem.muted}
                          />
                        </div>
                        <span className="text-sm text-text-secondary w-12 text-right font-mono">
                          {stem.volume}%
                        </span>
                      </div>
                    </div>

                    {/* Mini waveform */}
                    <div className="h-12 bg-surface rounded-lg flex items-center justify-center gap-px px-2">
                      {[...Array(50)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full bg-${stem.color}/30`}
                          style={{ 
                            height: `${Math.sin(i / 5) * 30 + 40}%`,
                            opacity: stem.muted ? 0.2 : 0.8
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-electric-blue/10 to-electric-purple/10 border-electric-blue/30">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-electric-blue" />
                <h3 className="font-semibold text-lg">Preview Mode</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                All customizations are free to preview. Tokens are only required when you export.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-success">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  Unlimited stem adjustments
                </div>
                <div className="flex items-center gap-2 text-success">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  Real-time playback
                </div>
                <div className="flex items-center gap-2 text-success">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  Free to experiment
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">AI Suggestions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-surface rounded-lg hover:bg-surface-hover transition-colors text-left">
                  <div className="font-medium text-sm mb-1">Boost Vocals</div>
                  <div className="text-xs text-text-tertiary">Increase vocals by 20%</div>
                </button>
                <button className="w-full p-3 bg-surface rounded-lg hover:bg-surface-hover transition-colors text-left">
                  <div className="font-medium text-sm mb-1">Create Cutdown</div>
                  <div className="text-xs text-text-tertiary">Auto-generate 30s version</div>
                </button>
                <button className="w-full p-3 bg-surface rounded-lg hover:bg-surface-hover transition-colors text-left">
                  <div className="font-medium text-sm mb-1">Strip Drums</div>
                  <div className="text-xs text-text-tertiary">Remove drums entirely</div>
                </button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" fullWidth size="sm">
                  Reset All Changes
                </Button>
                <Button variant="outline" fullWidth size="sm">
                  Save as Preset
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-elevated rounded-2xl p-8 max-w-2xl w-full border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl">Export Options</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {exportOptions.map((option) => (
                <button
                  key={option.type}
                  className="w-full p-4 bg-surface border border-white/10 rounded-xl hover:border-electric-blue/50 transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{option.label}</h3>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-electric-blue" />
                      <span className="font-display font-bold text-xl text-electric-blue">
                        {option.cost}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-tertiary">{option.duration}</p>
                </button>
              ))}
            </div>

            <div className="p-4 bg-surface rounded-xl mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">Current Balance</span>
                <span className="font-semibold text-white">{tokenBalance.toLocaleString()} tokens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">After Export</span>
                <span className="font-semibold text-electric-blue">
                  {(tokenBalance - 100).toLocaleString()} tokens
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setShowExportModal(false)}>
                Cancel
              </Button>
              <Button fullWidth>
                Confirm Export
              </Button>
            </div>

            <p className="text-xs text-text-tertiary text-center mt-4">
              Need more tokens? <a href="#" className="text-electric-blue hover:text-electric-cyan">Purchase token packages</a>
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}

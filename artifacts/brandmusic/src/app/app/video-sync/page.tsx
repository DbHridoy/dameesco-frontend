
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Download, Plus, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const mockTracks = [
  { id: 1, title: 'Luxury Nights', artist: 'Modern Ambient', duration: '3:24' },
  { id: 2, title: 'Premium Flow', artist: 'Electronic Dreams', duration: '2:58' },
  { id: 3, title: 'Serene Vista', artist: 'Ambient Collective', duration: '4:12' },
]

export default function VideoSyncPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(45)
  const [duration] = useState(180)
  const [volume, setVolume] = useState(75)
  const [hasVideo, setHasVideo] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(mockTracks[0])
  const [trackQueue, setTrackQueue] = useState<typeof mockTracks>([])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/5 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl mb-1">Video Sync Studio</h1>
              <p className="text-text-secondary">Upload video and test music in real-time</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-success/20 text-success rounded-lg text-sm font-semibold">
                Free Forever
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Upload/Player */}
            <Card className="p-0 overflow-hidden">
              {!hasVideo ? (
                <div className="aspect-video bg-surface flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl m-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-10 h-10 text-electric-blue" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Upload your video</h3>
                    <p className="text-text-secondary mb-6 max-w-sm">
                      Drag and drop or click to upload MP4, MOV, or AVI files
                    </p>
                    <Button onClick={() => setHasVideo(true)}>
                      Choose File
                    </Button>
                    <p className="text-xs text-text-tertiary mt-4">
                      Max file size: 500MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  {/* Video Display */}
                  <div className="aspect-video bg-black flex items-center justify-center relative">
                    <div className="text-center text-text-muted">
                      <p className="text-sm mb-2">Video Preview</p>
                      <p className="text-xs">luxury-skincare-ad.mp4</p>
                    </div>
                    
                    {/* Playback Overlay */}
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="w-20 h-20 bg-electric-blue rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Play className="w-10 h-10 text-black ml-1" />
                        </button>
                      </div>
                    )}

                    {/* Top Controls */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-sm">
                          Now Playing: <span className="text-electric-blue font-semibold">{selectedTrack.title}</span>
                        </div>
                      </div>
                      <button className="p-2 bg-black/80 backdrop-blur-sm rounded-lg hover:bg-black/90 transition-colors">
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="bg-surface-elevated p-4">
                    {/* Timeline */}
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-text-secondary font-mono">
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
                        <span className="text-sm text-text-secondary font-mono">
                          {formatTime(duration)}
                        </span>
                      </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                          <SkipBack className="w-5 h-5" />
                        </button>
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
                        <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
                          <SkipForward className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Volume */}
                      <div className="flex items-center gap-3 w-40">
                        <Volume2 className="w-5 h-5 text-text-tertiary" />
                        <div className="flex-1 relative">
                          <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                            <div
                              className="h-full bg-electric-blue"
                              style={{ width: `${volume}%` }}
                            />
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Track Queue */}
            {hasVideo && trackQueue.length > 0 && (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Test Queue</h3>
                  <Button variant="ghost" size="sm" onClick={() => setTrackQueue([])}>
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  {trackQueue.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-4 p-3 bg-surface rounded-lg hover:bg-surface-hover transition-colors group"
                    >
                      <div className="text-text-tertiary font-mono text-sm w-6">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{track.title}</div>
                        <div className="text-sm text-text-tertiary">{track.artist}</div>
                      </div>
                      <div className="text-sm text-text-tertiary">{track.duration}</div>
                      <button
                        onClick={() => {
                          setSelectedTrack(track)
                          setTrackQueue(trackQueue.filter((t) => t.id !== track.id))
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-surface-elevated rounded-lg transition-all"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setTrackQueue(trackQueue.filter((t) => t.id !== track.id))}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-surface-elevated rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Track Selection Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-lg mb-4">Available Tracks</h3>
              <p className="text-sm text-text-secondary mb-4">
                Click to add tracks to your test queue
              </p>
              <div className="space-y-3">
                {mockTracks.map((track) => (
                  <motion.div
                    key={track.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      selectedTrack.id === track.id
                        ? 'border-electric-blue bg-electric-blue/10'
                        : 'border-white/10 hover:border-white/20 hover:bg-surface-hover'
                    }`}
                    onClick={() => {
                      if (!trackQueue.find((t) => t.id === track.id)) {
                        setTrackQueue([...trackQueue, track])
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">
                          {track.title}
                        </h4>
                        <p className="text-sm text-text-tertiary truncate">
                          {track.artist}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!trackQueue.find((t) => t.id === track.id)) {
                            setTrackQueue([...trackQueue, track])
                          }
                        }}
                        className="p-1.5 hover:bg-electric-blue/20 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-electric-blue" />
                      </button>
                    </div>
                    <div className="text-xs text-text-tertiary">
                      {track.duration}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" fullWidth className="mt-4">
                Browse More Tracks
              </Button>
            </Card>

            <Card>
              <h3 className="font-semibold text-lg mb-4">Sync Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-surface rounded-lg">
                  <div className="text-xs text-text-tertiary mb-1">Video Duration</div>
                  <div className="text-lg font-semibold text-white">3:00</div>
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <div className="text-xs text-text-tertiary mb-1">Tracks Tested</div>
                  <div className="text-lg font-semibold text-electric-blue">{trackQueue.length}</div>
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <div className="text-xs text-text-tertiary mb-1">AI Recommendation</div>
                  <div className="text-sm text-white mt-2">
                    "Luxury Nights" matches your video's pacing and premium aesthetic
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-electric-blue/10 to-electric-purple/10 border-electric-blue/30">
              <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-text-secondary">
                Video sync is always free. Test unlimited tracks to find the perfect fit before licensing.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

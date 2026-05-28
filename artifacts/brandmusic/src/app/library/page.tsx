import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import {
  Search,
  Play,
  Music2,
  Video,
  ArrowRight,
  Upload,
  X,
  Check,
  Loader2,
  Sparkles,
  Download,
  FileText,
} from 'lucide-react'
import { mockTracks } from '@/lib/mockTracks'
import type { Track } from '@/types/database.types'

type Lex = { keys: string[]; moods?: string[]; genres?: string[]; energy?: 'high' | 'low' }
const lexicon: Lex[] = [
  { keys: ['energetic', 'energy', 'powerful', 'intense', 'fast', 'driving', 'pumping'], moods: ['Energetic', 'Powerful'], energy: 'high' },
  { keys: ['calm', 'chill', 'relaxed', 'peaceful', 'slow', 'soft', 'gentle', 'meditative', 'wellness'], moods: ['Calm', 'Peaceful', 'Reflective'], energy: 'low' },
  { keys: ['uplifting', 'happy', 'hopeful', 'positive', 'inspiring', 'optimistic'], moods: ['Uplifting', 'Hopeful'] },
  { keys: ['dark', 'moody', 'mysterious', 'tense'], moods: ['Dark', 'Dramatic'] },
  { keys: ['dramatic', 'epic', 'cinematic', 'trailer', 'film', 'movie'], moods: ['Dramatic', 'Epic', 'Powerful'], genres: ['Cinematic', 'Orchestral'] },
  { keys: ['corporate', 'business', 'professional', 'office'], genres: ['Corporate'] },
  { keys: ['tech', 'startup', 'modern', 'innovative', 'product', 'launch', 'app', 'saas'], moods: ['Modern', 'Innovative'], genres: ['Electronic', 'Tech'] },
  { keys: ['ambient', 'atmospheric', 'background', 'spacious', 'airy'], genres: ['Ambient'] },
  { keys: ['acoustic', 'warm', 'organic', 'authentic', 'folk', 'natural', 'story', 'human'], moods: ['Warm', 'Authentic', 'Hopeful'], genres: ['Acoustic', 'Folk'] },
  { keys: ['playful', 'fun', 'funky', 'quirky', 'upbeat'], moods: ['Playful', 'Fun'], genres: ['Funk', 'Pop'] },
  { keys: ['confident', 'bold', 'assertive', 'strong'], moods: ['Confident'] },
  { keys: ['piano'], genres: ['Piano'] },
  { keys: ['pop'], genres: ['Pop'] },
  { keys: ['electronic', 'synth'], genres: ['Electronic'] },
]

type Match = { score: number; reasons: string[] }
function scoreTrack(track: Track, query: string): Match {
  const q = query.toLowerCase()
  if (!q.trim()) return { score: 0, reasons: [] }
  const tokens = q.split(/[^a-z0-9]+/).filter(Boolean)
  let score = 0
  const reasons = new Set<string>()

  for (const entry of lexicon) {
    const hit = entry.keys.some((k) => tokens.includes(k) || q.includes(k))
    if (!hit) continue
    if (entry.moods) {
      for (const m of entry.moods) {
        if (track.mood.includes(m)) {
          score += 2
          reasons.add(m)
        }
      }
    }
    if (entry.genres) {
      for (const g of entry.genres) {
        if (track.genre.includes(g)) {
          score += 2
          reasons.add(g)
        }
      }
    }
    if (entry.energy === 'high' && track.energy >= 0.7) {
      score += 1
      reasons.add('High energy')
    }
    if (entry.energy === 'low' && track.energy <= 0.5) {
      score += 1
      reasons.add('Low energy')
    }
  }

  for (const token of tokens) {
    if (token.length < 3) continue
    if (track.title.toLowerCase().includes(token)) {
      score += 1
      reasons.add(`“${token}”`)
    }
    for (const g of track.genre) {
      if (g.toLowerCase().includes(token)) {
        score += 1
        reasons.add(g)
      }
    }
    for (const m of track.mood) {
      if (m.toLowerCase().includes(token)) {
        score += 1
        reasons.add(m)
      }
    }
  }

  return { score, reasons: Array.from(reasons) }
}

const suggestedPrompts = [
  'Confident tech startup launch',
  'Calm piano for wellness',
  'Epic cinematic trailer',
  'Warm acoustic brand story',
]
const collections = [
  {
    title: 'Tech & Startup',
    tracks: 142,
    blurb: 'Forward-momentum cues for product launches and brand films.',
    cover:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
  },
  {
    title: 'Cinematic Brands',
    tracks: 96,
    blurb: 'Strings, swells, and emotional arcs for hero spots.',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  },
  {
    title: 'Ambient & Calm',
    tracks: 78,
    blurb: 'Atmospheric textures for wellness, fashion, and editorial.',
    cover:
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=400&fit=crop',
  },
  {
    title: 'Confident Pop',
    tracks: 124,
    blurb: 'Modern, hooky tracks for retail, lifestyle, and social.',
    cover:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
  },
]

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [committedQuery, setCommittedQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    return () => {
      if (analyzeTimer.current) clearTimeout(analyzeTimer.current)
    }
  }, [])

  const submitSearch = () => {
    if (analyzeTimer.current) clearTimeout(analyzeTimer.current)
    const q = searchQuery.trim()
    if (!q) {
      setCommittedQuery('')
      setIsAnalyzing(false)
      return
    }
    setIsAnalyzing(true)
    analyzeTimer.current = setTimeout(() => {
      setCommittedQuery(q)
      setIsAnalyzing(false)
    }, 650)
  }
  const [syncOpen, setSyncOpen] = useState(false)
  const [syncFile, setSyncFile] = useState<File | null>(null)
  const [syncStage, setSyncStage] = useState<'idle' | 'analyzing' | 'ready'>('idle')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const openSync = () => {
    setSyncFile(null)
    setSyncStage('idle')
    setSyncOpen(true)
  }
  const closeSync = () => {
    setSyncOpen(false)
    setSyncFile(null)
    setSyncStage('idle')
  }
  const handleSyncFile = (file: File | null) => {
    if (!file) return
    setSyncFile(file)
    setSyncStage('analyzing')
    setTimeout(() => setSyncStage('ready'), 1600)
  }
  const formatBytes = (b: number) => {
    if (b < 1024) return `${b} B`
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`
    return `${(b / (1024 * 1024)).toFixed(1)} MB`
  }

  const hasQuery = committedQuery.trim().length > 0
  const scored = mockTracks.map((track) => ({
    track,
    match: scoreTrack(track, committedQuery),
  }))
  const maxScore = Math.max(1, ...scored.map((s) => s.match.score))

  const filteredTracks = scored
    .filter(({ match }) => {
      if (!hasQuery) return true
      return match.score > 0
    })
    .sort((a, b) => (hasQuery ? b.match.score - a.match.score : 0))


  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <Navigation />

      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Library
          </span>
          <h1 className="h-display text-[44px] sm:text-[56px] md:text-[60px] mt-4">
            Browse music.
          </h1>
          <p className="mt-4 text-[15px] text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Describe what you need — mood, energy, references — the way you'd brief a music supervisor.
          </p>
        </div>
      </section>

      {/* Search + filters */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submitSearch()
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface)] focus-within:border-[var(--color-accent)] transition-colors"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Describe the music you need"
              placeholder="Describe the mood, scene, or feeling — e.g. confident tech startup launch"
              className="flex-1 bg-transparent text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none py-2 pl-3"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setCommittedQuery('')
                  setIsAnalyzing(false)
                  if (analyzeTimer.current) clearTimeout(analyzeTimer.current)
                }}
                aria-label="Clear search"
                className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <Button
              type="submit"
              size="sm"
              disabled={!searchQuery.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  Search
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mr-1">
              Try
            </span>
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setSearchQuery(p)
                  if (analyzeTimer.current) clearTimeout(analyzeTimer.current)
                  setIsAnalyzing(true)
                  analyzeTimer.current = setTimeout(() => {
                    setCommittedQuery(p)
                    setIsAnalyzing(false)
                  }, 650)
                }}
                className="h-8 px-3 rounded-md text-[12.5px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Video sync banner */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)] flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div>
                <div className="mb-1">
                  <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                    Video Sync Tool
                  </span>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)]">
                  Preview tracks against your footage
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={openSync}>
              Try it
              <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured collections */}
      <section
        aria-hidden={hasQuery || isAnalyzing}
        className={`overflow-hidden transition-all ease-in-out ${
          hasQuery || isAnalyzing
            ? 'max-h-0 opacity-0 pb-0 duration-300'
            : 'max-h-[1200px] opacity-100 pb-16 duration-500'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Collections
              </span>
              <h2 className="h-display text-[22px] md:text-[28px] mt-2">Curated for brand work.</h2>
            </div>
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] hidden sm:block">
              {collections.length} sets
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {collections.map((c) => (
              <button
                key={c.title}
                type="button"
                className="group text-left rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-border-default)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)]"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={c.cover}
                    alt=""
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 mono text-[10px] uppercase tracking-[0.18em] text-white/90 bg-black/40 backdrop-blur px-1.5 py-0.5 rounded">
                    {c.tracks} tracks
                  </span>
                </div>
                <div className="p-4">
                  <div className="text-[14px] font-medium text-[var(--color-text-primary)]">
                    {c.title}
                  </div>
                  <p className="mt-1 text-[12.5px] text-[var(--color-text-tertiary)] leading-relaxed">
                    {c.blurb}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-[14px] font-medium text-[var(--color-text-primary)] flex items-center gap-2">
              {hasQuery && <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />}
              {hasQuery ? 'AI matches' : 'All tracks'}
              {hasQuery && (
                <span className="text-[12px] text-[var(--color-text-tertiary)] font-normal">
                  for "{committedQuery}"
                </span>
              )}
            </h2>
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
              {isAnalyzing
                ? 'Analyzing…'
                : `${filteredTracks.length} ${filteredTracks.length === 1 ? 'track' : 'tracks'}`}
            </span>
          </div>

          {isAnalyzing ? (
            <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-16 text-center">
              <Loader2 className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-3 animate-spin" />
              <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] mb-1">
                Reading your brief
              </h3>
              <p className="text-[13px] text-[var(--color-text-secondary)]">
                Matching mood, energy, and genre against the catalog…
              </p>
            </div>
          ) : filteredTracks.length === 0 ? (
            <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-16 text-center">
              <Music2 className="w-6 h-6 text-[var(--color-text-tertiary)] mx-auto mb-3" />
              <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] mb-1">
                {hasQuery ? 'No close matches' : 'No tracks found'}
              </h3>
              <p className="text-[13px] text-[var(--color-text-secondary)]">
                {hasQuery
                  ? 'Try a different mood, genre, or use one of the suggested briefs above.'
                  : 'Try adjusting your search or filters.'}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] divide-y divide-[var(--color-border-subtle)] overflow-hidden">
              {filteredTracks.map(({ track, match }, i) => {
                const relevance = hasQuery
                  ? Math.min(100, Math.round((match.score / maxScore) * 100))
                  : 0
                return (
                <div
                  key={`${committedQuery}-${track.id}`}
                  style={{ animationDelay: `${i * 45}ms` }}
                  className="track-row-in group flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={track.cover_url}
                      alt={track.title}
                      className="w-11 h-11 rounded-md object-cover border border-[var(--color-border-subtle)]"
                    />
                    <button
                      type="button"
                      aria-label={`Play ${track.title}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] transition-opacity rounded-md"
                    >
                      <Play className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] text-[var(--color-text-primary)] truncate">
                      {track.title}
                    </div>
                    <div className="text-[12px] text-[var(--color-text-tertiary)] truncate">
                      {track.artist}
                    </div>
                    {hasQuery && match.reasons.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap items-center gap-1">
                        {match.reasons.slice(0, 4).map((r) => (
                          <span
                            key={r}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {hasQuery && (
                    <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 w-[84px]">
                      <span className="mono text-[10.5px] text-[var(--color-accent)] tabular-nums">
                        {relevance}% match
                      </span>
                      <div className="w-full h-1 rounded-full bg-[var(--color-border-subtle)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-accent)] transition-all"
                          style={{ width: `${relevance}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="hidden md:flex items-center justify-start gap-1.5 flex-shrink-0 w-[150px]">
                    {track.genre.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-secondary)] whitespace-nowrap"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="hidden lg:grid grid-cols-2 gap-x-4 flex-shrink-0 w-[120px] text-right">
                    <span className="mono text-[11px] text-[var(--color-text-tertiary)] tabular-nums text-right">
                      {track.bpm} BPM
                    </span>
                    <span className="mono text-[11px] text-[var(--color-text-tertiary)] text-right">
                      {track.key}
                    </span>
                  </div>

                  <span className="mono text-[11px] text-[var(--color-text-tertiary)] flex-shrink-0 w-[40px] text-right tabular-nums">
                    {formatDuration(track.duration)}
                  </span>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      aria-label={`Download ${track.title}`}
                      title="Download preview"
                      className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Download</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`License ${track.title}`}
                      title="License track"
                      className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[12px] bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">License</span>
                    </button>
                  </div>
                </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Video Sync modal */}
      {syncOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sync-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeSync}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-lg rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)] flex items-center justify-center">
                  <Video className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h2
                    id="sync-title"
                    className="text-[14px] font-medium text-[var(--color-text-primary)]"
                  >
                    Video Sync Preview
                  </h2>
                  <p className="text-[11.5px] text-[var(--color-text-tertiary)]">
                    Upload a clip to preview tracks against your footage.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeSync}
                aria-label="Close"
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {syncStage === 'idle' && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault()
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      const f = e.dataTransfer.files?.[0] ?? null
                      handleSyncFile(f)
                    }}
                    className="w-full rounded-lg border border-dashed border-[var(--color-border-default)] bg-[var(--color-background)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors px-6 py-12 flex flex-col items-center justify-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)]"
                  >
                    <div className="w-10 h-10 rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface)] flex items-center justify-center mb-3">
                      <Upload className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <div className="text-[13.5px] text-[var(--color-text-primary)]">
                      Drop a video here, or click to browse
                    </div>
                    <div className="mt-1 text-[12px] text-[var(--color-text-tertiary)]">
                      MP4, MOV, or WebM · up to 500 MB
                    </div>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleSyncFile(e.target.files?.[0] ?? null)}
                  />
                  <p className="mt-4 text-[12px] text-[var(--color-text-tertiary)] text-center">
                    Nothing leaves your machine — files are processed locally.
                  </p>
                </>
              )}

              {syncStage === 'analyzing' && syncFile && (
                <div className="py-10 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-[var(--color-border-default)] bg-[var(--color-background)] flex items-center justify-center mb-4">
                    <Loader2 className="w-4 h-4 text-[var(--color-accent)] animate-spin" />
                  </div>
                  <div className="text-[13.5px] text-[var(--color-text-primary)]">
                    Analyzing {syncFile.name}…
                  </div>
                  <div className="mt-1 mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                    {formatBytes(syncFile.size)} · detecting tempo & cuts
                  </div>
                </div>
              )}

              {syncStage === 'ready' && syncFile && (
                <>
                  <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)]">
                    <div className="w-7 h-7 rounded bg-[var(--color-accent-soft)] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] text-[var(--color-text-primary)] truncate">
                        {syncFile.name}
                      </div>
                      <div className="mono text-[11px] text-[var(--color-text-tertiary)]">
                        {formatBytes(syncFile.size)} · 24 fps · 118 BPM detected
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-2">
                      Sync preview
                    </div>
                    <div className="flex items-end gap-[3px] h-12 px-3 py-2 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)]">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const h = 25 + Math.abs(Math.sin(i * 0.7) * 65)
                        return (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-[var(--color-accent)]/70"
                            style={{ height: `${h}%` }}
                          />
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSyncFile(null)
                        setSyncStage('idle')
                      }}
                      className="text-[12.5px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      Upload a different clip
                    </button>
                    <Button size="sm" onClick={closeSync}>
                      Browse matching tracks
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

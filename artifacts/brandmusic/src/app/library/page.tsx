import { useRef, useState } from 'react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import {
  Search,
  Play,
  Music2,
  Heart,
  Video,
  ArrowRight,
  Upload,
  X,
  Check,
  Loader2,
} from 'lucide-react'
import { mockTracks } from '@/lib/mockTracks'
import FavoriteButton from '@/components/ui/FavoriteButton'
import AddToPlaylistButton from '@/components/ui/AddToPlaylistButton'
import { useFavorites } from '@/hooks/useFavorites'
import { usePlaylists } from '@/hooks/usePlaylists'
import { useAuth } from '@/contexts/AuthContext'

const moods = ['Energetic', 'Calm', 'Uplifting', 'Dark', 'Emotional', 'Confident', 'Playful', 'Dramatic']
const genres = ['All', 'Corporate', 'Ambient', 'Electronic', 'Cinematic', 'Pop', 'Hip Hop', 'Acoustic', 'Tech']

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
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const { playlists } = usePlaylists()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>('All')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
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

  const filteredTracks = mockTracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesMood = !selectedMood || track.mood.includes(selectedMood)
    const matchesGenre =
      selectedGenre === 'All' || track.genre.some((g) => g === selectedGenre)
    const matchesFavorites =
      !showFavoritesOnly || favorites.some((fav) => fav.track_id === track.id)
    return matchesSearch && matchesMood && matchesGenre && matchesFavorites
  })


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
          <div className="flex items-center gap-2 p-1.5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface)] focus-within:border-[var(--color-accent)] transition-colors">
            <div className="pl-3 text-[var(--color-text-tertiary)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search tracks by title, artist, or genre"
              placeholder="Confident but not aggressive, for a tech startup…"
              className="flex-1 bg-transparent text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none py-2"
            />
          </div>

          {/* Genre row */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {genres.map((g) => {
              const active = selectedGenre === g
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`h-8 px-3 rounded-md text-[12.5px] border transition-colors ${
                    active
                      ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-surface)] border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {g}
                </button>
              )
            })}
          </div>

          {/* Mood row */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mr-1">
              Mood
            </span>
            {moods.map((mood) => {
              const active = selectedMood === mood
              return (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(active ? null : mood)}
                  className={`h-8 px-3 rounded-md text-[12.5px] border transition-colors ${
                    active
                      ? 'bg-[var(--color-accent-soft)] border-[var(--color-accent)] text-[var(--color-accent)]'
                      : 'bg-[var(--color-surface)] border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {mood}
                </button>
              )
            })}
          </div>

          {user && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[12.5px] border transition-colors ${
                  showFavoritesOnly
                    ? 'bg-[var(--color-accent-soft)] border-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'bg-[var(--color-surface)] border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-[var(--color-accent)]' : ''}`}
                />
                Favorites
                <span className="mono text-[11px] text-[var(--color-text-tertiary)]">
                  {favorites.length}
                </span>
              </button>
              <div className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[12.5px] text-[var(--color-text-secondary)]">
                <Music2 className="w-3.5 h-3.5" />
                Playlists
                <span className="mono text-[11px] text-[var(--color-text-tertiary)]">
                  {playlists.length}
                </span>
              </div>
            </div>
          )}
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
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                    Video Sync Tool
                  </span>
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    Free
                  </span>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)]">
                  Preview any track against your footage — before you license.
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
      <section className="pb-16">
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
            <h2 className="text-[14px] font-medium text-[var(--color-text-primary)]">
              {showFavoritesOnly ? 'Your favorites' : 'All tracks'}
            </h2>
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
              {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'}
            </span>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-16 text-center">
              <Music2 className="w-6 h-6 text-[var(--color-text-tertiary)] mx-auto mb-3" />
              <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] mb-1">
                {showFavoritesOnly ? 'No favorites yet' : 'No tracks found'}
              </h3>
              <p className="text-[13px] text-[var(--color-text-secondary)]">
                {showFavoritesOnly
                  ? 'Start adding tracks to your favorites.'
                  : 'Try adjusting your search or filters.'}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] divide-y divide-[var(--color-border-subtle)] overflow-hidden">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  className="group flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors"
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
                  </div>

                  <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                    {track.genre.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded border border-[var(--color-border-subtle)] text-[11px] text-[var(--color-text-secondary)]"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                    <span className="mono text-[11px] text-[var(--color-text-tertiary)]">
                      {track.bpm} BPM
                    </span>
                    <span className="mono text-[11px] text-[var(--color-text-tertiary)]">
                      {track.key}
                    </span>
                  </div>

                  <span className="mono text-[11px] text-[var(--color-text-tertiary)] flex-shrink-0">
                    {formatDuration(track.duration)}
                  </span>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <FavoriteButton trackId={track.id} />
                    <AddToPlaylistButton trackId={track.id} />
                  </div>
                </div>
              ))}
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

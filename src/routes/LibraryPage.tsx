import { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import { skipToken } from '@reduxjs/toolkit/query'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import AuthModal from '@/components/ui/AuthModal'
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
  Link2,
  Disc3,
} from 'lucide-react'
import { useAppSelector } from '@/hooks/redux'
import {
  useGetFeaturedSongsQuery,
  useGetSongsQuery,
  useRequestDownloadMutation,
  useRequestLicenseMutation,
  useSearchSongsQuery,
} from '@/services/api'
import type { Track } from '@/types/api'

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

type TrackLike = { genre: string[]; mood: string[] }
const playlists = [
  {
    title: 'Brand Essentials',
    tracks: 142,
    cover:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Electronic', 'Tech', 'Corporate', 'Synthwave'].includes(g)) ||
      t.mood.some((m) => ['Modern', 'Innovative', 'Confident'].includes(m)),
  },
  {
    title: 'Cinematic Score',
    tracks: 96,
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Cinematic', 'Orchestral'].includes(g)) ||
      t.mood.some((m) => ['Epic', 'Dramatic', 'Powerful', 'Emotional'].includes(m)),
  },
  {
    title: 'Wellness & Calm',
    tracks: 78,
    cover:
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Ambient', 'Piano', 'Acoustic'].includes(g)) ||
      t.mood.some((m) => ['Calm', 'Peaceful', 'Reflective'].includes(m)),
  },
  {
    title: 'Confident Pop',
    tracks: 124,
    cover:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Pop', 'Funk'].includes(g)) ||
      t.mood.some((m) => ['Playful', 'Fun', 'Confident', 'Uplifting'].includes(m)),
  },
  {
    title: 'Now Trending',
    tracks: 64,
    cover:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Pop', 'Electronic', 'Synthwave'].includes(g)) ||
      t.mood.some((m) => ['Energetic', 'Uplifting'].includes(m)),
  },
  {
    title: 'Beauty Focused',
    tracks: 88,
    cover:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.mood.some((m) => ['Energetic', 'Confident', 'Uplifting', 'Playful'].includes(m)),
  },
  {
    title: 'Pharma Focused',
    tracks: 42,
    cover:
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Acoustic', 'Folk', 'Piano'].includes(g)) ||
      t.mood.some((m) => ['Warm', 'Authentic', 'Hopeful'].includes(m)),
  },
  {
    title: 'Vaporwave',
    tracks: 36,
    cover:
      'https://images.unsplash.com/photo-1487260211189-670c54da558d?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Synthwave', 'Electronic'].includes(g)),
  },
  {
    title: 'Editorial & Fashion',
    tracks: 54,
    cover:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Ambient', 'Electronic'].includes(g)) ||
      t.mood.some((m) => ['Modern', 'Reflective'].includes(m)),
  },
  {
    title: 'Comedy & Lifestyle',
    tracks: 47,
    cover:
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.genre.some((g) => ['Funk', 'Pop'].includes(g)) ||
      t.mood.some((m) => ['Playful', 'Fun'].includes(m)),
  },
  {
    title: 'Trailers',
    tracks: 31,
    cover:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop',
    match: (t: TrackLike) =>
      t.mood.some((m) => ['Epic', 'Dramatic', 'Powerful', 'Dark'].includes(m)),
  },
  {
    title: 'Creator\u2019s Picks',
    tracks: 119,
    cover:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop',
    match: (_t: TrackLike) => true,
  },
]

function waveformBars(seed: string, count = 140): number[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const rand = () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return ((h >>> 0) % 100000) / 100000
  }
  // Two octaves of pseudo-noise for a more organic, music-like envelope
  const slow: number[] = []
  const fast: number[] = []
  const slowPts = Math.max(6, Math.floor(count / 14))
  for (let i = 0; i <= slowPts; i++) slow.push(rand())
  for (let i = 0; i < count; i++) fast.push(rand())

  const bars: number[] = []
  for (let i = 0; i < count; i++) {
    const t = (i / (count - 1)) * slowPts
    const i0 = Math.floor(t)
    const i1 = Math.min(slowPts, i0 + 1)
    const f = t - i0
    const ef = f * f * (3 - 2 * f)
    const low = slow[i0] * (1 - ef) + slow[i1] * ef
    const hi = fast[i] * 0.55 + 0.45
    let v = low * 0.7 + hi * 0.3
    // Soft musical envelope (gentle attack/release, slight mid emphasis)
    const u = i / (count - 1)
    const attack = Math.min(1, u / 0.06)
    const release = Math.min(1, (1 - u) / 0.08)
    const env = Math.min(attack, release)
    v = v * (0.55 + 0.45 * env)
    bars.push(Math.max(0.06, Math.min(1, v)))
  }
  return bars
}

export default function LibraryPage() {
  const user = useAppSelector((state) => state.auth.user)
  const [searchQuery, setSearchQuery] = useState('')
  const [committedQuery, setCommittedQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const collectionResultsRef = useRef<HTMLDivElement | null>(null)
  const [authOpen, setAuthOpen] = useState(false)

  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [refLink, setRefLink] = useState('')
  const [spotifyModalOpen, setSpotifyModalOpen] = useState(false)
  const [spotifyQuery, setSpotifyQuery] = useState('')

  const refLinkValid =
    /(?:open\.spotify\.com|spotify:|youtube\.com|youtu\.be)/i.test(refLink.trim())

  const runReferenceSearch = (label: string) => {
    setSelectedCollection(null)
    setSearchQuery('')
    if (analyzeTimer.current) clearTimeout(analyzeTimer.current)
    setIsAnalyzing(true)
    analyzeTimer.current = setTimeout(() => {
      setCommittedQuery(label)
      setIsAnalyzing(false)
    }, 650)
  }

  const submitRefLink = () => {
    if (!refLinkValid) return
    const source = /youtu/i.test(refLink) ? 'YouTube' : 'Spotify'
    setLinkModalOpen(false)
    runReferenceSearch(`Tracks similar to your ${source} reference`)
    setRefLink('')
  }

  const submitSpotifySearch = () => {
    const q = spotifyQuery.trim()
    if (!q) return
    setSpotifyModalOpen(false)
    runReferenceSearch(`Tracks similar to "${q}"`)
    setSpotifyQuery('')
  }

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
    setSelectedCollection(null)
    setIsAnalyzing(true)
    analyzeTimer.current = setTimeout(() => {
      setCommittedQuery(q)
      setIsAnalyzing(false)
    }, 650)
  }

  const openCollection = (title: string) => {
    setSearchQuery('')
    setCommittedQuery('')
    setIsAnalyzing(false)
    if (analyzeTimer.current) clearTimeout(analyzeTimer.current)
    setSelectedCollection(title)
    requestAnimationFrame(() => {
      collectionResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const activeCollection = selectedCollection
    ? playlists.find((c) => c.title === selectedCollection) ?? null
    : null
  const [requestLicense, { isLoading: submittingLicense }] = useRequestLicenseMutation()
  const [requestDownload, { isLoading: requestingDownload }] = useRequestDownloadMutation()
  const { data: catalogData, isLoading: loadingCatalog } = useGetSongsQuery({
    page: 1,
    limit: 100,
  })
  const { data: featuredTracks = [] } = useGetFeaturedSongsQuery(undefined)
  const { data: searchData } = useSearchSongsQuery(
    committedQuery.trim()
      ? { q: committedQuery, page: 1, limit: 100 }
      : skipToken,
  )
  const allTracks = catalogData?.tracks ?? []
  const collectionTracks = activeCollection
    ? allTracks.filter((t) => activeCollection.match(t))
    : []
  const [syncOpen, setSyncOpen] = useState(false)
  const [syncFile, setSyncFile] = useState<File | null>(null)
  const [syncStage, setSyncStage] = useState<'idle' | 'analyzing' | 'ready'>('idle')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  type LicenseForm = {
    fullName: string
    agencyName: string
    media: string[]
    term: string
    territory: string
    territoryOther: string
    exclusivity: '' | 'non-exclusive' | 'exclusive'
    exclusivityCategory: string
    brand: string
  }
  const emptyLicenseForm: LicenseForm = {
    fullName: '',
    agencyName: '',
    media: [],
    term: '',
    territory: '',
    territoryOther: '',
    exclusivity: '',
    exclusivityCategory: '',
    brand: '',
  }
  const [licenseTrack, setLicenseTrack] = useState<Track | null>(null)
  const [licenseForm, setLicenseForm] = useState<LicenseForm>(emptyLicenseForm)
  const [licenseSubmitted, setLicenseSubmitted] = useState(false)
  const [licenseError, setLicenseError] = useState('')

  const [downloadOpen, setDownloadOpen] = useState(false)
  const [downloadTrack, setDownloadTrack] = useState<Track | null>(null)
  const [downloadMessage, setDownloadMessage] = useState('')
  const [downloadError, setDownloadError] = useState('')

  const openLicense = (track: Track) => {
    if (!user) {
      setAuthOpen(true)
      return
    }
    setLicenseTrack(track)
    setLicenseForm(emptyLicenseForm)
    setLicenseSubmitted(false)
    setLicenseError('')
  }
  const closeLicense = () => {
    setLicenseTrack(null)
    setLicenseSubmitted(false)
    setLicenseError('')
  }
  const handleLicenseSubmit = async () => {
    if (!licenseTrack || !user || !licenseValid) return

    setLicenseError('')

    try {
      await requestLicense({
        song: licenseTrack.id,
        fullName: licenseForm.fullName,
        email: user.email,
        companyName: licenseForm.agencyName,
        projectName: licenseForm.brand,
        usageType: licenseForm.media.join(', '),
        usageDescription: [
          `Term: ${licenseForm.term}`,
          `Territory: ${
            licenseForm.territory === 'Other'
              ? licenseForm.territoryOther
              : licenseForm.territory
          }`,
          `Exclusivity: ${
            licenseForm.exclusivity === 'exclusive'
              ? `Exclusive (${licenseForm.exclusivityCategory})`
              : 'Non-exclusive'
          }`,
        ].join(' | '),
      }).unwrap()

      setLicenseSubmitted(true)
    } catch (apiError: any) {
      setLicenseError(apiError?.data?.message ?? 'Unable to submit the license request')
    }
  }

  const handleDownload = async (track: Track) => {
    if (!user) {
      setAuthOpen(true)
      return
    }

    setDownloadTrack(track)
    setDownloadMessage('')
    setDownloadError('')
    setDownloadOpen(true)

    try {
      const download = await requestDownload(track.id).unwrap()
      setDownloadMessage('Your download is ready. It will open in a new tab.')
      window.open(download.downloadUrl, '_blank', 'noopener,noreferrer')
    } catch (apiError: any) {
      setDownloadError(apiError?.data?.message ?? 'Unable to prepare the download')
    }
  }

  const toggleMedia = (m: string) => {
    setLicenseForm((f) => ({
      ...f,
      media: f.media.includes(m) ? f.media.filter((x) => x !== m) : [...f.media, m],
    }))
  }
  const licenseValid =
    licenseForm.fullName.trim() !== '' &&
    licenseForm.agencyName.trim() !== '' &&
    licenseForm.media.length > 0 &&
    licenseForm.term !== '' &&
    licenseForm.territory !== '' &&
    (licenseForm.territory !== 'Other' || licenseForm.territoryOther.trim() !== '') &&
    licenseForm.exclusivity !== '' &&
    (licenseForm.exclusivity !== 'exclusive' ||
      licenseForm.exclusivityCategory.trim() !== '') &&
    licenseForm.brand.trim() !== ''

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
  const searchTracks = searchData?.tracks ?? []
  const searchSource = hasQuery ? searchTracks : allTracks
  const scored = searchSource.map((track) => ({
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
    const totalSeconds = Math.max(0, Math.floor(seconds || 0))
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className="min-h-screen text-[var(--color-text-primary)]">
      <Navigation />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        title="Sign in to access licenses and downloads"
      />

      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Library
          </span>
          <h1 className="h-display text-[44px] sm:text-[56px] md:text-[60px] mt-4">
            Find your track
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

          <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] sm:mr-1">
              Or match a reference
            </span>
            <button
              type="button"
              onClick={() => setLinkModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-md text-[12.5px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Link2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              Paste a Spotify or YouTube link
            </button>
            <button
              type="button"
              onClick={() => setSpotifyModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-md text-[12.5px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Disc3 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              Search a song on Spotify
            </button>
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


      {/* Collection results */}
      {activeCollection && !hasQuery && !isAnalyzing && (
        <section className="pb-24" ref={collectionResultsRef}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-[14px] font-medium text-[var(--color-text-primary)] flex items-center gap-2">
                <Music2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                {activeCollection.title}
                <span className="text-[12px] text-[var(--color-text-tertiary)] font-normal">
                  collection
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                  {collectionTracks.length}{' '}
                  {collectionTracks.length === 1 ? 'track' : 'tracks'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCollection(null)}
                  className="inline-flex items-center gap-1 text-[12px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  aria-label="Close collection"
                >
                  <X className="w-3.5 h-3.5" />
                  Close
                </button>
              </div>
            </div>

            {collectionTracks.length === 0 ? (
              <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-16 text-center">
                <Music2 className="w-6 h-6 text-[var(--color-text-tertiary)] mx-auto mb-3" />
                <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] mb-1">
                  No tracks in this collection yet
                </h3>
              </div>
            ) : (
              <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] divide-y divide-[var(--color-border-subtle)] overflow-hidden">
                {collectionTracks.map((track, i) => (
                  <div
                    key={`${activeCollection.title}-${track.id}`}
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
                    </div>

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
                        onClick={() => handleDownload(track)}
                        aria-label={`Download ${track.title}`}
                        title="Download preview"
                        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Download</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openLicense(track)}
                        aria-label={`License ${track.title}`}
                        title="License track"
                        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[12px] bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">License</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Results */}
      {(hasQuery || isAnalyzing) && (
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-[14px] font-medium text-[var(--color-text-primary)] flex items-center gap-2">
              AI matches
              <span className="text-[12px] text-[var(--color-text-tertiary)] font-normal">
                for "{committedQuery}"
              </span>
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
                      onClick={() => handleDownload(track)}
                      aria-label={`Download ${track.title}`}
                      title="Download preview"
                      className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Download</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openLicense(track)}
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
      )}

      {/* Featured collections */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-[15px] font-medium text-[var(--color-text-primary)]">
                Featured playlists & themes
              </h2>
              <p className="mt-1 text-[12.5px] text-[var(--color-text-tertiary)]">
                Hand-picked sets across moods, genres, and use cases.
              </p>
            </div>
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] hidden sm:block">
              {playlists.length} playlists
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {playlists.map((c) => (
              <button
                key={c.title}
                type="button"
                onClick={() => openCollection(c.title)}
                aria-pressed={selectedCollection === c.title}
                className={`group text-left rounded-md overflow-hidden transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] ${
                  selectedCollection === c.title ? 'ring-1 ring-[var(--color-accent)]' : ''
                }`}
              >
                <div className="relative aspect-square overflow-hidden rounded-md border border-[var(--color-border-subtle)]">
                  <img
                    src={c.cover}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5">
                    <div className="text-[12.5px] font-medium text-white leading-tight line-clamp-2">
                      {c.title}
                    </div>
                    <div className="mt-0.5 mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                      {c.tracks} tracks
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Staff Picks */}
        <div className="max-w-6xl mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-[15px] font-medium text-[var(--color-text-primary)]">
                Staff Picks
              </h2>
              <p className="mt-1 text-[12.5px] text-[var(--color-text-tertiary)]">
                Our favorite tracks right now — updated weekly.
              </p>
            </div>
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] hidden sm:block">
              Popular
            </span>
          </div>
          <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] divide-y divide-[var(--color-border-subtle)] overflow-hidden">
            {(featuredTracks.length > 0 ? featuredTracks : allTracks).slice(0, 7).map((track) => {
              const bars = waveformBars(track.id)
              return (
                <div
                  key={`staff-${track.id}`}
                  className="group grid grid-cols-[40px_minmax(120px,160px)_minmax(120px,1fr)_48px_auto] lg:grid-cols-[40px_minmax(130px,160px)_minmax(120px,1fr)_48px_minmax(0,150px)_auto] items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="relative">
                    <img
                      src={track.cover_url}
                      alt={track.title}
                      className="w-10 h-10 rounded-md object-cover border border-[var(--color-border-subtle)]"
                    />
                    <button
                      type="button"
                      aria-label={`Play ${track.title}`}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] transition-opacity rounded-md"
                    >
                      <Play className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>

                  <div className="min-w-0">
                    <div className="text-[13px] text-[var(--color-text-primary)] truncate">
                      {track.title}
                    </div>
                    <div className="text-[11.5px] text-[var(--color-text-tertiary)] truncate">
                      {track.artist}
                    </div>
                  </div>

                  <div className="hidden min-w-0 overflow-hidden md:block text-[var(--color-text-tertiary)]/70 group-hover:text-[var(--color-text-secondary)] transition-colors">
                    <svg
                      viewBox={`0 0 ${bars.length * 2} 40`}
                      preserveAspectRatio="none"
                      className="w-full h-8 block"
                      aria-hidden="true"
                    >
                      {bars.map((b, i) => {
                        const x = i * 2 + 1
                        const half = Math.max(0.6, b * 18)
                        return (
                          <line
                            key={i}
                            x1={x}
                            x2={x}
                            y1={20 - half}
                            y2={20 + half}
                            stroke="currentColor"
                            strokeWidth={1.1}
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                          />
                        )
                      })}
                    </svg>
                  </div>

                  <span className="mono block overflow-hidden text-right text-[11px] tabular-nums text-[var(--color-text-tertiary)]">
                    {formatDuration(track.duration)}
                  </span>

                  <div className="hidden lg:flex min-w-0 items-center gap-1.5 overflow-hidden">
                    {track.mood.slice(0, 2).map((m) => (
                      <span
                        key={m}
                        className="min-w-0 truncate px-2 py-0.5 rounded border border-[var(--color-border-subtle)] text-[10.5px] text-[var(--color-text-secondary)] whitespace-nowrap"
                        title={m}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDownload(track)}
                      aria-label={`Download ${track.title}`}
                      title="Download preview"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openLicense(track)}
                      aria-label={`License ${track.title}`}
                      title="License track"
                      className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-[12px] bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="hidden xl:inline">License</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
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

      {/* License modal */}
      {licenseTrack && (() => {
        const mediaOptions = [
          'TV', 'Paid social', 'Organic social', 'All Digital Media',
          'Radio', 'OOH', 'Website', 'Streaming', 'Podcasts',
          'In-store', 'Live events', 'Internal use',
        ]
        const terms = ['3 months', '6 months', '1 year', '2 years', 'Perpetuity']
        const territories = ['U.S.', 'Worldwide', 'Other']
        const chipBase =
          'inline-flex items-center h-7 px-2.5 rounded-md text-[12px] border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)]'
        const chipOff =
          'border-[var(--color-border-subtle)] bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)]'
        const chipOn =
          'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text-primary)]'
        const labelCls =
          'mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-2'
        const sectionCls = 'mb-5'
        const inputCls =
          'w-full h-9 px-3 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)]'
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="license-title"
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeLicense}
              aria-hidden="true"
            />
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-subtle)] flex-shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  </div>
                  <div className="min-w-0">
                    <h2
                      id="license-title"
                      className="text-[14px] font-medium text-[var(--color-text-primary)] truncate"
                    >
                      License "{licenseTrack.title}"
                    </h2>
                    <p className="text-[11.5px] text-[var(--color-text-tertiary)]">
                      Tell us how you plan to use the track — we'll get back with a quote.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeLicense}
                  aria-label="Close"
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {licenseSubmitted ? (
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-[var(--color-border-default)] bg-[var(--color-accent-soft)] flex items-center justify-center mb-4">
                    <Check className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <div className="text-[14px] text-[var(--color-text-primary)]">
                    Request received
                  </div>
                  <p className="mt-1.5 text-[12.5px] text-[var(--color-text-secondary)] max-w-sm">
                    A licensing specialist will reach out within one business day with a quote tailored to your use.
                  </p>
                  <div className="mt-5">
                    <Button size="sm" onClick={closeLicense}>Done</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-y-auto px-5 py-5 flex-1">
                    {/* Your details */}
                    <div className={sectionCls}>
                      <div className={labelCls}>Your details</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={licenseForm.fullName}
                          onChange={(e) =>
                            setLicenseForm((f) => ({ ...f, fullName: e.target.value }))
                          }
                          placeholder="Full name"
                          className={inputCls}
                        />
                        <input
                          type="text"
                          value={licenseForm.agencyName}
                          onChange={(e) =>
                            setLicenseForm((f) => ({ ...f, agencyName: e.target.value }))
                          }
                          placeholder="Agency name"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Media / platforms */}
                    <div className={sectionCls}>
                      <div className={labelCls}>Media / platforms <span className="lowercase tracking-normal text-[var(--color-text-tertiary)]">(select all that apply)</span></div>
                      <div className="flex flex-wrap gap-1.5">
                        {mediaOptions.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => toggleMedia(m)}
                            className={`${chipBase} ${licenseForm.media.includes(m) ? chipOn : chipOff}`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Term length */}
                    <div className={sectionCls}>
                      <div className={labelCls}>Term length</div>
                      <div className="flex flex-wrap gap-1.5">
                        {terms.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setLicenseForm((f) => ({ ...f, term: t }))}
                            className={`${chipBase} ${licenseForm.term === t ? chipOn : chipOff}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Territory */}
                    <div className={sectionCls}>
                      <div className={labelCls}>Territory</div>
                      <div className="flex flex-wrap gap-1.5">
                        {territories.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setLicenseForm((f) => ({ ...f, territory: t }))}
                            className={`${chipBase} ${licenseForm.territory === t ? chipOn : chipOff}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {licenseForm.territory === 'Other' && (
                        <input
                          type="text"
                          value={licenseForm.territoryOther}
                          onChange={(e) =>
                            setLicenseForm((f) => ({ ...f, territoryOther: e.target.value }))
                          }
                          placeholder="Specify countries or regions"
                          className={`${inputCls} mt-2`}
                        />
                      )}
                    </div>

                    {/* Exclusivity */}
                    <div className={sectionCls}>
                      <div className={labelCls}>Exclusivity</div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { v: 'non-exclusive', l: 'Non-exclusive' },
                          { v: 'exclusive', l: 'Exclusive' },
                        ].map((o) => (
                          <button
                            key={o.v}
                            type="button"
                            onClick={() =>
                              setLicenseForm((f) => ({
                                ...f,
                                exclusivity: o.v as LicenseForm['exclusivity'],
                              }))
                            }
                            className={`${chipBase} ${licenseForm.exclusivity === o.v ? chipOn : chipOff}`}
                          >
                            {o.l}
                          </button>
                        ))}
                      </div>
                      {licenseForm.exclusivity === 'exclusive' && (
                        <input
                          type="text"
                          value={licenseForm.exclusivityCategory}
                          onChange={(e) =>
                            setLicenseForm((f) => ({
                              ...f,
                              exclusivityCategory: e.target.value,
                            }))
                          }
                          placeholder="Exclusive category (e.g. financial services, pharma, automotive)"
                          className={`${inputCls} mt-2`}
                        />
                      )}
                    </div>

                    {/* Brand / client */}
                    <div className="mb-1">
                      <div className={labelCls}>Brand / client</div>
                      <input
                        type="text"
                        value={licenseForm.brand}
                        onChange={(e) =>
                          setLicenseForm((f) => ({ ...f, brand: e.target.value }))
                        }
                        placeholder="Advertiser or company name"
                        className={inputCls}
                      />
                    </div>
                    {licenseError ? (
                      <p className="mt-3 text-[12px] text-red-400">{licenseError}</p>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[var(--color-border-subtle)] flex-shrink-0">
                    <button
                      type="button"
                      onClick={closeLicense}
                      className="text-[12.5px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      Cancel
                    </button>
                    <Button
                      size="sm"
                      disabled={!licenseValid || submittingLicense}
                      onClick={handleLicenseSubmit}
                    >
                      {submittingLicense ? 'Submitting…' : 'Submit request'}
                      {submittingLicense ? null : (
                        <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })()}

      {/* Paste link modal */}
      {linkModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="link-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setLinkModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)] flex items-center justify-center flex-shrink-0">
                  <Link2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                </div>
                <div className="min-w-0">
                  <h2 id="link-title" className="text-[14px] font-medium text-[var(--color-text-primary)]">
                    Match a reference link
                  </h2>
                  <p className="text-[11.5px] text-[var(--color-text-tertiary)]">
                    Paste a Spotify or YouTube link to find similar tracks.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                aria-label="Close"
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitRefLink()
              }}
              className="px-5 py-5"
            >
              <input
                type="text"
                autoFocus
                value={refLink}
                onChange={(e) => setRefLink(e.target.value)}
                placeholder="https://open.spotify.com/track/…  or  https://youtu.be/…"
                className="w-full h-10 px-3 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)]"
              />
              {refLink.trim() && !refLinkValid && (
                <p className="mt-2 text-[11.5px] text-[var(--color-text-tertiary)]">
                  Enter a valid Spotify or YouTube link.
                </p>
              )}
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLinkModalOpen(false)}
                  className="text-[12.5px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Cancel
                </button>
                <Button type="submit" size="sm" disabled={!refLinkValid}>
                  Find similar
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Spotify modal */}
      {spotifyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="spotify-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSpotifyModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-md border border-[var(--color-border-default)] bg-[var(--color-background)] flex items-center justify-center flex-shrink-0">
                  <Disc3 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                </div>
                <div className="min-w-0">
                  <h2 id="spotify-title" className="text-[14px] font-medium text-[var(--color-text-primary)]">
                    Search a song on Spotify
                  </h2>
                  <p className="text-[11.5px] text-[var(--color-text-tertiary)]">
                    Find any track, then discover similar music in our library.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSpotifyModalOpen(false)}
                aria-label="Close"
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitSpotifySearch()
              }}
              className="px-5 py-5"
            >
              <div className="flex items-center gap-2 h-10 px-3 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-background)] focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent-ring)] transition-colors">
                <Search className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] flex-shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={spotifyQuery}
                  onChange={(e) => setSpotifyQuery(e.target.value)}
                  placeholder="Song or artist name…"
                  className="flex-1 bg-transparent text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none"
                />
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSpotifyModalOpen(false)}
                  className="text-[12.5px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Cancel
                </button>
                <Button type="submit" size="sm" disabled={!spotifyQuery.trim()}>
                  Find similar
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {downloadOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDownloadOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] shadow-2xl">
            <button
              type="button"
              onClick={() => setDownloadOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-ring)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full border border-[var(--color-border-default)] bg-[var(--color-accent-soft)] flex items-center justify-center mb-4">
                <Download className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <h2
                id="download-title"
                className="text-[15px] font-medium text-[var(--color-text-primary)]"
              >
                {requestingDownload
                  ? 'Preparing your download…'
                  : downloadTrack
                    ? `Download "${downloadTrack.title}"`
                    : 'Download track'}
              </h2>
              <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed max-w-xs">
                {downloadError
                  ? downloadError
                  : downloadMessage || 'We are requesting the download from the backend now.'}
              </p>
              <div className="mt-6 flex items-center gap-2.5">
                {downloadError ? (
                  <Link
                    href="/pricing"
                    onClick={() => setDownloadOpen(false)}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md text-[13px] font-medium bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
                  >
                    View pricing
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => setDownloadOpen(false)}
                  className="inline-flex items-center h-9 px-4 rounded-md text-[13px] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-default)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}


import { useState } from 'react'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import { Search, Play, Clock, Music2, Filter, Heart } from 'lucide-react'
import { mockTracks } from '@/lib/mockTracks'
import FavoriteButton from '@/components/ui/FavoriteButton'
import AddToPlaylistButton from '@/components/ui/AddToPlaylistButton'
import { useFavorites } from '@/hooks/useFavorites'
import { usePlaylists } from '@/hooks/usePlaylists'
import { useAuth } from '@/contexts/AuthContext'

const moods = ['Energetic', 'Calm', 'Uplifting', 'Dark', 'Emotional', 'Confident', 'Playful', 'Dramatic']

export default function LibraryPage() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const { playlists } = usePlaylists()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const filteredTracks = mockTracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesMood = !selectedMood || track.mood.includes(selectedMood)
    
    const matchesFavorites = !showFavoritesOnly || favorites.some(fav => fav.track_id === track.id)
    
    return matchesSearch && matchesMood && matchesFavorites
  })

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-electric-purple/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-[48px] md:text-[64px] mb-6 text-white leading-[1.1]">
              Browse Music
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Talk to our AI like you would talk to a music supervisor
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-electric-blue" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try: 'Confident but not aggressive for a tech startup...'"
                className="w-full pl-16 pr-32 py-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 text-white placeholder-white/40 text-lg focus:outline-none focus:border-electric-blue/50 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-electric-blue to-electric-purple rounded-xl text-white font-medium hover:shadow-lg hover:shadow-electric-blue/30 transition-all">
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                className={`px-6 py-2.5 rounded-full border transition-all ${
                  selectedMood === mood
                    ? 'bg-electric-blue/20 border-electric-blue/50 text-electric-blue'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white/80'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>

          {user && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all ${
                  showFavoritesOnly
                    ? 'bg-red-500/20 border-red-500/50 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-red-400' : ''}`} />
                My Favorites ({favorites.length})
              </button>

              <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                <Music2 className="w-4 h-4" />
                {playlists.length} Playlists
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative p-6 bg-gradient-to-r from-electric-blue/10 to-electric-purple/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-electric-purple rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Video Sync Tool</h3>
                  <p className="text-sm text-white/60">Preview tracks against your footage</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all">
                Try It Free
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-white">
              {showFavoritesOnly ? 'Your Favorites' : 'All Tracks'}
              <span className="ml-3 text-white/40 font-normal text-lg">
                {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'}
              </span>
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white/80 hover:border-white/20 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="text-center py-20">
              <Music2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">
                {showFavoritesOnly ? 'No favorites yet' : 'No tracks found'}
              </h3>
              <p className="text-white/40">
                {showFavoritesOnly 
                  ? 'Start adding tracks to your favorites!' 
                  : 'Try adjusting your search or filters'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTracks.map((track) => (
                <div key={track.id} className="group relative">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-electric-blue/20 to-electric-purple/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                  <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 group-hover:border-white/20 transition-all flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={track.cover_url}
                        alt={track.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <Play className="w-6 h-6 text-white-white" />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1 truncate">{track.title}</h3>
                      <p className="text-sm text-white/60 truncate">{track.artist}</p>
                    </div>

                    <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                      {track.genre.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4 text-sm text-white/60 flex-shrink-0">
                      <span>{track.bpm} BPM</span>
                      <span>{track.key}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white/60 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{formatDuration(track.duration)}</span>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <FavoriteButton trackId={track.id} />
                      <AddToPlaylistButton trackId={track.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

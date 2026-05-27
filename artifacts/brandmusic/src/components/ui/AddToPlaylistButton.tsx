
import { useState } from 'react'
import { ListPlus, Plus, Check } from 'lucide-react'
import { usePlaylists } from '@/hooks/usePlaylists'
import { useAuth } from '@/contexts/AuthContext'

interface AddToPlaylistButtonProps {
  trackId: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function AddToPlaylistButton({ trackId, size = 'md', className = '' }: AddToPlaylistButtonProps) {
  const { user } = useAuth()
  const { playlists, createPlaylist, addTrackToPlaylist } = usePlaylists()
  const [showMenu, setShowMenu] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [creatingPlaylist, setCreatingPlaylist] = useState(false)
  const [addedToPlaylists, setAddedToPlaylists] = useState<Set<string>>(new Set())

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleAddToPlaylist = async (playlistId: string) => {
    if (!user) return

    const { error } = await addTrackToPlaylist(playlistId, trackId)
    
    if (!error) {
      setAddedToPlaylists(prev => new Set(prev).add(playlistId))
      setTimeout(() => {
        setAddedToPlaylists(prev => {
          const next = new Set(prev)
          next.delete(playlistId)
          return next
        })
      }, 2000)
    }
  }

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPlaylistName.trim() || !user) return

    setCreatingPlaylist(true)
    const { data, error } = await createPlaylist(newPlaylistName)
    
    if (!error && data) {
      await addTrackToPlaylist(data.id, trackId)
      setNewPlaylistName('')
      setAddedToPlaylists(prev => new Set(prev).add(data.id))
      setTimeout(() => {
        setAddedToPlaylists(prev => {
          const next = new Set(prev)
          next.delete(data.id)
          return next
        })
      }, 2000)
    }
    setCreatingPlaylist(false)
  }

  if (!user) {
    return (
      <button
        onClick={() => window.location.href = '/login'}
        className={`group relative transition-all ${className}`}
        aria-label="Add to playlist"
      >
        <ListPlus className={`${sizes[size]} text-white/40 group-hover:text-electric-blue group-hover:scale-110 transition-all`} />
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`group relative transition-all ${className}`}
        aria-label="Add to playlist"
      >
        <ListPlus className={`${sizes[size]} text-white/40 group-hover:text-electric-blue group-hover:scale-110 transition-all`} />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Create new playlist */}
            <form onSubmit={handleCreatePlaylist} className="p-3 border-b border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="New playlist name"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/50"
                />
                <button
                  type="submit"
                  disabled={!newPlaylistName.trim() || creatingPlaylist}
                  className="px-3 py-2 bg-electric-blue/20 hover:bg-electric-blue/30 border border-electric-blue/30 rounded text-electric-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Existing playlists */}
            <div className="max-h-64 overflow-y-auto">
              {playlists.length === 0 ? (
                <div className="p-4 text-center text-white/40 text-sm">
                  No playlists yet. Create one above!
                </div>
              ) : (
                playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center justify-between group"
                  >
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                      {playlist.name}
                    </span>
                    {addedToPlaylists.has(playlist.id) && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

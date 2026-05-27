
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Playlist, PlaylistTrack } from '@/types/database.types'

export function usePlaylists() {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchPlaylists()
    } else {
      setPlaylists([])
      setLoading(false)
    }
  }, [user])

  const fetchPlaylists = async () => {
    if (!user) return

    setLoading(true)
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching playlists:', error)
    } else {
      setPlaylists(data || [])
    }
    setLoading(false)
  }

  const createPlaylist = async (name: string, description?: string, isPublic: boolean = false) => {
    if (!user) return { error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('playlists')
      .insert({
        user_id: user.id,
        name,
        description,
        is_public: isPublic,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating playlist:', error)
      return { error }
    }

    setPlaylists(prev => [data, ...prev])
    return { data }
  }

  const updatePlaylist = async (playlistId: string, updates: Partial<Playlist>) => {
    if (!user) return { error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('playlists')
      .update(updates)
      .eq('id', playlistId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating playlist:', error)
      return { error }
    }

    setPlaylists(prev => prev.map(p => p.id === playlistId ? data : p))
    return { data }
  }

  const deletePlaylist = async (playlistId: string) => {
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', playlistId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting playlist:', error)
      return { error }
    }

    setPlaylists(prev => prev.filter(p => p.id !== playlistId))
    return { error: null }
  }

  const addTrackToPlaylist = async (playlistId: string, trackId: string) => {
    if (!user) return { error: 'Not authenticated' }

    // Get current max position
    const { data: tracks } = await supabase
      .from('playlist_tracks')
      .select('position')
      .eq('playlist_id', playlistId)
      .order('position', { ascending: false })
      .limit(1)

    const nextPosition = tracks && tracks.length > 0 ? tracks[0].position + 1 : 0

    const { data, error } = await supabase
      .from('playlist_tracks')
      .insert({
        playlist_id: playlistId,
        track_id: trackId,
        position: nextPosition,
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding track to playlist:', error)
      return { error }
    }

    return { data }
  }

  const removeTrackFromPlaylist = async (playlistId: string, trackId: string) => {
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
      .from('playlist_tracks')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('track_id', trackId)

    if (error) {
      console.error('Error removing track from playlist:', error)
      return { error }
    }

    return { error: null }
  }

  const getPlaylistTracks = async (playlistId: string) => {
    const { data, error } = await supabase
      .from('playlist_tracks')
      .select('*')
      .eq('playlist_id', playlistId)
      .order('position', { ascending: true })

    if (error) {
      console.error('Error fetching playlist tracks:', error)
      return { error, data: null }
    }

    return { data, error: null }
  }

  return {
    playlists,
    loading,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    getPlaylistTracks,
    refetch: fetchPlaylists,
  }
}

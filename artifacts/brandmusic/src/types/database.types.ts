
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Favorite } from '@/types/database.types'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchFavorites()
    } else {
      setFavorites([])
      setLoading(false)
    }
  }, [user])

  const fetchFavorites = async () => {
    if (!user) return

    setLoading(true)
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching favorites:', error)
    } else {
      setFavorites(data || [])
    }
    setLoading(false)
  }

  const isFavorite = (trackId: string) => {
    return favorites.some(fav => fav.track_id === trackId)
  }

  const addFavorite = async (trackId: string) => {
    if (!user) return { error: 'Not authenticated' }

    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, track_id: trackId })
      .select()
      .single()

    if (error) {
      console.error('Error adding favorite:', error)
      return { error }
    }

    setFavorites(prev => [data, ...prev])
    return { data }
  }

  const removeFavorite = async (trackId: string) => {
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('track_id', trackId)

    if (error) {
      console.error('Error removing favorite:', error)
      return { error }
    }

    setFavorites(prev => prev.filter(fav => fav.track_id !== trackId))
    return { error: null }
  }

  const toggleFavorite = async (trackId: string) => {
    if (isFavorite(trackId)) {
      return await removeFavorite(trackId)
    } else {
      return await addFavorite(trackId)
    }
  }

  return {
    favorites,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    refetch: fetchFavorites,
  }
}

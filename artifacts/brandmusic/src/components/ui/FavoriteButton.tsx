
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { useAuth } from '@/contexts/AuthContext'

interface FavoriteButtonProps {
  trackId: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function FavoriteButton({ trackId, size = 'md', className = '' }: FavoriteButtonProps) {
  const { user } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [loading, setLoading] = useState(false)
  const favorite = isFavorite(trackId)

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!user) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    setLoading(true)
    await toggleFavorite(trackId)
    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`group relative transition-all ${className}`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`${sizes[size]} transition-all ${
          favorite
            ? 'fill-red-500 text-red-500'
            : 'text-white/40 group-hover:text-red-500 group-hover:scale-110'
        } ${loading ? 'opacity-50' : ''}`}
      />
    </button>
  )
}

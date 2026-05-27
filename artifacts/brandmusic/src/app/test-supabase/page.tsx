
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [tracks, setTracks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTracks() {
      try {
        const { data, error } = await supabase
          .from('tracks')
          .select('*')
          .limit(5)

        if (error) throw error

        setTracks(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

  if (loading) return <div className="p-8 text-white">Loading...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Supabase Connection Test</h1>
      
      <div className="mb-4 text-white">
        <strong>Connection Status:</strong> Connected!
      </div>
      
      <div className="mb-4 text-white">
        <strong>Tracks Found:</strong> {tracks.length}
      </div>

      {tracks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Tracks:</h2>
          {tracks.map((track) => (
            <div key={track.id} className="p-4 bg-surface-elevated rounded border border-white/10">
              <div className="text-white"><strong>Title:</strong> {track.title}</div>
              <div className="text-text-secondary"><strong>Artist:</strong> {track.artist}</div>
              <div className="text-text-secondary"><strong>Genre:</strong> {track.genre}</div>
              <div className="text-text-secondary"><strong>Mood:</strong> {track.mood}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

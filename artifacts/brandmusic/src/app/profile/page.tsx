
import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { User, Mail, Calendar, Music2, Heart, LogOut, Trash2, Edit2 } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { usePlaylists } from '@/hooks/usePlaylists'
import { Profile } from '@/types/database.types'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const [, setLocation] = useLocation()
  const { favorites } = useFavorites()
  const { playlists, deletePlaylist } = usePlaylists()
  
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      setLocation('/login')
      return
    }
    
    fetchProfile()
  }, [user, router])

  const fetchProfile = async () => {
    if (!user) return

    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
    } else {
      setProfile(data)
      setFullName(data.full_name || '')
    }
    setLoading(false)
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq('id', user.id)

    if (error) {
      setError(error.message)
    } else {
      await fetchProfile()
      setEditing(false)
    }
    setSaving(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setLocation('/')
  }

  const handleDeletePlaylist = async (playlistId: string) => {
    if (!confirm('Are you sure you want to delete this playlist?')) return
    await deletePlaylist(playlistId)
  }

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#0A0A0A]">
        <Navigation />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="text-white/60">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-electric-purple/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display font-bold text-[48px] md:text-[64px] mb-6 text-white leading-[1.1]">
              Your Profile
            </h1>
            <p className="text-xl text-white/60">
              Manage your account and preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan rounded-3xl blur-2xl opacity-10" />
                <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="font-display font-bold text-2xl text-white">Account Information</h2>
                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {editing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-electric-blue/50 transition-colors"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={saving}
                          className="bg-gradient-to-r from-electric-blue to-electric-purple"
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditing(false)
                            setFullName(profile?.full_name || '')
                            setError('')
                          }}
                          className="border-white/20"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <User className="w-5 h-5 text-electric-blue" />
                        <div>
                          <div className="text-sm text-white/60">Full Name</div>
                          <div className="text-white font-medium">{profile?.full_name || 'Not set'}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <Mail className="w-5 h-5 text-electric-blue" />
                        <div>
                          <div className="text-sm text-white/60">Email</div>
                          <div className="text-white font-medium">{user.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <Calendar className="w-5 h-5 text-electric-blue" />
                        <div>
                          <div className="text-sm text-white/60">Member Since</div>
                          <div className="text-white font-medium">
                            {new Date(profile?.created_at || '').toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-electric-blue to-electric-purple rounded-3xl blur-2xl opacity-10" />
                <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20">
                  <h3 className="font-display font-bold text-xl text-white mb-6">Your Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-white/80">Favorites</span>
                      </div>
                      <span className="font-bold text-white">{favorites.length}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <Music2 className="w-5 h-5 text-electric-blue" />
                        <span className="text-white/80">Playlists</span>
                      </div>
                      <span className="font-bold text-white">{playlists.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Playlists Section */}
          {playlists.length > 0 && (
            <div className="mt-12">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-electric-purple via-electric-blue to-electric-cyan rounded-3xl blur-2xl opacity-10" />
                <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20">
                  <h2 className="font-display font-bold text-2xl text-white mb-6">Your Playlists</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className="group relative p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{playlist.name}</h3>
                            {playlist.description && (
                              <p className="text-sm text-white/60 line-clamp-2">{playlist.description}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeletePlaylist(playlist.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <Music2 className="w-3 h-3" />
                          <span>Created {new Date(playlist.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export interface Track {
  id: string
  title: string
  artist: string
  duration: number
  bpm: number
  key: string
  genre: string[]
  mood: string[]
  energy: number
  cover_url: string
  audio_url: string
  downloadable: boolean
  slug?: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  songCount: number
  isPublic: boolean
  createdAt?: string
  updatedAt?: string
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store'
import { signOut } from '@/features/auth/authSlice'
import type { Playlist, Track } from '@/types/api'

const API_ROOT = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1'

type BackendSong = {
  _id: string
  title: string
  artist: string
  duration?: number
  bpm?: number
  key?: string
  genre?: string
  mood?: string
  coverImageUrl?: string
  previewAudioUrl?: string
  watermarkedAudioUrl?: string
  originalAudioUrl?: string
  isDownloadable?: boolean
  slug?: string
}

type BackendPlaylist = {
  _id: string
  name: string
  description?: string
  songs?: string[]
  isPublic?: boolean
  createdAt?: string
  updatedAt?: string
}

const toTrack = (song: BackendSong): Track => ({
  id: song._id,
  title: song.title,
  artist: song.artist,
  duration: song.duration ?? 0,
  bpm: song.bpm ?? 0,
  key: song.key ?? '—',
  genre: song.genre ? [song.genre] : [],
  mood: song.mood ? [song.mood] : [],
  energy: 0.6,
  cover_url:
    song.coverImageUrl ??
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
  audio_url:
    song.previewAudioUrl ??
    song.watermarkedAudioUrl ??
    song.originalAudioUrl ??
    '',
  downloadable: Boolean(song.isDownloadable),
  slug: song.slug,
})

const toPlaylist = (playlist: BackendPlaylist): Playlist => ({
  id: playlist._id,
  name: playlist.name,
  description: playlist.description ?? '',
  songCount: playlist.songs?.length ?? 0,
  isPublic: Boolean(playlist.isPublic),
  createdAt: playlist.createdAt,
  updatedAt: playlist.updatedAt,
})

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_ROOT,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQuery = async (args: Parameters<typeof rawBaseQuery>[0], api: Parameters<typeof rawBaseQuery>[1], extraOptions: Parameters<typeof rawBaseQuery>[2]) => {
  const result = await rawBaseQuery(args, api, extraOptions)
  if (result.error?.status === 401) {
    api.dispatch(signOut())
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Song', 'Playlist', 'Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { user: { _id: string; name: string; email: string; role: 'USER' | 'ADMIN' }; accessToken: string; refreshToken: string } }) => response.data,
    }),
    register: builder.mutation({
      query: (body: { name: string; email: string; password: string; phone?: string }) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: { user: { _id: string; name: string; email: string; role: 'USER' | 'ADMIN' }; accessToken: string; refreshToken: string } }) => response.data,
    }),
    getSongs: builder.query({
      query: (params: { page?: number; limit?: number; search?: string; isFeatured?: boolean } = {}) => ({
        url: '/songs',
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 100,
          search: params.search || undefined,
          isFeatured:
            params.isFeatured === undefined ? undefined : params.isFeatured,
        },
      }),
      transformResponse: (response: { data: BackendSong[]; meta?: Record<string, unknown> }) => ({
        tracks: response.data.map(toTrack),
        meta: response.meta ?? {},
      }),
      providesTags: ['Song'],
    }),
    getFeaturedSongs: builder.query({
      query: () => '/songs/featured',
      transformResponse: (response: { data: { songs: BackendSong[] } }) =>
        response.data.songs.map(toTrack),
      providesTags: ['Song'],
    }),
    searchSongs: builder.query({
      query: ({ q, page = 1, limit = 100 }: { q: string; page?: number; limit?: number }) => ({
        url: '/songs/search',
        params: { q, page, limit },
      }),
      transformResponse: (response: { data: BackendSong[]; meta?: Record<string, unknown> }) => ({
        tracks: response.data.map(toTrack),
        meta: response.meta ?? {},
      }),
      providesTags: ['Song'],
    }),
    requestLicense: builder.mutation({
      query: (body: {
        song: string
        fullName: string
        email: string
        companyName?: string
        projectName?: string
        usageType: string
        usageDescription?: string
        budget?: number
        message?: string
      }) => ({
        url: '/licensing/requests',
        method: 'POST',
        body,
      }),
    }),
    requestDownload: builder.mutation({
      query: (songId: string) => ({
        url: `/downloads/songs/${songId}`,
        method: 'POST',
      }),
      transformResponse: (response: { data: { downloadUrl: string; fileType: string; expiresIn: number } }) => response.data,
    }),
    getMyPlaylists: builder.query({
      query: () => '/playlists/my',
      transformResponse: (response: { data: { playlists: BackendPlaylist[] } }) =>
        response.data.playlists.map(toPlaylist),
      providesTags: ['Playlist'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetSongsQuery,
  useGetFeaturedSongsQuery,
  useSearchSongsQuery,
  useRequestLicenseMutation,
  useRequestDownloadMutation,
  useGetMyPlaylistsQuery,
} = api

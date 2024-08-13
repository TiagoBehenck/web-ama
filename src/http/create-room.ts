import { api } from '@/lib/axios'

export type CreateRoomRequest = {
  theme: string
}

export async function createRoom({ theme }: CreateRoomRequest) {
  const { data } = await api.post<{ id: string }>('/rooms', { theme })

  return { roomId: data.id }
}

import { api } from '@/lib/axios'

export type CreateMessageRequest = {
  roomId: string
  message: string
}

export async function createMessage({ roomId, message }: CreateMessageRequest) {
  const { data } = await api.post(`/rooms/${roomId}/messages`, {
    message,
  })

  return { messageId: data.id }
}

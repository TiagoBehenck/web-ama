import { api } from '@/lib/axios'

export type CreateMessageReactionParams = {
  roomId: string
  messageId: string
}

export async function createMessageReaction({
  roomId,
  messageId,
}: CreateMessageReactionParams) {
  await api.patch(`/rooms/${roomId}/messages/${messageId}/react`)
}

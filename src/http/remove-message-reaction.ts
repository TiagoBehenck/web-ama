import { api } from '@/lib/axios'

export type RemoveMessageReactionRequest = {
  roomId: string
  messageId: string
}

export async function removeMessageReaction({
  roomId,
  messageId,
}: RemoveMessageReactionRequest) {
  await api.delete(`/rooms/${roomId}/messages/${messageId}/react`)
}

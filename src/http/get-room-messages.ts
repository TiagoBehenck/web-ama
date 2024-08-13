import { api } from '@/lib/axios'

export type GetRoomMessagesAPIResponse = {
  id: string
  message: string
  reactionCount: number
  answered: boolean
}[]

export type GetRoomMessagesRequest = {
  roomId: string
}

export type GetRoomMessagesResponse = {
  messages: {
    id: string
    text: string
    amountOfReactions: number
    answered: boolean
  }[]
}

// a27a90f8-e482-4371-b880-0e2cd002c489
export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const { data } = await api.get<GetRoomMessagesAPIResponse>(
    `/rooms/${roomId}/messages`,
  )

  return {
    messages: data.map((message) => ({
      id: message.id,
      text: message.message,
      amountOfReactions: message.reactionCount,
      answered: message.answered,
    })),
  }
}

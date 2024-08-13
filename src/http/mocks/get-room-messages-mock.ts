import { http, HttpResponse } from 'msw'

import type {
  GetRoomMessagesAPIResponse,
  GetRoomMessagesRequest,
} from '../get-room-messages'

export const getRoomMessagesMock = http.get<
  GetRoomMessagesRequest,
  never,
  GetRoomMessagesAPIResponse
>('/rooms/:roomId/messages', ({ params }) => {
  return HttpResponse.json([
    {
      answered: false,
      id: 'a27a90f8-e482-4371-b880-0e2cd002c489',
      message: `Room ID >>>> ${params.roomId}`,
      reactionCount: 0,
    },
  ])
})

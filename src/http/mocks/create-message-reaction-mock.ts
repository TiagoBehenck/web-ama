import { http, HttpResponse } from 'msw'
import type { CreateMessageReactionParams } from '../create-message-reaction'

export const createMessageReactionMock =
  http.patch<CreateMessageReactionParams>(
    '/rooms/:roomId/messages/:messageId/react',
    () => {
      return HttpResponse.json({
        count: 1,
      })
    },
  )

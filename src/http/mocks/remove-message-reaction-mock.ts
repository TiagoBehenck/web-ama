import { http, HttpResponse } from 'msw'
import type { RemoveMessageReactionRequest } from '../remove-message-reaction'

export const removeMessageReactionMock =
  http.delete<RemoveMessageReactionRequest>(
    '/rooms/:roomId/messages/:messageId/react',
    () => {
      return HttpResponse.json({
        count: 0,
      })
    },
  )

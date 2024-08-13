import { http, HttpResponse } from 'msw'
import type { CreateMessageRequest } from '../create-message'

export const createMessageMock = http.post<never, CreateMessageRequest>(
  '/rooms/:roomId/messages',
  async ({ request }) => {
    const { message } = await request.json()

    if (message.length > 0) {
      return HttpResponse.json(
        {
          id: 'ba9a68e3-dc84-45a8-b943-b3195b7d3306',
        },
        { status: 200 },
      )
    }

    return new HttpResponse(null, { status: 400 })
  },
)

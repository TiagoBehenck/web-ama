import { http, HttpResponse } from 'msw'

import type { CreateRoomRequest } from '../create-room'

export const createRoomMock = http.post<never, CreateRoomRequest>(
  'rooms',
  async ({ request }) => {
    const { theme } = await request.json()

    if (theme.length > 0) {
      return HttpResponse.json(
        {
          id: '7645c730-5412-4632-a7cd-67bf8babea98',
        },
        { status: 200 },
      )
    }

    return new HttpResponse(null, { status: 400 })
  },
)

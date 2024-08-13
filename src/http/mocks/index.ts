import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { createMessageMock } from './create-message-mock'
import { createMessageReactionMock } from './create-message-reaction-mock'
import { createRoomMock } from './create-room-mock'
import { getRoomMessagesMock } from './get-room-messages-mock'
import { removeMessageReactionMock } from './remove-message-reaction-mock'
export const worker = setupWorker(
  createRoomMock,
  getRoomMessagesMock,
  createMessageMock,
  createMessageReactionMock,
  removeMessageReactionMock,
)

export async function enableMocks() {
  if (env.MODE !== 'test') return

  await worker.start()
}

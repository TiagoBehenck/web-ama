import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { createMessageReaction } from '@/http/create-message-reaction'
import { removeMessageReaction } from '@/http/remove-message-reaction'

type MessageProps = {
  messageId: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({
  messageId,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const { roomId } = useParams<{ roomId: string }>()
  const [hasReacted, setHasReacted] = useState(false)

  if (!roomId) {
    return
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return
    }

    try {
      await createMessageReaction({ roomId, messageId })
      toast.success('Mensagem curtida com sucesso!')
    } catch {
      toast.error('Não foi possível curtir a pergunta')
    }

    setHasReacted(true)
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return
    }

    try {
      await removeMessageReaction({ roomId, messageId })
    } catch {
      toast.error('Não foi possível remover a curtida')
    }

    setHasReacted(false)
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[data-answered='true']:opacity-50 data-[data-answered='true']:pointer-events-none"
    >
      {text}

      {hasReacted ? (
        <button
          type="button"
          onClick={removeMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-orange-400 test-sm font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={createMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-zinc-400 test-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  )
}

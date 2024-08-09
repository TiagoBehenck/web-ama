import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import type { GetRoomMessagesResponse } from "@/http/get-room-messages";

enum WebSocketMessageKind {
  message_created = "message_created",
  message_answered = "message_answered",
  message_reaction_increased = "message_reaction_increased",
  message_reaction_decreased = "message_reaction_decreased",
}

type WebhookMessage =
  | {
      kind: WebSocketMessageKind.message_created;
      value: { id: string; message: string };
    }
  | { kind: WebSocketMessageKind.message_answered; value: { id: string } }
  | {
      kind: WebSocketMessageKind.message_reaction_increased;
      value: { id: string; count: number };
    }
  | {
      kind: WebSocketMessageKind.message_reaction_decreased;
      value: { id: string; count: number };
    };

type UseMessagesWebSocketsParams = {
  roomId: string;
};

export function useMessagesWebSockets({ roomId }: UseMessagesWebSocketsParams) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    ws.onopen = () => {
      console.log("Connected to websocket!");
    };

    ws.onclose = () => {
      console.log("Disconnected from websocket!");
    };

    function handleMessageCreated(data: WebhookMessage) {
      queryClient.setQueryData<GetRoomMessagesResponse>(
        ["messages", roomId],
        (state) => ({
          messages: [
            ...(state?.messages ?? []),
            {
              id: data.value.id,
              text: (data.value as { message: string }).message,
              amountOfReactions: 0,
              answered: false,
            },
          ],
        }),
      );
    }

    function handleMessageAnswered(data: WebhookMessage) {
      queryClient.setQueryData<GetRoomMessagesResponse>(
        ["messages", roomId],
        (state) => ({
          messages:
            state?.messages.map((message) =>
              message.id === data.value.id
                ? { ...message, answered: true }
                : message,
            ) ?? [],
        }),
      );
    }

    function handleReactionChange(data: WebhookMessage) {
      queryClient.setQueryData<GetRoomMessagesResponse>(
        ["messages", roomId],
        (state) => ({
          messages:
            state?.messages.map((message) =>
              message.id === data.value.id
                ? {
                    ...message,
                    amountOfReactions: (data.value as { count: number }).count,
                  }
                : message,
            ) ?? [],
        }),
      );
    }

    const messageHandlers: Record<
      WebSocketMessageKind,
      (data: WebhookMessage) => void
    > = {
      [WebSocketMessageKind.message_created]: handleMessageCreated,
      [WebSocketMessageKind.message_answered]: handleMessageAnswered,
      [WebSocketMessageKind.message_reaction_increased]: handleReactionChange,
      [WebSocketMessageKind.message_reaction_decreased]: handleReactionChange,
    };

    ws.onmessage = (event) => {
      const data: WebhookMessage = JSON.parse(event.data);
      const handler = messageHandlers[data.kind];
      if (handler) {
        handler(data);
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId, queryClient]);
}

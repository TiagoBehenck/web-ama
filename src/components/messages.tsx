import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useMessagesWebSockets } from "@/hooks/use-messages-web-sockets";
import { getRoomMessages } from "@/http/get-room-messages";
import { Message } from "./message";

export function Messages() {
  const { roomId } = useParams<{ roomId: string }>();

  if (!roomId) {
    throw new Error("Messages component must be used inside a room route");
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  useMessagesWebSockets({ roomId });

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions;
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((message) => {
        return (
          <Message
            key={message.id}
            messageId={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        );
      })}
    </ol>
  );
}

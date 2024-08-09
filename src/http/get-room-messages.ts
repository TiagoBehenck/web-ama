type GetRoomMessagesRequest = {
  roomId: string;
};

export type GetRoomMessagesResponse = {
  messages: {
    id: string;
    text: string;
    amountOfReactions: number;
    answered: boolean;
  }[];
};

export async function getRoomMessages({
  roomId,
}: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`,
  );

  const data: Array<{
    id: string;
    room_id: string;
    message: string;
    reactionCount: number;
    answered: boolean;
  }> = await response.json();

  return {
    messages: data.map((message) => ({
      id: message.id,
      text: message.message,
      amountOfReactions: message.reactionCount,
      answered: message.answered,
    })),
  };
}

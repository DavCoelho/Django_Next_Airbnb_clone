"use client";

import { useRouter } from "next/navigation";
import { ConversationType } from "../../inbox/page";

import CustomButton from "../forms/CustomButton";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation = ({ conversation, userId }: ConversationProps) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id != userId);

  console.log("otherUser", otherUser?.name);

  return (
    <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
      <p className="mb-6 text-xl">{otherUser?.name}</p>

      <p
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        className="text-airbnb-dark"
      >
        Go to conversation
      </p>
    </div>
  );
};

export default Conversation;

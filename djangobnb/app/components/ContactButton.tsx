"use client";

import useLoginModal from "../hooks/useLoginModal";
import apiService from "../services/apiService";

import { useRouter } from "next/navigation";

interface ContactButtonProps {
  userId: string | null;
  landlordId: string;
}

const ContactButton = ({ userId, landlordId }: ContactButtonProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.get(
        `/api/chat/start/${landlordId}/`,
      );

      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`);
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <div
      onClick={startConversation}
      className="mt-6 py-4 px-6 cursor-pointer bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition"
    >
      Contact
    </div>
  );
};

export default ContactButton;

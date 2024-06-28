import React from "react";
import { notification } from "antd";
import { api } from "../../api";

interface FaqDeleteProps {
  faqId: string;
  onFaqDeleted: () => void;
}

const FaqDelete: React.FC<FaqDeleteProps> = ({ faqId, onFaqDeleted }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/Faqs/${faqId}`);
      notification.success({ message: "FAQ deleted successfully!" });
      onFaqDeleted();
    } catch (err) {
      const error = err as any;
      notification.error({
        message: "Error deleting FAQ",
        description: error.message,
      });
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default FaqDelete;

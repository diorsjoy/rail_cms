/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { api } from "../../api/axios";

interface FaqEditProps {
  faqId: string;
  onFaqUpdated: () => void;
}

const FaqEdit: React.FC<FaqEditProps> = ({ faqId, onFaqUpdated }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await api.get(`/Faqs/${faqId}`);
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
      } catch (err) {
        const error = err as any;
        notification.error({
          message: "Error fetching FAQ",
          description: error.message,
        });
      }
    };

    fetchFaq();
  }, [faqId]);

  const handleUpdate = async () => {
    try {
      await api.put(`/Faqs/${faqId}`, { question, answer });
      notification.success({ message: "FAQ updated successfully!" });
      onFaqUpdated();
    } catch (err) {
      const error = err as any;
      notification.error({
        message: "Error updating FAQ",
        description: error.message,
      });
    }
  };

  return (
    <div>
      <h2>Edit FAQ</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default FaqEdit;

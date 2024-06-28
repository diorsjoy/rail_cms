import React, { useState } from "react";
import { notification } from "antd";
import { api } from "../../api/axios";

interface FaqCreateProps {
  onFaqCreated: () => void;
}

const FaqCreate: React.FC<FaqCreateProps> = ({ onFaqCreated }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCreate = async () => {
    try {
      await api.post("/Faqs", { question, answer });
      notification.success({ message: "FAQ created successfully!" });
      onFaqCreated();
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;
      notification.error({
        message: "Error creating FAQ",
        description: error.message,
      });
    }
  };

  return (
    <div>
      <h2>Create FAQ</h2>
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
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default FaqCreate;

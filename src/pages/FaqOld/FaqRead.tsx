import React, { useState } from "react";
import { api } from "../../api";
import { Button } from "antd";

interface Faq {
  id: number;
  question: { ru: string; kz: string; en: string; zh: string };
  answer: { ru: string; kz: string; en: string; zh: string };
  additionalProps?: { [key: string]: string };
}

const FaqRead: React.FC<{ faqId: string }> = ({ faqId }) => {
  const [faq, setFaq] = useState<Faq | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fetchFaq = async () => {
    try {
      const response = await api.get<Faq>(`/Faqs/${faqId}`);
      setFaq(response.data);
    } catch (error) {
      console.error("Error fetching FAQ:", error);
    }
  };

  React.useEffect(() => {
    fetchFaq();
  }, [faqId, fetchFaq]);

  return (
    <div>
      {faq && (
        <>
          <h3>Question: {faq.question.ru}</h3>
          <p>Answer: {faq.answer.ru}</p>
          {showAdvanced && (
            <>
              <p>Question (KZ): {faq.question.kz}</p>
              <p>Answer (KZ): {faq.answer.kz}</p>
              <p>Question (EN): {faq.question.en}</p>
              <p>Answer (EN): {faq.answer.en}</p>
              <p>Question (ZH): {faq.question.zh}</p>
              <p>Answer (ZH): {faq.answer.zh}</p>
            </>
          )}
          <Button onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? "Show Less" : "More"}
          </Button>
        </>
      )}
    </div>
  );
};

export default FaqRead;

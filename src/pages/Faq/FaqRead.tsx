import React, { useState } from "react";
import { api } from "../../api";

interface Faq {
  id: number;
  question: string;
  answer: string;
  additionalProps?: {
    [key: string]: string;
  };
}

const FaqRead: React.FC<{ faqId: string }> = ({ faqId }) => {
  const [faq, setFaq] = useState<Faq | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fetchAdvancedData = async () => {
    try {
      const response = await api.get<Faq>(`/Faqs/${faqId}/advanced`, {
        headers: {},
      });
      setFaq(response.data);
      setShowAdvanced(true);
    } catch (error) {
      console.error("Error fetching FAQ:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchAdvancedData}>Show Advanced Data</button>
      {faq && (
        <div>
          <h3>Question: {faq.question}</h3>
          <p>Answer: {faq.answer}</p>
          {showAdvanced && (
            <>
              <h4>Advanced Data:</h4>
              <pre>{JSON.stringify(faq.additionalProps, null, 2)}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FaqRead;

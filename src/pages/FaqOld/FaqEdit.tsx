/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, notification } from "antd";
import { api } from "../../api/axios";

interface FaqEditProps {
  faqId: string;
  visible: boolean;
  onClose: () => void;
  onFaqUpdated: () => void;
}

const FaqEdit: React.FC<FaqEditProps> = ({
  faqId,
  visible,
  onClose,
  onFaqUpdated,
}) => {
  const [question, setQuestion] = useState({ ru: "", kz: "", en: "", zh: "" });
  const [answer, setAnswer] = useState({ ru: "", kz: "", en: "", zh: "" });

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
      onClose();
    } catch (err) {
      const error = err as any;
      notification.error({
        message: "Error updating FAQ",
        description: error.message,
      });
    }
  };

  const handleInputChange = (
    language: string,
    field: string,
    value: string
  ) => {
    if (field === "question") {
      setQuestion({ ...question, [language]: value });
    } else if (field === "answer") {
      setAnswer({ ...answer, [language]: value });
    }
  };

  return (
    <Drawer
      title="Edit FAQ"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical">
        {["ru", "kz", "en", "zh"].map((lang) => (
          <div key={lang}>
            <Form.Item label={`Question (${lang.toUpperCase()})`}>
              <Input
                value={question[lang]}
                onChange={(e) =>
                  handleInputChange(lang, "question", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label={`Answer (${lang.toUpperCase()})`}>
              <Input
                value={answer[lang]}
                onChange={(e) =>
                  handleInputChange(lang, "answer", e.target.value)
                }
              />
            </Form.Item>
          </div>
        ))}
        <Form.Item>
          <Button type="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FaqEdit;

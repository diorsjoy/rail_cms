/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Drawer, Form, Input, notification } from "antd";
import { api } from "../../api/axios";

interface FaqCreateProps {
  visible: boolean;
  onClose: () => void;
  onFaqCreated: () => void;
}

const FaqCreate: React.FC<FaqCreateProps> = ({
  visible,
  onClose,
  onFaqCreated,
}) => {
  const [question, setQuestion] = useState<{
    ru: string;
    kz: string;
    en: string;
    zh: string;
  }>({ ru: "", kz: "", en: "", zh: "" });
  const [answer, setAnswer] = useState<{
    ru: string;
    kz: string;
    en: string;
    zh: string;
  }>({ ru: "", kz: "", en: "", zh: "" });

  const handleCreate = async () => {
    try {
      await api.post("/Faqs", { question, answer });
      notification.success({ message: "FAQ created successfully!" });
      onFaqCreated();
      onClose();
    } catch (err) {
      const error = err as any;
      notification.error({
        message: "Error creating FAQ",
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
      title="Create FAQ"
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
                onChange={(e) =>
                  handleInputChange(lang, "question", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label={`Answer (${lang.toUpperCase()})`}>
              <Input
                onChange={(e) =>
                  handleInputChange(lang, "answer", e.target.value)
                }
              />
            </Form.Item>
          </div>
        ))}
        <Form.Item>
          <Button type="primary" onClick={handleCreate}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FaqCreate;

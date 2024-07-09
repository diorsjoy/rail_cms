import React, { useEffect } from "react";
import { Form, Input, Button, Tabs } from "antd";
import { Faq } from "../../types";

interface FaqFormProps {
  faq: Faq | null;
  onSubmit: (faq: Omit<Faq, "id">) => void;
  onCancel: () => void;
}

const { TabPane } = Tabs;

const FaqForm: React.FC<FaqFormProps> = ({ faq, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (faq) {
      form.setFieldsValue(faq);
    } else {
      form.resetFields();
    }
  }, [faq, form]);

  const handleFinish = (values: Omit<Faq, "id">) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Tabs defaultActiveKey="ru">
        {["ru", "kz", "en", "zh"].map((lang) => (
          <TabPane tab={lang.toUpperCase()} key={lang}>
            <Form.Item
              name={["question", lang]}
              label={`Question (${lang.toUpperCase()})`}
              rules={[{ required: true, message: "Question is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["answer", lang]}
              label={`Answer (${lang.toUpperCase()})`}
              rules={[{ required: true, message: "Answer is required" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </TabPane>
        ))}
      </Tabs>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {faq ? "Update" : "Create"}
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FaqForm;

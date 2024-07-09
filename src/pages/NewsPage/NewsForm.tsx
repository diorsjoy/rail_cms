import React, { useEffect } from "react";
import { Form, Input, Button, Upload, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { News } from "../../types";

interface NewsFormProps {
  news: News | null;
  onSubmit: (news: Omit<News, "id">) => void;
  onCancel: () => void;
}

const { TabPane } = Tabs;

const NewsForm: React.FC<NewsFormProps> = ({ news, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (news) {
      form.setFieldsValue(news);
    } else {
      form.resetFields();
    }
  }, [news, form]);

  const handleFinish = (values: Omit<News, "id">) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Tabs defaultActiveKey="ru">
        {["ru", "kz", "en", "zh"].map((lang) => (
          <TabPane tab={lang.toUpperCase()} key={lang}>
            <Form.Item
              name={["title", lang]}
              label={`Title (${lang.toUpperCase()})`}
              rules={[{ required: true, message: "Заголовок обязателен" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["content", lang]}
              label={`Содержимое (${lang.toUpperCase()})`}
              rules={[{ required: true, message: "Содержимое required" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name={["description", lang]}
              label={`Description (${lang.toUpperCase()})`}
              rules={[{ required: true, message: "Description required" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </TabPane>
        ))}
      </Tabs>
      <Form.Item label="Poster" name="poster">
        <Upload>
          <Button icon={<UploadOutlined />}>Add</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Gallery">
        <Upload>
          <Button icon={<UploadOutlined />}>Add</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {news ? "Update" : "Create"}
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewsForm;

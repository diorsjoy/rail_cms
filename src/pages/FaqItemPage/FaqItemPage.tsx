import { Button, Form, Input } from "antd";

export const FaqItemPage = () => {
  const [faqForm] = Form.useForm();

  return (
    <Form
      form={faqForm}
      layout="vertical"
      style={{
        maxWidth: 500,
      }}
      onFinish={(values) => console.log(values)}
    >
      <Form.Item
        name="question"
        required
        rules={[
          {
            required: true,
          },
        ]}
        label="Question"
      >
        <Input placeholder="Question" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

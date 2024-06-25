import { Button, Form, Input } from "antd";
import { api } from "../../api";
import styles from "./ForgotPassword.module.css";

export const ForgotPassword = () => {
  const onFinish = (values: unknown) => {
    api.post("/Account/forgotPassword", values).then(() => {});
  };

  return (
    <div className={styles.formContainer}>
      <Form
        name="forgot_password"
        className={styles.forgotPasswordForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

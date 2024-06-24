import { Button, Form, Input } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./SignInPage.module.css";
import { useTitle } from "../hooks/useTitle";

export const SignInPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  useTitle("Sign In");
  return (
    <div className={styles.formContainer}>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        role="form"
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
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            type={passwordVisible ? "text" : "password"}
            iconRender={(visible) => (
              <Button type="text" onClick={() => setPasswordVisible(!visible)}>
                {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              </Button>
            )}
          />
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

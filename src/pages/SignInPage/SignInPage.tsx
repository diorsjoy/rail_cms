import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";
import { useTitle } from "../../hooks/useTitle";
import styles from "./SignInPage.module.css";
import { accessTokenService } from "../../lib";

export const SignInPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function onFinish(values: unknown) {
    setIsLoading(true);
    api
      .post("/Account/login", values)
      .then((res) => {
        if (res.data.code === "SUCCESS") {
          accessTokenService.set(res.data.data);
        }

        if (res.data.code === "SUCCESS") {
          navigate("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  useTitle("Sign In");

  return (
    <div className={styles.formContainer}>
      <Spin spinning={isLoading}>
        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          role="form"
        >
          <Form.Item
            name="login"
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
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="savePassword" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to="/sign-up">
              <Button type="link" htmlType="button">
                Sign Up
              </Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <Link to="/forgot-password">
              <Button type="link" htmlType="button">
                Forgot password?
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

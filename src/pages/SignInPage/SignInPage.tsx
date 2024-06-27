import { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api } from "../../api";
import { useTitle } from "../../hooks/useTitle";
import styles from "./SignInPage.module.css";
import { accessTokenService } from "../../lib";
import LanguageSelector from "../../components/LanguageSelector";

export const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: unknown) => {
    setIsLoading(true);
    api
      .post("/Account/login", values)
      .then((res) => {
        if (res.data.code === "SUCCESS") {
          accessTokenService.set(res.data.data);
          navigate("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  useTitle(t("Sign In"));

  return (
    <div className={styles.formContainer}>
      <LanguageSelector />
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
            label={t("Email")}
            rules={[
              { required: true, message: t("Please input your email!") },
              { type: "email", message: t("The input is not valid E-mail!") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("Password")}
            rules={[
              { required: true, message: t("Please input your password!") },
            ]}
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
              <Checkbox>{t("Remember me")}</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("Submit")}
            </Button>
          </Form.Item>
          <Row gutter={8}>
            <Col>
              <Form.Item>
                <Link to="/sign-up">
                  <Button type="link" htmlType="button">
                    {t("Sign Up")}
                  </Button>
                </Link>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Link to="/forgot-password">
                  <Button type="link" htmlType="button">
                    {t("Forgot password?")}
                  </Button>
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

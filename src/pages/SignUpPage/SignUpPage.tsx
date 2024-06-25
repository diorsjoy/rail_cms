import { Button, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useTitle } from "../../hooks/useTitle";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const [form] = Form.useForm();
  useTitle("Sign Up");
  const onFinish = (values: unknown) => {
    api.post("/Account/my/register", values).then(() => {});
  };

  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        name="register"
        className={styles.registerForm}
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
      >
        <Row gutter={[24, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="middleName"
              label="Middle Name"
              rules={[
                {
                  required: true,
                  message: "Please input your middle name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/sign-in">
            <Button type="primary" htmlType="button">
              Sign In
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;

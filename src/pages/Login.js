/** @format */

import { Alert, Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const validatePassword = (rule, value, callback) => {
  // Use a regular expression to check if the value is a valid password
  const passwordRegex =
    /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=£*_#]).*$/;

  if (!passwordRegex.test(value)) {
    callback(
      "Password must contain one uppercase,one lowercase, number, special character and minimum 8 character ( Accepted Special Characters @#$%^&+=£*_# )"
    );
  } else {
    callback(); // No error, so call the callback with no arguments
  }
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const loginSubmitHandler = (values) => {
    setCurrentEmail(values.Email);
    dispatch({
      type: "LOGIN_REQUEST",
      payload: values,
    });
  };
  const [form] = Form.useForm();

  const {
    error,
    isLoading,
    isOTPSent,
    isOperationSuccessful,
    isSendOTPSuccess,
  } = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    if (isOTPSent) {
      navigate("/verify-otp", {
        state: {
          email: currentEmail,
        },
      });
    }
  }, [isOTPSent]);

  useEffect(() => {
    if (isOperationSuccessful) {
      setShowRegisterModal(false);
      dispatch({
        type: "CLEAR_FORM",
      });
    }
  }, [isOperationSuccessful]);

  return (
    <div className="border container-scroller h100 loginPage d-flex align-items-center">
      {/* partial */}
      <div className="container pt-4 categoryField">
        <section className="">
          <div className="row h100  justify-content-center align-items-center d-flex-row text-center h-100">
            <div className="col-12 col-md-4">
              <div className="">
                <Card>
                  <div className="d-flex gap-4 row">
                    <div className="col-md-12">
                      <h4 className="fw-bold mt-4 text-center fs-3 mb-0 ">
                        Welcome Back
                      </h4>
                      <p className=" mt-0">Login into your account</p>

                      {error && (
                        <Alert
                          message={error}
                          type="error"
                          //   showIcon
                          //   icon={<InfoCircleOutlined />}
                          style={{
                            fontSize: "13px",
                            margin: "15px 0",
                            textAlign: "left",
                          }}
                        />
                      )}
                      <Form
                        layout="vertical"
                        name="form"
                        form={form}
                        autoComplete="off"
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={loginSubmitHandler}
                      >
                        <Form.Item
                          hasFeedback
                          name="Email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                            {
                              type: "email",
                              message: "Please enter valid email!",
                            },
                          ]}
                        >
                          <Input
                            // addonBefore={<UserOutlined />}
                            style={{ background: "white" }}
                            placeholder="Enter Email"
                          />
                        </Form.Item>
                        <Form.Item
                          hasFeedback
                          label="Password "
                          name="Password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                            {
                              validator: validatePassword,
                            },
                          ]}
                        >
                          <Input
                            // prefix={<VerifiedUserOutlined />}
                            type="password"
                            style={{ background: "white" }}
                            placeholder="Enter Password"
                          />
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            className="btn-block w-100"
                            htmlType="submit"
                            loading={isLoading}
                          >
                            Login
                          </Button>
                        </Form.Item>
                      </Form>
                      <p className="text-center">
                        Dont have an account ?{" "}
                        <a
                          onClick={(e) => {
                            navigate("/send-otp");
                          }}
                          className="text-danger"
                        >
                          <span className="ms-1 fw-bold">Sign up</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;

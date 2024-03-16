/** @format */

import { Alert, Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SendOTP = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, registerError, sendOTPLoading, isSendOTPSuccess } =
    useSelector((state) => state.authenticationReducer);
  const [currentEmail, setCurrentEmail] = useState("");

  const sendOTPHandler = (values) => {
    setCurrentEmail(values.Email);
    dispatch({
      type: "SEND_OTP_REQUEST",
      payload: {
        Email: values.Email,
      },
    });
  };

  useEffect(() => {
    if (isSendOTPSuccess) {
      navigate("/register", { state: { email: currentEmail } });
    }
  }, [isSendOTPSuccess]);
  return (
    <div className="container-scroller h100 loginPage d-flex align-items-center">
      <div className="container pt-4 categoryField">
        <section className="">
          <div className="row h100 justify-content-center align-items-center d-flex-row text-center h-100">
            <div className="col-12 col-md-4  ">
              <div className="">
                <Card>
                  {" "}
                  <div className="d-flex gap-4 row">
                    <div className="col-md-12">
                      <h4 className="fw-bold mt-4 text-center fs-3 mb-0 ">
                        Register Now
                      </h4>
                      <p className=" mt-0">
                        Give us your email to proceed the registeration.
                      </p>

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
                        className="login"
                        name="form"
                        onFinish={sendOTPHandler}
                        autoComplete="off"
                        initialValues={{
                          remember: true,
                        }}
                        form={form}
                      >
                        <div className="row mt-2">
                          <div className="  col-md-12 col-lg-12">
                            {registerError && (
                              <Alert variant="danger">{registerError}</Alert>
                            )}
                            <Form.Item
                              label="Email Address"
                              name="Email"
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
                                style={{ background: "white" }}
                                placeholder="Enter email"
                              />
                            </Form.Item>
                          </div>

                          <div className="  mt-2">
                            <Form.Item>
                              <Button
                                className="primary-button w-100"
                                type="primary"
                                htmlType="submit"
                                loading={sendOTPLoading}
                              >
                                {" "}
                                {sendOTPLoading ? "" : "Send OTP"}
                              </Button>
                            </Form.Item>
                          </div>
                        </div>
                      </Form>
                      <p className="text-center">
                        Already have an account ?{" "}
                        <a
                          onClick={(e) => {
                            navigate("/login");
                          }}
                          className="text-danger"
                        >
                          <span className="ms-1 fw-bold">Login</span>
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
};

export default SendOTP;

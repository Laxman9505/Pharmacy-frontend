/** @format */

import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Register() {
  const { state } = useLocation();
  console.log("state", state);
  const {
    isSendOTPSuccess,
    isResendOTPSuccess,
    isOperationSuccessful,
    registerUserLoading,
    registerationError,
  } = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpForm] = Form.useForm();
  const [RegisterForm] = Form.useForm();
  const [otp, setOTP] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (!state?.email) {
      navigate("/send-otp");
    }
  }, [state]);

  const onRegisterFormSubmit = (values) => {
    const formData = new FormData();
    const request = {
      OTP: values.verificationCode,
      FullName: values.fullName,
      Password: values.password,
      Email: state?.email,
      ConfirmPassword: values.confirmPassword,
      PhoneNumber: values.phone,
    };
    formData.append("Request", JSON.stringify(request));

    if (image) {
      formData.append("image", image);
    }
    dispatch({
      type: "REGISTER_USER_REQUEST",
      payload: formData,
    });
  };

  useEffect(() => {
    if (isOperationSuccessful) {
      RegisterForm.resetFields();
    }
  }, [isOperationSuccessful]);

  return (
    <>
      <div className="container-scroller h100 loginPage d-flex align-items-center">
        <div className="container pt-4 categoryField">
          <section className="">
            <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
              <div className="col-12 col-md-8 mt-5 mb-5  ">
                <Card>
                  <div className="d-flex gap-4 row">
                    <div className="col-md-12">
                      <Form
                        layout="vertical"
                        className="login"
                        name="form"
                        onFinish={onRegisterFormSubmit}
                        autoComplete="off"
                        initialValues={{
                          remember: true,
                        }}
                        form={RegisterForm}
                      >
                        <div className="row ">
                          <div className="  col-md-12 col-lg-12 otp-container">
                            {/* <p className="verification-text ant-label">
                    Enter Verification Code:
                  </p> */}
                            <Alert variant="info">
                              We Have {isResendOTPSuccess && "Re-"} Sent
                              Verifcation Code To Your Email. Please Check And
                              Enter Verification Code Here ! Your OTP will
                              expire in 5 minutes.{" "}
                            </Alert>
                            {registerationError && (
                              <Alert variant="danger">
                                {registerationError}
                              </Alert>
                            )}

                            <Form.Item
                              label="Verification Code"
                              name="verificationCode"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Verification Code !",
                                },
                              ]}
                            >
                              <OtpInput
                                className="verification-container bg-white"
                                inputStyle={"ant-input"}
                                value={otp}
                                onChange={(e) => setOTP(e)}
                                numInputs={6}
                                style={{ background: "white" }}
                              />
                            </Form.Item>
                          </div>

                          <div className="  col-md-12 col-lg-6">
                            <Form.Item
                              label="Full Name"
                              name="fullName"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your full name!",
                                },
                              ]}
                            >
                              <Input
                                style={{ background: "white" }}
                                placeholder="Enter Full Name"
                              />
                            </Form.Item>
                          </div>

                          <div className="  col-md-6 col-lg-6 phone-input">
                            {" "}
                            <Form.Item
                              label="Phone"
                              name="phone"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your phone number!",
                                },
                                // {
                                //   pattern: selectedPhoneNumberRegex,
                                //   message: "Please enter a valid phone number",
                                // },
                              ]}
                            >
                              <Input
                                style={{ background: "white" }}
                                placeholder="Enter Phone"
                              />
                            </Form.Item>
                          </div>

                          <div className="  col-md-12 col-lg-6">
                            {" "}
                            <Form.Item
                              label="Password"
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your password!",
                                },
                              ]}
                            >
                              <Input
                                type="password"
                                style={{ background: "white" }}
                                placeholder="Enter password"
                              />
                            </Form.Item>
                          </div>
                          <div className=" col-md-12 col-lg-6">
                            {" "}
                            <Form.Item
                              label="Confirm Password"
                              name="confirmPassword"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input confirm password!",
                                },
                              ]}
                            >
                              <Input
                                type="
                                  password"
                                style={{ background: "white" }}
                                placeholder="Enter Confirm Password"
                              />
                            </Form.Item>
                          </div>

                          <div className=" col-md-12 col-lg-6">
                            {" "}
                            <Form.Item
                              label="User Image"
                              name="image"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Please upload your image!",
                              //   },
                              // ]}
                            >
                              <Input
                                onChange={(e) => {
                                  setImage(e.target.files[0]);
                                  setImagePreview(
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                }}
                                type="file"
                                placeholder="User Image"
                              />
                            </Form.Item>
                          </div>
                          {imagePreview && (
                            <div className="col-md-3">
                              <div className="giftupload inv_img mt-2">
                                <img
                                  src={
                                    imagePreview
                                      ? imagePreview
                                      : "assets/images/imagePlaceholder.png"
                                  }
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          )}

                          <div className=" mb-3  mt-3 d-flex justify-content-start">
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={registerUserLoading}
                              className="primary-button w-30"
                            >
                              {" "}
                              Register
                            </Button>
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
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;

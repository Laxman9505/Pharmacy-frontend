/** @format */

import { Alert, Button, Card, Form } from "antd";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ValidateOTP = () => {
  const [otpForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigae = useNavigate();
  const [otp, setOTP] = useState("");
  const { isVerifyLoading, isOTPVerifySuccess } = useSelector(
    (state) => state.authenticationReducer
  );
  const { state } = useLocation();
  const onValidateOTP = () => {
    dispatch({
      type: "VALIDATE_OTP_REQUEST",
      payload: {
        Email: state?.email,
        OTP: otp,
      },
    });
  };

  useEffect(() => {
    if (!state?.email) {
      navigae("/login");
    }
  }, [state]);

  useEffect(() => {
    if (isOTPVerifySuccess) {
      window.location.replace("/");
    }
  }, [isOTPVerifySuccess]);

  return (
    <div className="container-scroller h100 loginPage d-flex align-items-center">
      <div className="container pt-4 categoryField">
        <section className="">
          <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
            <div className="col-12 col-md-6  ">
              <Card>
                <div className="d-flex gap-4 row">
                  <div className="col-md-12">
                    <Form
                      layout="vertical"
                      className="login"
                      name="form"
                      onFinish={onValidateOTP}
                      autoComplete="off"
                      initialValues={{
                        remember: true,
                      }}
                      form={otpForm}
                    >
                      <div className="row ">
                        <h4 className="m-auto mb-4">Verify OTP</h4>
                        <div className="col-md-12 col-lg-12 otp-container categoryField">
                          {/* <p className="verification-text ant-label">
                    Enter Verification Code:
                  </p> */}
                          <Alert
                            type="warning"
                            message="  We Have Sent Verifcation Code To Your Email. Please Check And
                Enter Verification Code Here ! Your OTP will expire in 5
                minutes"
                          />

                          {/* {registerationError && (
                <Alert variant="danger">{registerationError}</Alert>
              )} */}

                          <Form.Item
                            label="Verification Code"
                            name="verificationCode"
                            className="categoryField mt-4"
                            rules={[
                              {
                                required: true,
                                message: "Please input Verification Code !",
                              },
                            ]}
                          >
                            <OtpInput
                              className="verification-container "
                              inputStyle={"ant-input"}
                              value={otp}
                              onChange={(e) => setOTP(e)}
                              numInputs={6}
                            />
                          </Form.Item>
                        </div>

                        <div className=" mb-3  mt-3 d-flex justify-content-start">
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={isVerifyLoading}
                              className="primary-button w-100"
                            >
                              {" "}
                              Verify
                            </Button>
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="default"
                              onClick={() => {
                                navigae("/login");
                              }}
                              className=" w-100 ms-2 h-44"
                            >
                              {" "}
                              Cancel
                            </Button>
                          </Form.Item>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ValidateOTP;

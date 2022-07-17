import React from "react";
import { useSelector } from "react-redux";
import ChangePassword from "./ChangePassword";
import "./Login.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const LoginFormType = {
  SignIn: 0,
  SignUp: 1,
  ForgotPassword: 2,
};

const Login = () => {
  const [formType, setFormType] = React.useState(LoginFormType.SignIn);

  const loading = useSelector((store) => store.user.loading);

  return (
    <section className="vh-100 login">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "2em" }}>
              <div className="row g-0">
                <div
                  className="col-md-6 col-lg-5 d-none d-md-flex align-items-center"
                  style={{ borderRight: "1px solid lightgray" }}
                >
                  <img
                    src="http://store-images.s-microsoft.com/image/apps.46703.14560072719906134.35713bf3-d456-450b-b4c7-d9db01972e59.587e4824-0f00-4b63-937a-e80e9d928e8c"
                    className="img-fluid"
                  />
                </div>

                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    {formType === LoginFormType.SignIn && (
                      <div>
                        <SignInForm />

                        <p className="text-center fw-bold text-muted">OR</p>

                        <div className="w-100">
                          <button
                            className="btn btn-success btn-lg w-100"
                            onClick={() => setFormType(LoginFormType.SignUp)}
                            disabled={loading}
                          >
                            Create an account
                          </button>
                        </div>

                        <p className="mt-4 text-center">
                          Did you forget your password?
                          <button
                            type="button"
                            className="btn btn-secondary ml-1"
                            disabled={loading}
                            onClick={() =>
                              setFormType(LoginFormType.ForgotPassword)
                            }
                          >
                            Click here
                          </button>
                        </p>
                      </div>
                    )}

                    {formType === LoginFormType.SignUp && (
                      <div>
                        <SignUpForm />

                        <p className="text-center fw-bold text-muted">OR</p>

                        <button
                          className="btn btn-primary btn-lg w-100"
                          onClick={() => setFormType(LoginFormType.SignIn)}
                          disabled={loading}
                        >
                          Sign in with your account
                        </button>
                      </div>
                    )}

                    {formType === LoginFormType.ForgotPassword && (
                      <div>
                        <ChangePassword />

                        <p className="text-center fw-bold text-muted">OR</p>

                        <button
                          className="btn btn-primary btn-lg w-100"
                          disabled={loading}
                          onClick={() => setFormType(LoginFormType.SignIn)}
                        >
                          Go back login
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../components/appToast";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    const success = login(values.email, values.password);
    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } else {
      setShowErrorToast(true);
    }
  };

  return (
    <Container className="login-page">
      <Row className="align-items-center vh-100">
        <Col md={6} className="d-flex justify-content-center">
          <div className="login-form-container">
            <Row>
              <Col sm={12}>
                <h2 className="d-flex justify-content-center">Login</h2>
                <h4 className="d-flex justify-content-center mb-4">
                  Welcome Back!
                </h4>
                <p className="d-flex justify-content-center mb-4 secondartText">
                  Enter Your Email Address and Password To Access ShopNest
                  Account
                </p>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched,
                    errors,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>
                          Email address{" "}
                          <span style={{ color: "var(--danger-color)" }}>
                            *
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formPassword">
                        <Form.Label>
                          Password{" "}
                          <span style={{ color: "var(--danger-color)" }}>
                            *
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="d-flex justify-content-center col-12 my-3"
                      >
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
              <Col>
                <p className="d-flex justify-content-center mb-4 secondartText">
                  If You Don't Have An account Please,
                  <a href="/register" className="text-decoration-none ms-1">
                    Sign Up Now
                  </a>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6} className="p-0">
          <div className="image-container">
            <img
              src="https://img.freepik.com/free-vector/ecommerce-campaign-concept-illustration_114360-8432.jpg?semt=ais_hybrid"
              alt="Login Illustration"
              className="img-fluid d-none d-md-block"
            />
          </div>
        </Col>
      </Row>
      <ToastMessage
        message="Login successful!"
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        type="success"
      />
      <ToastMessage
        message="Invalid credentials. Please try again."
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        type="error"
      />
    </Container>
  );
};

export default LoginForm;

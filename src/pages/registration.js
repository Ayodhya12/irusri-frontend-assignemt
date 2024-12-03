import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ToastMessage from "../components/appToast";

const RegistrationForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    const success = register(values.email, values.password);
    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setShowErrorToast(true);
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="align-items-center vh-100">
        <Col md={6} className="d-flex justify-content-center">
          <div className="login-form-container">
            <Row>
              <Col sm={12}>
                <h2 className="d-flex justify-content-center">Sign Up</h2>
                <p className="d-flex justify-content-center mb-4 secondartText">
                  Already Have An Account?{" "}
                  <a href="/login" className="text-decoration-none ms-1">
                    Login Now
                  </a>
                </p>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
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
                      <Form.Group controlId="formName">
                        <Form.Label>
                          Name{" "}
                          <span style={{ color: "var(--danger-color)" }}>
                            *
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

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

                      <Form.Group controlId="formConfirmPassword">
                        <Form.Label>
                          Confirm Password{" "}
                          <span style={{ color: "var(--danger-color)" }}>
                            *
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.confirmPassword && errors.confirmPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="d-flex justify-content-center col-12 my-3"
                      >
                        Register
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
              <Col>
                <p className="d-flex justify-content-center mb-4 secondartText">
                  I Agree All Statements in
                  <a href="#" className="text-decoration-none ms-1">
                    Terms of Service
                  </a>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6} className="p-0">
          <div className="image-container">
            <img
              src="https://img.freepik.com/free-vector/isometric-laptop-with-shopping-cart-keypad_1262-16544.jpg?t=st=1733190508~exp=1733194108~hmac=22a24465b7b189ed705b97d3fcbaf124f652809c217cdb420d4aafda3817ffc3&w=740"
              alt="Login Illustration"
              className="img-fluid d-none d-lg-block"
              style={{ width: "80%", height: "auto" }}
            />
          </div>
        </Col>
      </Row>
      <ToastMessage
        message="Registration successful!"
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        type="success"
      />
      <ToastMessage
        message="Email is already registered. Please use a different email."
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        type="error"
      />
    </Container>
  );
};

export default RegistrationForm;

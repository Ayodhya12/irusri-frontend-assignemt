// src/components/LoginForm.js
import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    const userData = {
      email: values.email,
    };

    login(userData);
    alert("Login successful!");
    navigate("/products");
  };

  return (
    <Container>
      <h2>Login</h2>
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
              <Form.Label>Email address</Form.Label>
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
              <Form.Label>Password</Form.Label>
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

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;

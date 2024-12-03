import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ message, show, onClose, type }) => {
  const toastType = type === "success" ? "success" : "danger";

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} bg={toastType} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;

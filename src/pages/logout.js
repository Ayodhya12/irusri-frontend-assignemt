import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ show, onClose }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutModal;

import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import ToastMessage from "../components/appToast";

const CartItemCard = ({ product, updateQuantity, handleRemove }) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const handleQuantityChange = (id, quantityChange) => {
    const newQuantity = product.quantity + quantityChange;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveFromCart = (productId) => {
    handleRemove(productId);
    setShowSuccessToast(true);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col md={2}>
          <Card>
            <Card.Img
              variant="top"
              src={product?.image}
              alt={product?.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Card>
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{product?.name}</Card.Title>
            <Card.Text className="secondartText">
              {product?.description}
            </Card.Text>
            <Row>
              <Col md={6}>
                <Card.Text>Price: ${product?.price}</Card.Text>
              </Col>
              <Col
                md={6}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={product?.quantity <= 1}
                    className="border border-light"
                  >
                    -
                  </Button>
                  <span className="mx-2">{product?.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="border border-light"
                  >
                    +
                  </Button>
                </div>

                <Trash
                  color="var(--danger-color)"
                  onClick={() => handleRemoveFromCart(product?.id)}
                  size={20}
                />
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
      <ToastMessage
        message="Item removed from cart!"
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        type="success"
      />
    </>
  );
};

export default CartItemCard;

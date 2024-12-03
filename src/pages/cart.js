import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { Button, Row, Col, Container } from "react-bootstrap";
import CartItemCard from "../components/cartItemCard";
import ToastMessage from "../components/appToast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleRemove = () => {
    setShowSuccessToast(true);
    removeFromCart();
  };

  return (
    <Container className="py-3">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row className="p-5 p-lg-3">
            {cart.map((item) => (
              <Col md={12} key={item.id} className="cardSecondaryWrapper mb-2">
                <CartItemCard
                  product={item}
                  handleRemove={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col md={12} className="text-end">
              <h4>Total: ${parseFloat(cartTotal.toFixed(2))}</h4>
              <Button variant="success">Checkout</Button>
            </Col>
          </Row>
        </>
      )}
      <ToastMessage
        message="Item removed from cart!"
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        type="success"
      />
    </Container>
  );
};

export default Cart;

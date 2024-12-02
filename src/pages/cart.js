import React from "react";
import { useCart } from "../context/cartContext";
import { Button, Row, Col, Container } from "react-bootstrap";
import CartItemCard from "../components/cartItemCard";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  console.log(cart);
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
    </Container>
  );
};

export default Cart;

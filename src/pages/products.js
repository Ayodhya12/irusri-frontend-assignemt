import React, { useState } from "react";
import { productsList } from "../data/products";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useCart } from "../context/cartContext";
import { Cart } from "react-bootstrap-icons";
import ToastMessage from "../components/appToast";

const Products = () => {
  const { addToCart } = useCart();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      setShowSuccessToast(true);
    } catch (error) {
      setShowErrorToast(true);
    }
  };

  return (
    <Container className="py-3">
      <h2 className="pb-2">Products</h2>
      <div className="product-list">
        {productsList.length === 0 ? (
          <p>No products available at the moment. Please check back later.</p>
        ) : (
          <Row xs={1} md={2} lg={5} className="g-4">
            {productsList.map((product, idx) => (
              <Col key={idx} className="cardWrapper">
                <Card className="d-flex flex-column h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={`Image of ${product.name}`}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="secondartText">
                      {product.description}
                    </Card.Text>
                    <Card.Text>{`$${product.price}`}</Card.Text>
                    <div className="mt-auto">
                      <Button
                        className="btnPrimary d-flex align-items-cente"
                        onClick={() => handleAddToCart(product)}
                      >
                        <Cart size={20} className="me-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <ToastMessage
        message="Product added to cart successfully!"
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        type="success"
      />
      <ToastMessage
        message="Failed to add product to cart. Please try again!"
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        type="error"
      />
    </Container>
  );
};

export default Products;

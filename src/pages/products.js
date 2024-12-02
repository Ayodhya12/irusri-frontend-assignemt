import React, { useEffect } from "react";
import { productsList } from "../data/products";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import { Cart } from "react-bootstrap-icons";

const Products = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToCart } = useCart();
  console.log(user);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  return (
    <div className="py-3">
      <h2 className="ps-5 pb-2">Products</h2>
      <div className="product-list px-5">
        {productsList.length === 0 ? (
          <p>No products available at the moment. Please check back later.</p>
        ) : (
          <Row xs={1} md={2} lg={4} className="g-4">
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
                        onClick={() => addToCart(product)}
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
    </div>
  );
};

export default Products;

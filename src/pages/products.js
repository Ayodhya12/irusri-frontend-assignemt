import React, { useEffect } from "react";
import { productsList } from "../data/products";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

const Products = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { addToCart } = useCart();
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {productsList.length === 0 ? (
          <p>No products available at the moment. Please check back later.</p>
        ) : (
          <div className="row">
            {productsList.map((product) => (
              <div className="col-md-4" key={product.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={`Image of ${product.name}`}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>${product.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

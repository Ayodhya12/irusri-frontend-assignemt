import React, { useState, useEffect } from "react";
import { productsList } from "../data/products";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";
import { useCart } from "../context/cartContext";
import { Cart } from "react-bootstrap-icons";
import ToastMessage from "../components/appToast";

const Products = () => {
  const { addToCart } = useCart();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priceRange: [0, 1000],
  });
  const [filteredProducts, setFilteredProducts] = useState(productsList);

  const applyFilters = () => {
    const filtered = productsList.filter((product) => {
      const matchesSearch =
        filters.search === "" ||
        product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === "" || product.category === filters.category;
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      priceRange: [0, 1000],
    });
  };

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
      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label>Search products</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </Col>
          <Col md={3}>
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Price Range</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [
                          Number(e.target.value),
                          filters.priceRange[1],
                        ],
                      })
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [
                          filters.priceRange[0],
                          Number(e.target.value),
                        ],
                      })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col
            md={2}
            className="d-flex justify-content-end align-items-end mt-2"
          >
            <Button
              variant="outline-danger"
              onClick={resetFilters}
              className="w-100"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products available at the moment. Please check back later.</p>
        ) : (
          <Row xs={1} md={2} lg={5} className="g-4">
            {filteredProducts.map((product, idx) => (
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

import React from "react";
import { useCart } from "../context/cartContext";
import { Button } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>
                Quantity:{" "}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
              </p>
              <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </div>
          ))}
          <h3>Total: ${cartTotal}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;

import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import "./cart.css";
import { useOrders } from "../context/OrdersContext";

export function Cart() {
  const {
    cartItems,
    cartCount,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();
  const { placeOrder } = useOrders();

  const SHIPPING_COST = cartCount > 0 ? 50 : 0;
  const GRAND_TOTAL = totalPrice + SHIPPING_COST;

  const handleItemClick = (id: string | number) => {
    navigate(`/product/${id}`);
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Prevent navigation when clicking buttons
    action();
  };

  if (cartItems.length === 0) {
    return (
      <Container className="page-content mt-4">
        <div className="cart-bg page-wrapper">
          <div className="cart-empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>

            <p>Your Cart is empty.</p>
            <span>Add items to your cart to see them here</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="cart-bg page-wrapper mt-5">
      <Container className="page-content">
        <h3 className="cart-title">My Cart</h3>

        <Row className="g-4">
          {/* LEFT: CART ITEMS */}
          <Col lg={8}>
            {cartItems.map((item) => (
              <div
                className="cart-item"
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                style={{ cursor: "pointer" }}>
                <div className="cart-thumb">
                  <img src={item.imgUrl} alt={item.name} />
                </div>

                <div className="cart-details">
                  <strong>{item.name}</strong>
                  <p>{formatCurrency(item.price)}</p>

                  <div className="cart-qty">
                    <Button
                      size="sm"
                      className="me-2"
                      onClick={(e) =>
                        handleButtonClick(e, () => decreaseQty(item.id))
                      }>
                      -
                    </Button>

                    <span className="me-2">{item.quantity}</span>

                    <Button
                      size="sm"
                      className="me-3"
                      onClick={(e) =>
                        handleButtonClick(e, () => increaseQty(item.id))
                      }>
                      +
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={(e) =>
                        handleButtonClick(e, () => removeFromCart(item.id))
                      }>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Col>

          {/* RIGHT: ORDER SUMMARY */}
          <Col lg={4}>
            <div className="cart-summary sticky-top">
              <h5>Order Summary</h5>

              <div className="summary-row">
                <span>Items ({cartCount})</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{formatCurrency(SHIPPING_COST)}</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>{formatCurrency(GRAND_TOTAL)}</span>
              </div>

              <Button
                className="checkout-btn"
                disabled={cartCount === 0}
                onClick={() => {
                  placeOrder(cartItems, GRAND_TOTAL);
                  navigate("/account");
                }}>
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

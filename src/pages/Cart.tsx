import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import "./cart.css";
import { useOrders } from "../hooks/useOrders";

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
    e.stopPropagation();
    action();
  };

  // ✅ Helmet-safe dynamic title & description (React 19 compatible)
  const cartTitle =
    cartCount === 0
      ? "Shopping Cart | TOHFA BY US"
      : `Shopping Cart (${cartCount} ${
          cartCount === 1 ? "item" : "items"
        }) | TOHFA BY US`;

  const cartDescription =
    cartCount === 0
      ? "Your shopping cart is empty. Browse gifts, home decor, and accessories at TOHFA BY US."
      : `Review your cart with ${cartCount} ${
          cartCount === 1 ? "item" : "items"
        } and proceed to checkout. Total: ${formatCurrency(GRAND_TOTAL)}.`;

  // ✅ Schema JSON as string (important for Helmet + React 19)
  const cartSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ShoppingCart",
    numberOfItems: cartCount,
    itemListElement: cartItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        image: `https://tohfabyus.vercel.app${item.imgUrl}`,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "INR",
        },
      },
    })),
  });

  return (
    <>
      {/* ✅ SEO (Helmet fixed) */}
      <Helmet>
        <title>{cartTitle}</title>
        <meta name="description" content={cartDescription} />
        <link rel="canonical" href="https://tohfabyus.vercel.app/cart" />
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json">{cartSchema}</script>
      </Helmet>

      {cartItems.length === 0 ? (
        <Container className="page-content mt-4">
          <div className="cart-bg page-wrapper">
            <div className="cart-empty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5" />
              </svg>

              <p>Your Cart is empty.</p>
              <span>Add items to your cart to see them here</span>
            </div>
          </div>
        </Container>
      ) : (
        <div className="cart-bg page-wrapper mt-5">
          <Container className="page-content">
            <h1 className="cart-title">My Cart</h1>

            <Row className="g-4">
              {/* LEFT: CART ITEMS */}
              <Col lg={8}>
                {cartItems.map((item) => (
                  <article
                    className="cart-item"
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    style={{ cursor: "pointer" }}
                    itemScope
                    itemType="https://schema.org/Product">
                    <div className="cart-thumb">
                      <img
                        src={item.imgUrl}
                        alt={item.name}
                        itemProp="image"
                        loading="lazy"
                      />
                    </div>

                    <div className="cart-details">
                      <strong itemProp="name">{item.name}</strong>
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
                  </article>
                ))}
              </Col>

              {/* RIGHT: ORDER SUMMARY */}
              <Col lg={4}>
                <aside className="cart-summary sticky-top">
                  <h2 className="h5">Order Summary</h2>

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
                      placeOrder(cartItems);
                      navigate("/account");
                    }}>
                    Proceed to Checkout
                  </Button>
                </aside>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

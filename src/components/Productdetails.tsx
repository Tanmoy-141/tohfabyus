import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import rawItems from "../data/items.json";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useOrders } from "../hooks/useOrders";
import { formatCurrency } from "../utilities/formatCurrency";
import "./Productdetails.css";

type StoreItemType = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  fit?: "cover" | "contain";
  category: "Gift Items" | "Home Decor" | "Accessories";
  description?: string;
  features?: string[];
};

const storeItems = rawItems as StoreItemType[];

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { placeOrder } = useOrders();

  const product = storeItems.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <h2>Product not found</h2>
        <Button onClick={() => navigate("/store")}>Back to Store</Button>
      </Container>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const decreaseQuantity = () => setQuantity((q) => Math.max(q - 1, 1));
  const increaseQuantity = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imgUrl: product.imgUrl,
    });
    setQuantity(1);
  };

  const handlePlaceOrder = () => {
    placeOrder([
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imgUrl: product.imgUrl,
      },
    ]);
    setQuantity(1);
  };

  const categoryClass =
    product.category === "Gift Items"
      ? "giftitems"
      : product.category === "Home Decor"
        ? "home-decor"
        : "accessory";

  return (
    <div className="product-details-wrapper">
      <Container className="product-details-container">
        <Button
          variant="outline-secondary"
          className="back-btn mb-4"
          onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <Row className="product-details-row">
          {/* Image Section */}
          <Col lg={6} md={6} className="product-image-col">
            <div className={`product-image-wrapper ${categoryClass}`}>
              <button
                className={`wishlist-btn-detail ${wishlisted ? "active" : ""}`}
                onClick={() =>
                  wishlisted
                    ? removeFromWishlist(product.id)
                    : addToWishlist({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imgUrl: product.imgUrl,
                      })
                }>
                {wishlisted ? "♥" : "♡"}
              </button>
              <img
                src={product.imgUrl}
                alt={product.name}
                className="product-main-image"
              />
            </div>
          </Col>

          {/* Details Section */}
          <Col lg={6} md={6} className="product-info-col">
            <div className="product-info-wrapper">
              <span className="product-category">{product.category}</span>
              <h1 className="product-name">{product.name}</h1>
              <h2 className="product-price">{formatCurrency(product.price)}</h2>

              {product.description && (
                <div className="product-description">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="product-features">
                  <h3>Key Features</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="quantity-section">
                <h3>Quantity</h3>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={decreaseQuantity}>
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button className="quantity-btn" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <Button
                  variant="dark"
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button
                  variant="success"
                  className="place-order-btn"
                  onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </div>

              {/* Additional Info */}
              <div className="product-meta">
                <div className="meta-item">
                  <strong>Product ID:</strong> {product.id}
                </div>
                <div className="meta-item">
                  <strong>Availability:</strong> In Stock
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

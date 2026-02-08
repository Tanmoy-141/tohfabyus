import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useState } from "react";

type Category = "Gift Items" | "Home Decor" | "Accessories";

type StoreItemProps = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  fit?: "cover" | "contain";
  category: Category;
};

export function StoreItem({
  id,
  name,
  price,
  imgUrl,
  fit = "contain",
  category,
}: StoreItemProps) {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const { placeOrder } = useOrders();

  const wishlisted = isWishlisted(id);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => setQuantity((q) => Math.max(q - 1, 1));
  const increaseQuantity = () => setQuantity((q) => q + 1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, quantity, imgUrl });
    setQuantity(1);
  };

  const handlePlaceOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    placeOrder([{ id, name, price, quantity, imgUrl }], price * quantity);
    setQuantity(1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    wishlisted
      ? removeFromWishlist(id)
      : addToWishlist({ id, name, price, imgUrl });
  };

  const categoryClass =
    category === "Gift Items"
      ? "giftitems"
      : category === "Home Decor"
        ? "home-decor"
        : "accessory";

  return (
    <Card className={`store-card ${categoryClass} w-100`}>
      <Link to={`/product/${id}`} className="product-link">
        <div className={`store-img-wrapper ${fit}`}>
          <button
            className={`wishlist-btn ${wishlisted ? "active" : ""}`}
            onClick={handleWishlistToggle}>
            ♥
          </button>

          <img src={imgUrl} alt={name} />
        </div>

        <Card.Body className="store-body">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{formatCurrency(price)}</Card.Text>
        </Card.Body>
      </Link>

      <div className="store-body" style={{ paddingTop: 0 }}>
        <div className="quantity-wrapper">
          <button
            onClick={(e) => {
              e.preventDefault();
              decreaseQuantity();
            }}>
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              increaseQuantity();
            }}>
            +
          </button>

          <Button size="sm" variant="dark" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>

        <Button
          size="sm"
          variant="success"
          className="mt-2"
          onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </Card>
  );
}

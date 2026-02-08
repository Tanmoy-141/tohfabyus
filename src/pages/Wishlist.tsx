import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import "./wishlist.css";

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (
    e: React.MouseEvent,
    id: string | number,
  ) => {
    e.stopPropagation(); // Prevent card click when removing
    removeFromWishlist(id);
  };

  const handleCardClick = (id: string | number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="wishlist-bg page-wrapper mt-5">
      <Container className="page-content">
        <h3 className="wishlist-title">My Wishlist</h3>

        {wishlist.length === 0 ? (
          /* EMPTY STATE */
          <div className="wishlist-empty">
            <svg width="56" height="56" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15
                 -7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>

            <p>Your wishlist is empty.</p>
            <span>Save items you love to see them here.</span>
          </div>
        ) : (
          /* WISHLIST GRID */
          <Row className="g-3">
            {wishlist.map((item) => (
              <Col lg={3} md={4} sm={6} xs={12} key={item.id}>
                <Card
                  className="store-card w-100"
                  onClick={() => handleCardClick(item.id)}
                  style={{ cursor: "pointer" }}>
                  <div className="store-img-wrapper">
                    {/* Remove button */}
                    <button
                      className="wishlist-btn active"
                      onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                      aria-label="Remove from wishlist">
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="currentColor">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>

                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="store-image"
                    />
                  </div>

                  <Card.Body className="store-body">
                    <Card.Title className="mb-1">{item.name}</Card.Title>
                    <Card.Text className="mb-0">₹{item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

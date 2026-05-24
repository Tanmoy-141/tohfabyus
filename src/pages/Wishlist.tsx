import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          {wishlist.length > 0
            ? `My Wishlist (${wishlist.length} ${wishlist.length === 1 ? "item" : "items"}) | TOHFA BY US`
            : "My Wishlist | TOHFA BY US"}
        </title>
        <meta
          name="description"
          content={
            wishlist.length > 0
              ? `View and manage your ${wishlist.length} saved ${wishlist.length === 1 ? "item" : "items"} in your TOHFA BY US wishlist.`
              : "Save your favorite products from TOHFA BY US in your wishlist for easy access later."
          }
        />
        <link rel="canonical" href="https://tohfabyus.vercel.app/wishlist" />
        <meta name="robots" content="noindex, follow" />

        {/* Wishlist Schema (if items exist) */}
        {wishlist.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Wishlist",
              numberOfItems: wishlist.length,
              itemListElement: wishlist.map((item, index) => ({
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
                    availability: "https://schema.org/InStock",
                  },
                },
              })),
            })}
          </script>
        )}
      </Helmet>

      <div className="wishlist-bg page-wrapper mt-5">
        <Container className="page-content">
          <h1 className="wishlist-title">My Wishlist</h1>

          {wishlist.length === 0 ? (
            /* EMPTY STATE */
            <div className="wishlist-empty">
              <svg
                width="56"
                height="56"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
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
                    style={{ cursor: "pointer" }}
                    itemScope
                    itemType="https://schema.org/Product"
                  >
                    <div className="store-img-wrapper">
                      {/* Remove button */}
                      <button
                        className="wishlist-btn active"
                        onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>

                      <img
                        src={item.imgUrl}
                        alt={item.name}
                        className="store-image"
                        itemProp="image"
                        loading="lazy"
                      />
                    </div>

                    <Card.Body className="store-body">
                      <Card.Title className="mb-1" itemProp="name">
                        {item.name}
                      </Card.Title>
                      <Card.Text className="mb-0">
                        <span
                          itemProp="offers"
                          itemScope
                          itemType="https://schema.org/Offer"
                        >
                          <meta itemProp="priceCurrency" content="INR" />
                          <meta
                            itemProp="price"
                            content={item.price.toString()}
                          />
                          <link
                            itemProp="availability"
                            href="https://schema.org/InStock"
                          />
                          ₹{item.price}
                        </span>
                      </Card.Text>
                    </Card.Body>

                    {/* Hidden brand for SEO */}
                    <meta itemProp="brand" content="TOHFA BY US" />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

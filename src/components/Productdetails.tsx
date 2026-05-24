import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
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

  // Generate category URL slug
  const categorySlug = product.category.toLowerCase().replace(/\s+/g, "-");

  // SEO: Generate product schema markup
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [`https://tohfabyus.vercel.app${product.imgUrl}`],
    description:
      product.description ||
      `${product.name} from TOHFA BY US - ${product.category}`,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "TOHFA BY US",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `https://tohfabyus.vercel.app/product/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "TOHFA BY US",
      },
    },
  };

  // SEO: Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tohfabyus.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `https://tohfabyus.vercel.app/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://tohfabyus.vercel.app/product/${product.id}`,
      },
    ],
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{product.name} | TOHFA BY US</title>
        <meta name="title" content={`${product.name} | TOHFA BY US`} />
        <meta
          name="description"
          content={
            product.description ||
            `Buy ${product.name} at TOHFA BY US. ${product.category} - Premium quality products.`
          }
        />
        <meta
          name="keywords"
          content={`${product.name}, ${product.category}, buy ${product.name}, online shopping, TOHFA BY US`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://tohfabyus.vercel.app/product/${product.id}`}
        />
        <meta property="og:title" content={`${product.name} | TOHFA BY US`} />
        <meta
          property="og:description"
          content={product.description || `Buy ${product.name} at TOHFA BY US`}
        />
        <meta
          property="og:image"
          content={`https://tohfabyus.vercel.app${product.imgUrl}`}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://tohfabyus.vercel.app/product/${product.id}`}
        />
        <meta
          property="twitter:title"
          content={`${product.name} | TOHFA BY US`}
        />
        <meta
          property="twitter:description"
          content={product.description || `Buy ${product.name} at TOHFA BY US`}
        />
        <meta
          property="twitter:image"
          content={`https://tohfabyus.vercel.app${product.imgUrl}`}
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://tohfabyus.vercel.app/product/${product.id}`}
        />

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="product-details-wrapper">
        <Container className="product-details-container">
          <Button
            variant="outline-secondary"
            className="back-btn mb-4"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>

          {/* SEO: Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol
              className="breadcrumb"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                className="breadcrumb-item"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <a itemProp="item" href="/">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li
                className="breadcrumb-item"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <a itemProp="item" href={`/${categorySlug}`}>
                  <span itemProp="name">{product.category}</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name">{product.name}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* SEO: Product structured data wrapper */}
          <article itemScope itemType="https://schema.org/Product">
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
                    }
                    aria-label={
                      wishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    {wishlisted ? "♥" : "♡"}
                  </button>
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="product-main-image"
                    itemProp="image"
                    loading="eager"
                  />
                </div>
              </Col>

              {/* Details Section */}
              <Col lg={6} md={6} className="product-info-col">
                <div className="product-info-wrapper">
                  <span className="product-category" itemProp="category">
                    {product.category}
                  </span>
                  <h1 className="product-name" itemProp="name">
                    {product.name}
                  </h1>

                  {/* SEO: Price with structured data */}
                  <h2 className="product-price">
                    <span
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <meta itemProp="priceCurrency" content="INR" />
                      <meta
                        itemProp="price"
                        content={product.price.toString()}
                      />
                      <link
                        itemProp="availability"
                        href="https://schema.org/InStock"
                      />
                      {formatCurrency(product.price)}
                    </span>
                  </h2>

                  {product.description && (
                    <div className="product-description">
                      <h3>Description</h3>
                      <p itemProp="description">{product.description}</p>
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
                      <button
                        className="quantity-btn"
                        onClick={decreaseQuantity}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span
                        className="quantity-display"
                        aria-label={`Quantity: ${quantity}`}
                      >
                        {quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={increaseQuantity}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <Button
                      variant="dark"
                      className="add-to-cart-btn"
                      onClick={handleAddToCart}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="success"
                      className="place-order-btn"
                      onClick={handlePlaceOrder}
                      aria-label={`Place order for ${product.name}`}
                    >
                      Place Order
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="product-meta">
                    <div className="meta-item">
                      <strong>Product ID:</strong>{" "}
                      <span itemProp="sku">{product.id}</span>
                    </div>
                    <div className="meta-item">
                      <strong>Availability:</strong>{" "}
                      <span itemProp="availability">In Stock</span>
                    </div>
                  </div>

                  {/* Hidden brand info for SEO */}
                  <meta itemProp="brand" content="TOHFA BY US" />
                </div>
              </Col>
            </Row>
          </article>
        </Container>
      </div>
    </>
  );
}

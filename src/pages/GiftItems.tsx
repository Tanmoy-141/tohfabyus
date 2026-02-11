import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import rawItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem";
import "../pages/store.css";

type StoreItemType = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  fit?: "cover" | "contain";
  category: "Gift Items" | "Home Decor" | "Accessories";
};

const storeItems = rawItems as StoreItemType[];

export function GiftItems() {
  const filteredItems = storeItems.filter(
    (item) => item.category === "Gift Items",
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          Gift Items | TOHFA BY US - Unique Gifts for Every Occasion
        </title>
        <meta
          name="description"
          content="Shop the best gift items at TOHFA BY US. Find unique and quality products perfect for birthdays, anniversaries, weddings, and special occasions. Browse our curated collection of thoughtful gifts."
        />
        <meta
          name="keywords"
          content="gift items, gifts, personalized gifts, birthday gifts, anniversary gifts, wedding gifts, unique gifts, buy gifts online, TOHFA BY US"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://tohfabyus.vercel.app/gift-items"
        />
        <meta
          property="og:title"
          content="Gift Items | TOHFA BY US - Unique Gifts for Every Occasion"
        />
        <meta
          property="og:description"
          content="Shop the best gift items at TOHFA BY US. Perfect for any occasion."
        />
        <meta
          property="og:image"
          content="https://tohfabyus.vercel.app/images/tohfa300.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://tohfabyus.vercel.app/gift-items"
        />
        <meta property="twitter:title" content="Gift Items | TOHFA BY US" />
        <meta
          property="twitter:description"
          content="Shop the best gift items at TOHFA BY US. Perfect for any occasion."
        />
        <meta
          property="twitter:image"
          content="https://tohfabyus.vercel.app/images/tohfa300.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://tohfabyus.vercel.app/gift-items" />
      </Helmet>

      <div className="page-wrapper store-bg mt-5">
        <div className="container page-content">
          {/* Optional: Add a heading for SEO */}
          <h1 className="visually-hidden">Gift Items Collection</h1>

          <Row lg={4} md={2} sm={2} xs={1} className="store-grid g-2">
            {filteredItems.map((item) => (
              <Col key={item.id} className="d-flex align-items-stretch">
                <StoreItem {...item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

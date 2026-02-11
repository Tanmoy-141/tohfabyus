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

export function Accessories() {
  const filteredItems = storeItems.filter(
    (item) => item.category === "Accessories",
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Accessories | TOHFA BY US - Stylish Fashion Accessories</title>
        <meta
          name="description"
          content="Complete your look with stylish accessories from TOHFA BY US. Browse our collection of jewelry, bags, and fashion accessories. Premium quality products at great prices."
        />
        <meta
          name="keywords"
          content="accessories, fashion accessories, jewelry, bags, style accessories, fashion items, trendy accessories, TOHFA BY US"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://tohfabyus.vercel.app/accessories"
        />
        <meta
          property="og:title"
          content="Accessories | TOHFA BY US - Stylish Fashion Accessories"
        />
        <meta
          property="og:description"
          content="Complete your look with stylish accessories from TOHFA BY US."
        />
        <meta
          property="og:image"
          content="https://tohfabyus.vercel.app/images/tohfa300.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://tohfabyus.vercel.app/accessories"
        />
        <meta property="twitter:title" content="Accessories | TOHFA BY US" />
        <meta
          property="twitter:description"
          content="Complete your look with stylish accessories from TOHFA BY US."
        />
        <meta
          property="twitter:image"
          content="https://tohfabyus.vercel.app/images/tohfa300.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://tohfabyus.vercel.app/accessories" />
      </Helmet>

      <div className="page-wrapper store-bg mt-5">
        <div className="container page-content">
          {/* Optional: Add a heading for SEO */}
          <h1 className="visually-hidden">Accessories Collection</h1>

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

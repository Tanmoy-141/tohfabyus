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

export function HomeDecor() {
  const filteredItems = storeItems.filter(
    (item) => item.category === "Home Decor",
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Home Decor | TOHFA BY US - Transform Your Living Space</title>
        <meta
          name="description"
          content="Transform your space with beautiful home decor from TOHFA BY US. Shop decorative items, wall art, lighting, and accessories to make your house a home. Premium quality home decoration products."
        />
        <meta
          name="keywords"
          content="home decor, home decoration, decorative items, wall art, home accessories, interior decor, living room decor, bedroom decor, TOHFA BY US"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://tohfabyus.vercel.app/home-decor"
        />
        <meta
          property="og:title"
          content="Home Decor | TOHFA BY US - Transform Your Living Space"
        />
        <meta
          property="og:description"
          content="Transform your space with beautiful home decor from TOHFA BY US."
        />
        <meta
          property="og:image"
          content="https://tohfabyus.vercel.app/images/tohfa300.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://tohfabyus.vercel.app/home-decor"
        />
        <meta property="twitter:title" content="Home Decor | TOHFA BY US" />
        <meta
          property="twitter:description"
          content="Transform your space with beautiful home decor from TOHFA BY US."
        />
        <meta
          property="twitter:image"
          content="https://tohfabyus.vercel.app/images/tohfa300.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://tohfabyus.vercel.app/home-decor" />
      </Helmet>

      <div className="page-wrapper store-bg mt-5">
        <div className="container page-content">
          {/* Optional: Add a heading for SEO */}
          <h1 className="visually-hidden">Home Decor Collection</h1>

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

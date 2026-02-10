import { Link } from "react-router-dom";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import { ChevronRight, Heart, Gift, Home as HomeIcon } from "lucide-react";
import rawItems from "../data/items.json";
import "./home.css";
import { AnimatedCounterSection } from "../components/AnimatedCounter";

type StoreItemType = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  fit?: "cover" | "contain";
  category: "Gift Items" | "Home Decor" | "Accessories";
};

const storeItems = rawItems as StoreItemType[];

export function Home() {
  const featuredItems = storeItems.slice(0, 6);

  return (
    <div className="page-wrapper home-bg mt-4">
      <div className="page-content">
        <Container className="mb-5">
          <Card className="welcome-card shadow-sm">
            <Card.Body className="text-center py-5">
              <h1 className="home-title mb-3">
                Welcome to{" "}
                <Link to="/" className="brand-link-home">
                  TOHFA by US
                </Link>
              </h1>
              <p className="home-text lead mb-4">
                Discover unique gifts, beautiful home decor, and exquisite
                accessories that bring joy to every moment
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button
                  as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                  to="/gift-items"
                  variant="outline-danger"
                  size="sm">
                  <Gift size={20} className="me-2" />
                  Explore Gifts
                </Button>
                <Button
                  as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                  to="/home-decor"
                  variant="outline-danger"
                  size="sm">
                  <HomeIcon size={20} className="me-2" />
                  Revamp Home
                </Button>
                <Button
                  as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                  to="/accessories"
                  variant="outline-danger"
                  size="sm">
                  <Gift size={20} className="me-2" />
                  Find Accessories
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>

        <AnimatedCounterSection />

        <Container className="mb-5">
          <div className="section-header mb-4">
            <h2 className="home-highlight">Featured Products</h2>
            <p className="home-text">Handpicked selections just for you</p>
          </div>

          <Carousel
            indicators={true}
            controls={true}
            interval={3000}
            className="product-carousel">
            {featuredItems.map((item) => (
              <Carousel.Item key={item.id}>
                <div className="carousel-item-wrapper">
                  <div className="carousel-image-container">
                    <img
                      src={item.imgUrl}
                      alt={item.name}
                      className="carousel-product-image"
                      style={{ objectFit: item.fit || "contain" }}
                    />
                  </div>
                  <Carousel.Caption className="carousel-custom-caption">
                    <div className="caption-content">
                      <h3>{item.name}</h3>
                      <p className="price-tag">₹{item.price.toFixed(2)}</p>
                      <Button
                        as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                        to={`/${item.category.toLowerCase().replace(/ /g, "-")}`}
                        variant="outline-light"
                        size="sm"
                        className="mt-2">
                        <span>View Collection</span>
                        <ChevronRight size={14} />
                      </Button>
                    </div>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>

        <Container className="mb-5">
          <Card className="about-tohfa-card shadow-sm">
            <Row className="g-0 align-items-center">
              <Col md={6}>
                <div className="about-image-wrapper">
                  <img
                    src="/images/tohfa300.png"
                    alt="TOHFA by US"
                    className="about-image"
                  />
                </div>
              </Col>
              <Col md={6}>
                <Card.Body className="p-5">
                  <div className="about-icon mb-3">
                    <Heart size={40} className="text-danger" />
                  </div>
                  <h2 className="home-highlight mb-3">About TOHFA by US</h2>
                  <p className="home-text mb-4">
                    TOHFA by US is your destination for thoughtfully curated
                    gifts and home decor that celebrate life special moments. We
                    believe every gift tells a story, and every space deserves
                    beauty.
                  </p>
                  <p className="home-text mb-4">
                    From heartfelt books to stunning wall art and elegant
                    accessories, we bring you collections that inspire joy and
                    create memories.
                  </p>
                  <Button
                    as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                    to="/aboutus"
                    variant="danger"
                    size="lg"
                    className="d-flex align-items-center gap-2">
                    <span>Learn More About Us</span>
                    <ChevronRight size={18} />
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>

        <Container className="mb-5">
          <div className="section-header mb-4 text-center">
            <h2 className="home-highlight">Shop by Category</h2>
            <p className="home-text">Find exactly what you are looking for</p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="category-card h-100 shadow-sm">
                <div className="category-image-wrapper">
                  <img
                    src="/images/Jetuku Bristi bhalo-book.jpg"
                    alt="Gift Items"
                    className="category-image"
                  />
                </div>
                <Card.Body className="text-center">
                  <h3 className="mb-3">Gift Items</h3>
                  <p className="home-text mb-3">
                    Thoughtful presents for loved ones
                  </p>
                  <Button
                    as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                    to="/gift-items"
                    variant="outline-danger">
                    Explore Gifts
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="category-card h-100 shadow-sm">
                <div className="category-image-wrapper">
                  <img
                    src="/images/homedecor-painting1.jpg"
                    alt="Home Decor"
                    className="category-image"
                  />
                </div>
                <Card.Body className="text-center">
                  <h3 className="mb-3">Home Decor</h3>
                  <p className="home-text mb-3">Transform your living spaces</p>
                  <Button
                    as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                    to="/home-decor"
                    variant="outline-danger">
                    Explore Decor
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="category-card h-100 shadow-sm">
                <div className="category-image-wrapper">
                  <img
                    src="/images/homedecor-painting5.jpg"
                    alt="Accessories"
                    className="category-image"
                  />
                </div>
                <Card.Body className="text-center">
                  <h3 className="mb-3">Accessories</h3>
                  <p className="home-text mb-3">Complete your perfect look</p>
                  <Button
                    as={Link as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                    to="/accessories"
                    variant="outline-danger">
                    Explore Accessories
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

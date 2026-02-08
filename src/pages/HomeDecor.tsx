import { Col, Row } from "react-bootstrap";
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
    <div className="page-wrapper store-bg mt-5">
      <div className="container page-content">
        <Row lg={4} md={2} sm={2} xs={1} className="store-grid g-2">
          {filteredItems.map((item) => (
            <Col key={item.id} className="d-flex align-items-stretch">
              <StoreItem {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

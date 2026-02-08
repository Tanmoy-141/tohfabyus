import { Header } from "./components/Header.tsx";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home.tsx";
import { GiftItems } from "./pages/GiftItems.tsx";
import { HomeDecor } from "./pages/HomeDecor.tsx";
import { Accessories } from "./pages/Accessories.tsx";
import { ProductDetails } from "./components/Productdetails.tsx";
import { Wishlist } from "./pages/Wishlist";
import { Cart } from "./pages/Cart.tsx";
import { AboutUs } from "./pages/AboutUs.tsx";
import { Account } from "./pages/Account.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup.tsx";
import { ProtectedRoute } from "./context/ProtectedRoute.tsx";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <SearchProvider>
          <CartProvider>
            <OrdersProvider>
              <div className="app-root">
                <Header />
                <Container className="mb-4 flex-fill">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gift-items" element={<GiftItems />} />
                    <Route path="/home-decor" element={<HomeDecor />} />
                    <Route path="/accessories" element={<Accessories />} />
                    {/* Product Details Route */}
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoute>
                          <Account />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Container>
              </div>
            </OrdersProvider>
          </CartProvider>
        </SearchProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;

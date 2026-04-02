import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import Profile from "./components/Profile";
import { CartContext } from "./context/CartContext";
import "./styles/styles.css";

function App() {
    const navigate = useNavigate();

    const { cart } = useContext(CartContext);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`header ${isScrolled ? "scrolled" : ""}`}>
                <div className="header-inner">
                    <div className="logo" onClick={() => navigate("/")}>
                        🛍️ ShopZone
                    </div>

                    <nav>
                        <button onClick={() => navigate("/")}>🏠 Shop</button>
                        <button onClick={() => navigate("/cart")}>
                            🛒 Cart <span className="cart-counter">{cartCount}</span>
                        </button>
                        <button onClick={() => navigate("/orders")}>📦 Orders</button>
                        <button onClick={() => navigate("/profile")}>👤 Profile</button>
                    </nav>
                </div>
            </header>

            <main className="container">
                <Routes>
                    <Route path="/" element={<ProductGrid />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
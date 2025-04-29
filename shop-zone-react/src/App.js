import React, { useState, useContext, useEffect} from "react";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import Profile from "./components/Profile";
import { CartProvider, CartContext } from "./context/CartContext"; // Corrected path
import "./styles/styles.css"; // Corrected path
function App() {
    const [view, setView] = useState("products");
    const { cart } = useContext(CartContext);
    console.log("App component rendered");
    const [cartCount, setCartCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false); // Added darkMode state
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("darkMode");
        if (savedTheme === "true") {
            document.body.classList.add("dark-mode");
            setDarkMode(true);
        }
        //srol0lgic
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); 
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); // Очистка
    }, []);

    

    useEffect(() => {
        const newCartCount = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
        console.log("Cart count updated:", newCartCount);
    }, [cart]);

    const toggleDarkMode = () => { // Added toggleDarkMode function
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.body.classList.toggle("dark-mode", newMode);
        localStorage.setItem("darkMode", newMode);
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Плавная прокрутка вверх
    };

    return (
            <div className="App">
                <header className={isScrolled ? "scrolled" : ""}>
                    <h1 className="logo">ShopZone</h1>
                    <nav>
                        <button onClick={() => setView("products")} className="nav-btn">
                            <i class="fi fi-rr-apps" width="24" height="24" viewBox="0 -200 24 24" fill="white"></i>
                            <span className="nav-text"> Products</span>
                        </button>
                        <button onClick={() => setView("cart")} className="nav-btn">
                            <span className="cart-counter">{cartCount}</span>
                            <svg className="nav-icon" width="24" height="24" viewBox="0 -2 24 24" fill="white">
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                            <span className="nav-text"> Cart</span>
                        </button>
                        <button onClick={() => setView("orders")} className="nav-btn">
                            <svg className="nav-icon" width="24" height="24" viewBox="0 -3 24 24" fill="white">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            <span className="nav-text"> Orders</span>
                        </button>
                        <button onClick={() => setView("profile")} className="nav-btn">
                            <svg className="nav-icon" width="24" height="24" viewBox="0 -3.8 24 24" fill="white">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            <span className="nav-text"> Profile</span>
                        </button>
                        <button onClick={toggleDarkMode} className="nav-btn">
                            <svg
                                className="nav-icon"
                                width="24"
                                height="24"
                                viewBox="0 -2 24 24"
                                fill="white"
                            >
                                {darkMode ? (
                                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                                    
                                    // <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                                ) : (
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    
                                    // <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                )}
                            </svg>
                            <span className="nav-text">{darkMode ? " Light Mode" : " Dark Mode"}</span>
                        </button>
                    </nav>
                    {/* <nav>
                        <button onClick={() => setView("products")}>Products</button>
                        <button onClick={() => setView("cart")}>
                            Cart <span className="cart-counter">{cartCount}</span>
                        </button>
                        <button onClick={() => setView("orders")}>Orders</button>
                        <button onClick={() => setView("profile")}>Profile</button>
                        <button onClick={toggleDarkMode}>
                            {darkMode ? "☀️ Light Mode" : " Dark Mode"}
                        </button>
                    </nav> */}
                </header>
                <main>
                    {view === "products" && <ProductGrid />}
                    {view === "cart" && <Cart onGoToCheckout={() => setView("checkout")} />}
                    {view === "checkout" && <Checkout onGoBack={() => setView("cart")} onGoToOrders={() => setView("orders")} />}
                    {view === "orders" && <OrderHistory onGoBack={() => setView("products")} />}
                    {view === "profile" && <Profile onGoBack={() => setView("products")} />}
                </main>
                <footer>
                <p>All rights reserved 2025. Web created by [DiSTDio].</p>
            </footer>
            <button className={`scroll-to-top ${isScrolled ? "visible" : ""}`} onClick={scrollToTop}>
                ↑
            </button>
            </div>
    );
}

export default App;


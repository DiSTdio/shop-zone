import React, { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingProduct = state.find((item) => item.id === action.payload.id);
            return existingProduct
                ? state.map((item) =>
                      item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                  )
                : [...state, { ...action.payload, quantity: 1 }];
        case "REMOVE_FROM_CART":
            const itemToUpdate = state.find((item) => item.id === action.payload);
            if (itemToUpdate && itemToUpdate.quantity > 1) {
                return state.map((item) =>
                    item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return state.filter((item) => item.id !== action.payload);
            }
        case "DELETE_PRODUCT_FROM_CART":
            return state.filter((item) => item.id !== action.payload);
        case "CLEAR_CART": 
            return [];
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                return JSON.parse(savedCart);
            } catch (error) {
                console.error("Error parsing cart:", error);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart in context updated:", cart);
    }, [cart]);

    const addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
        console.log("Product added", product.id);
    };

    const removeFromCart = (productId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: productId });
        console.log("CartContext setCart called after removing minus 1", localStorage.getItem('cart'));
    };

    const deleteProductFromCart = (productId) => {
        dispatch({ type: "DELETE_PRODUCT_FROM_CART", payload: productId });
        console.log("CartContext setCart called after deleting", localStorage.getItem('cart'));
    };

    const clearCart = () => { 
        dispatch({ type: "CLEAR_CART" });
        console.log("Cart cleared");
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteProductFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


import React, { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

// action types
const ACTIONS = {
    ADD: "ADD_TO_CART",
    REMOVE: "REMOVE_FROM_CART",
    DELETE: "DELETE_PRODUCT_FROM_CART",
    CLEAR: "CLEAR_CART",
};

// reducer (чистая функция)
const cartReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD: {
            const existing = state.find(item => item.id === action.payload.id);

            if (existing) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...state, { ...action.payload, quantity: 1 }];
        }

        case ACTIONS.REMOVE: {
            const existing = state.find(item => item.id === action.payload);

            if (!existing) return state;

            if (existing.quantity > 1) {
                return state.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }

            return state.filter(item => item.id !== action.payload);
        }

        case ACTIONS.DELETE:
            return state.filter(item => item.id !== action.payload);

        case ACTIONS.CLEAR:
            return [];

        default:
            return state;
    }
};

// init
const getInitialCart = () => {
    try {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

    // sync
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // API (чистый слой)
    const addToCart = (product) => {
        if (!product?.id) return;
        dispatch({ type: ACTIONS.ADD, payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: ACTIONS.REMOVE, payload: id });
    };

    const deleteProductFromCart = (id) => {
        dispatch({ type: ACTIONS.DELETE, payload: id });
    };

    const clearCart = () => {
        dispatch({ type: ACTIONS.CLEAR });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                deleteProductFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
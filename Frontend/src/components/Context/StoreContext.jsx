import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { medicine_list } from "../../assets/assets"; // ⬅️ make sure this is correct path

// ✅ Create named context
export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [state, setState] = useState("example");
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Error reading user from localStorage:", err);
      return null;
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      console.error("Error reading cart from localStorage:", err);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      updated[itemId] -= 1;
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });
  }, []);

  const getCartCount = useCallback(
    () => Object.values(cartItems).reduce((acc, qty) => acc + qty, 0),
    [cartItems]
  );

  const clearCart = useCallback(() => setCartItems({}), []);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_token");
  }, []);

  // ✅ Add this function
  const getTotalCartAmount = useCallback(() => {
    return medicine_list.reduce((total, item) => {
      if (cartItems[item._id]) {
        return total + item.price * cartItems[item._id];
      }
      return total;
    }, 0);
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      state,
      setState,
      cartItems,
      addToCart,
      removeFromCart,
      getCartCount,
      clearCart,
      getTotalCartAmount, // ✅ added here
      user,
      login,
      logout,
    }),
    [state, cartItems, addToCart, removeFromCart, getCartCount, clearCart, getTotalCartAmount, user, login, logout]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

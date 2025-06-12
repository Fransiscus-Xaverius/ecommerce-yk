import { useState } from "react";

/**
 * Custom hook for managing cart functionality
 * @returns {Object} - Cart state and management functions
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => prev + 1);
    setCartProducts((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const product = cartProducts.find((item) => item.id === productId);
    if (product) {
      setCartItems((prev) => prev - product.quantity);
      setCartProducts((prev) => prev.filter((item) => item.id !== productId));
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartProducts((prev) => {
      const oldProduct = prev.find((item) => item.id === productId);
      const quantityDiff = newQuantity - (oldProduct ? oldProduct.quantity : 0);
      setCartItems((prevCount) => prevCount + quantityDiff);

      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems(0);
    setCartProducts([]);
  };

  const getTotalPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return {
    cartItems,
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  };
};

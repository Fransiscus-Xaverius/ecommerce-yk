import { useState } from "react";

/**
 * Custom hook for managing wishlist functionality
 */
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
  };
};

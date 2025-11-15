import React from "react";
import { formatPrice } from "../../utils/helpers";

/**
 * Price component: handles display of original and discounted prices consistently.
 * Props:
 *  - original (number)
 *  - discount (number) optional
 *  - className (string) wrapper extra classes
 *  - size (sm|md|lg) to control typography scale
 */
export const Price = ({ original = 0, discount = 0, className = "", size = "md" }) => {
  const hasDiscount = discount && discount > 0 && discount < original;
  const sizeMap = {
    sm: "text-sm sm:text-base",
    md: "text-base sm:text-lg md:text-xl",
    lg: "text-lg sm:text-xl md:text-2xl",
  };

  return (
    <div className={`flex flex-col ${className}`.trim()}>
      <span className={`font-bold text-milky-blue ${sizeMap[size]}`}>
        {formatPrice(hasDiscount ? discount : original)}
      </span>
      <span
        className={`text-xs text-gray-500 sm:text-sm md:text-base ${hasDiscount ? "line-through" : "invisible"}`}
        aria-hidden={!hasDiscount}
      >
        {formatPrice(original)}
      </span>
    </div>
  );
};

export default Price;

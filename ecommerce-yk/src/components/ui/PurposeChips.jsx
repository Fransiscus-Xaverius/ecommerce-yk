import React from "react";

/**
 * Purpose Chips Component
 * Displays purpose categories as styled chips
 * @param {Array} purposes - Array of purpose strings
 * @param {string} size - "small" or "large" (default: "large")
 */
const PurposeChips = ({ purposes = [], size = "large" }) => {
  if (!purposes || purposes.length === 0) {
    return null;
  }

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    large: "px-3 py-1.5 text-sm",
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-gray-900">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {purposes.map((purpose, index) => (
          <span
            key={index}
            className={`inline-flex items-center rounded-full border border-blue-200 bg-blue-50 font-medium text-blue-700 transition-colors hover:bg-blue-100 ${sizeClasses[size]} `}
          >
            {purpose}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PurposeChips;

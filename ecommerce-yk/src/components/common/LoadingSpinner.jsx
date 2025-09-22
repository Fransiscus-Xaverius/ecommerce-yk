import React from "react";

const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-12 w-12 border-4",
};

export const LoadingSpinner = ({ size = "md", label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-solid border-milky-blue border-b-transparent ${sizes[size]}`}
      ></div>
      {label && <p className="mt-3 text-sm text-gray-600">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;

import React from "react";
import { Star } from "lucide-react";

/**
 * Specification Rating Component
 * Displays comfort, style, and support ratings on a 5-point scale
 * @param {Object} rating - Rating object with comfort, style, support values (0-5)
 * @param {string} displayType - "star", "stars", or "progress" (default: "progress")
 */
const SpecificationRating = ({ rating, displayType = "progress" }) => {
  const specifications = [
    { key: "comfort", label: "Comfort", value: rating?.comfort || 0 },
    { key: "style", label: "Style", value: rating?.style || 0 },
    { key: "support", label: "Support", value: rating?.support || 0 },
  ];

  const renderStars = (value) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`transition-colors ${star <= value ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
    );
  };

  const renderProgressBar = (value) => {
    return (
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300"
            style={{ width: `${(value / 5) * 100}%` }}
          />
        </div>
        <span className="min-w-[2rem] text-sm font-medium text-gray-600">{value}/5</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Product Specifications</h3>
      <div className="space-y-3">
        {specifications.map((spec) => (
          <div key={spec.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize text-gray-700">{spec.label}</span>
              {(displayType === "stars" || displayType === "star") && (
                <span className="text-sm text-gray-500">{spec.value}/5</span>
              )}
            </div>
            {displayType === "stars" || displayType === "star"
              ? renderStars(spec.value)
              : renderProgressBar(spec.value)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificationRating;

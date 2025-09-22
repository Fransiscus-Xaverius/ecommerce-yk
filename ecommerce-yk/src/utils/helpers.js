// Utility functions for the Yongki Komaladi website

/**
 * Format price to Indonesian Rupiah currency
 * @param {number} price - The price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Scroll carousel in specified direction
 * @param {React.RefObject} ref - The carousel ref
 * @param {string} direction - 'left' or 'right'
 */
export const scrollCarousel = (ref, direction) => {
  if (ref.current) {
    // Updated scroll amount to match new card width (280px) + gap (24px)
    const scrollAmount = 304;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};

/**
 * Fetches CSS from a URL, prefixes all rules with a scope selector,
 * and injects it into a <style> tag in the document head.
 * Returns a cleanup function to remove the <style> tag.
 * @param {string} cssUrl - The URL of the CSS file to load.
 * @param {string} scope - The selector to scope the CSS rules to (e.g., '.my-component').
 */
export const loadScopedCSS = (cssUrl, scope) => {
  const styleElement = document.createElement("style");
  styleElement.setAttribute("data-scoped-css-url", cssUrl);

  const scopeCss = (css, scope) => {
    const selectorRegex = /([^,{}]+)(,(?=[^}]*{)|\s*{)/g;

    return css.replace(selectorRegex, (match, selectorStr) => {
      const selector = selectorStr.trim();

      // Do not scope @-rules or keyframe animations
      if (selector.startsWith("@") || /%$/.test(selector) || selector.startsWith("from") || selector.startsWith("to")) {
        return match;
      }

      // Replace :root with the scope to make CSS variables work.
      // Apply body/html styles directly to the scope.
      if (selector === ":root" || selector === "body" || selector === "html") {
        return scope + match.slice(selectorStr.length);
      }

      // For other selectors, prepend the scope.
      const scopedSelector = selector
        .split(",")
        .map((part) => `${scope} ${part.trim()}`)
        .join(", ");

      return scopedSelector + match.slice(selectorStr.length);
    });
  };

  fetch(cssUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      return res.text();
    })
    .then((css) => {
      styleElement.textContent = scopeCss(css, scope);
      document.head.appendChild(styleElement);
    })
    .catch((err) => console.error(`Failed to load scoped CSS from ${cssUrl}`, err));

  return () => {
    if (styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }
  };
};

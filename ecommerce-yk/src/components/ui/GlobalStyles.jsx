import React from "react";

/**
 * Global styles component that injects CSS
 */
const GlobalStyles = () => {
  return (
    <style jsx>{`
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .hover-scale:hover {
        transform: scale(1.1);
      }
      .hover-purple:hover {
        color: #9333ea !important;
      }
      .fill-warning {
        fill: #ffc107;
      }
      .fill-danger {
        fill: #dc3545;
      }
      .bg-clip-text {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
      .product-card {
        transition: all 0.3s ease;
      }
      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      }
      .cursor-pointer {
        cursor: pointer;
      }
      .fill-warning {
        fill: #ffc107;
      }
      .text-warning {
        color: #ffc107 !important;
      }
      .platform-button {
        transition: all 0.3s ease;
      }
      .platform-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      .product-card:hover .shoe-icon {
        transform: rotate(-10deg) scale(1.1);
      }
      .shoe-icon {
        transition: transform 0.3s ease;
      }
      .draggable-carousel {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        max-width: 100%;
        overflow-x: auto;
      }
      .feature-box {
        transition: all 0.3s ease;
      }
      .feature-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      .add-to-cart-btn {
        transition: all 0.3s ease;
      }
      .add-to-cart-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      .footer-link:hover {
        color: white !important;
      }
      .footer-social:hover {
        color: white !important;
        transform: scale(1.2);
      }
      /* Responsive improvements */
      * {
        box-sizing: border-box;
      }

      html,
      body {
        overflow-x: hidden;
        max-width: 100vw;
      }

      .container-fluid {
        max-width: 100%;
        overflow-x: hidden;
        padding-left: 15px;
        padding-right: 15px;
      }

      /* Mobile responsive adjustments */
      @media (max-width: 767px) {
        .product-card {
          min-width: 250px;
          max-width: 280px;
        }

        .draggable-carousel {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }

        .gap-3 {
          gap: 0.75rem !important;
        }
      }

      @media (max-width: 991px) {
        .navbar-brand {
          font-size: 1.2rem !important;
        }

        .h1 {
          font-size: 1.8rem !important;
        }
      }
    `}</style>
  );
};

export default GlobalStyles;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ChevronDown, ArrowLeft, Package, Truck } from "lucide-react";
import { formatPrice } from "../../utils/helpers";

// Hooks
import { useCart } from "../../hooks/useCart";

/**
 * Product Detail Page Component
 */
export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id: productArticle } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productArticle]);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productArticle}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        const productData = responseData.data;

        // Transform marketplace object to array
        const marketplaces = Object.entries(productData.marketplace).map(([name, link]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          link,
        }));

        const transformedProduct = {
          ...productData,
          originalPrice: productData.harga,
          harga: productData.harga_diskon,
          marketplaces,
        };

        setProduct(transformedProduct);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productArticle]);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Loading product...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Product not found</h2>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const productImages = product.gambar && product.gambar.length > 0 ? product.gambar : [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop&crop=center",
  ];

  const colors = product.colors
    ? product.colors.map((color) => ({
        id: color.id,
        color: color.hex,
        label: color.name,
      }))
    : [];

  const sizes = product.size
    ? product.size.split(",").map((size) => {
        return {
          size: size.trim(),
          available: true,
        };
      })
    : [];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  const handleMarketplaceClick = (url) => {
    window.open(url, "_blank");
  };

  const getMarketplaceLogo = (name) => {
    const nameStr = name.toLowerCase();
    
    if (nameStr.includes("tokopedia")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z"/>
            <path d="M12 7L7 9.5v5l5 2.5 5-2.5v-5L12 7z"/>
          </svg>
        </div>
      );
    } else if (nameStr.includes("shopee")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      );
    } else if (nameStr.includes("lazada")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12L12 2l10 10-10 10L2 12z"/>
            <path d="M12 8l-4 4 4 4 4-4-4-4z"/>
          </svg>
        </div>
      );
    } else if (nameStr.includes("bukalapak")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path d="M8 8h8v2H8V8z"/>
            <path d="M8 11h8v2H8v-2z"/>
            <path d="M8 14h5v2H8v-2z"/>
          </svg>
        </div>
      );
    } else if (nameStr.includes("tiktok") || nameStr.includes("tiktokshop")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.8a6.34 6.34 0 0 0 10.93-4.47V9.26a8.16 8.16 0 0 0 4.65 1.46V7.35a4.85 4.85 0 0 1-1.75-.66z"/>
          </svg>
        </div>
      );
    } else if (nameStr.includes("blibli")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3.09 8.26l2 1L12 4l6.91 5.26 2-1L12 2z"/>
            <path d="M3.09 15.74L12 22l8.91-6.26-2-1L12 20l-6.91-5.26-2 1z"/>
            <path d="M3.09 8.26v7.48l2-1V9.26l-2-1z"/>
            <path d="M18.91 8.26v7.48l2 1V9.26l-2-1z"/>
          </svg>
        </div>
      );
    } else if (nameStr.includes("zalora")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
          </svg>
        </div>
      );
    }
  };

  const getMarketplaceStyles = (name) => {
    const nameStr = name.toLowerCase();
    let borderColor = "border-gray-300";
    let hoverBgColor = "hover:bg-gray-50";
    let textColor = "text-gray-900";

    if (nameStr.includes("tokopedia")) {
      borderColor = "border-green-600";
      hoverBgColor = "hover:bg-green-50";
      textColor = "text-green-600";
    } else if (nameStr.includes("shopee")) {
      borderColor = "border-orange-500";
      hoverBgColor = "hover:bg-orange-50";
      textColor = "text-orange-500";
    } else if (nameStr.includes("lazada")) {
      borderColor = "border-blue-500";
      hoverBgColor = "hover:bg-blue-50";
      textColor = "text-blue-500";
    } else if (nameStr.includes("bukalapak")) {
      borderColor = "border-red-500";
      hoverBgColor = "hover:bg-red-50";
      textColor = "text-red-500";
    } else if (nameStr.includes("tiktok") || nameStr.includes("tiktokshop")) {
      borderColor = "border-black";
      hoverBgColor = "hover:bg-gray-50";
      textColor = "text-black";
    } else if (nameStr.includes("blibli")) {
      borderColor = "border-blue-400";
      hoverBgColor = "hover:bg-blue-50";
      textColor = "text-blue-400";
    } else if (nameStr.includes("zalora")) {
      borderColor = "border-purple-500";
      hoverBgColor = "hover:bg-purple-50";
      textColor = "text-purple-500";
    }

    return { borderColor, hoverBgColor, textColor };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-3 py-4 md:px-4 md:py-6 lg:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="group mb-4 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 md:mb-6"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium md:text-base">Kembali ke Beranda</span>
        </button>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm md:rounded-2xl">
          <div className="grid grid-cols-1 gap-0 xl:grid-cols-2">
            {/* Left Side - Product Images */}
            <div className="p-3 md:p-6 lg:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                {/* Image Thumbnails */}
                <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:gap-3 md:overflow-visible">
                  {productImages.slice(0, 5).map((img, index) => (
                    <button
                      key={index}
                      className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-16 md:w-16 ${
                        selectedImage === index ? "border-gray-900 shadow-md" : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={img} alt={`${product.artikel} ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="order-1 flex-1 md:order-2">
                  <div className="h-64 overflow-hidden rounded-xl bg-gray-50 sm:h-80 md:h-96 lg:h-[500px]">
                    <img
                      src={productImages[selectedImage]}
                      alt={product.artikel}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="bg-white p-4 md:p-6 lg:p-8">
              {/* Breadcrumb */}
              <nav className="mb-3 text-xs md:mb-4 md:text-sm">
                <ol className="flex items-center space-x-1 text-gray-500 md:space-x-2">
                  <li>
                    <button className="transition-colors hover:text-gray-700">Beranda</button>
                  </li>
                  <li className="text-gray-300">/</li>
                  <li>
                    <button className="transition-colors hover:text-gray-700">Sepatu</button>
                  </li>
                  <li className="text-gray-300">/</li>
                  <li className="font-medium text-gray-900">Sneakers</li>
                </ol>
              </nav>

              {/* Product Title */}
              <h1 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">{product.nama}</h1>

              {/* Product Code */}
              <p className="mb-4 text-sm text-gray-500">Kode Produk: {product.artikel}</p>

              {/* Star Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={star <= (product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">({product.rating || 4.5})</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{Math.floor(Math.random() * 100) + 50} ulasan</span>
              </div>

              {/* Price */}
              <div className="mb-6 md:mb-8">
                <div className="mb-1 flex items-baseline gap-2 md:gap-3">
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{formatPrice(product.harga)}</h2>
                  {product.originalPrice && (
                    <span className="text-base text-gray-500 line-through md:text-lg">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 md:text-sm">Harga sudah termasuk PPN</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6 md:mb-8">
                <div className="mb-3 flex items-center justify-between md:mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 md:text-sm">
                    Warna: {colors.find((c) => c.id === selectedColor)?.label || selectedColor}
                  </h3>
                </div>
                <div className="flex gap-2 md:gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`relative h-10 w-10 rounded-full transition-all md:h-12 md:w-12 ${
                        selectedColor === color.id
                          ? "ring-4 ring-gray-300 ring-offset-2"
                          : "hover:ring-2 hover:ring-gray-200 hover:ring-offset-1"
                      } ${color.border ? "border-2 border-gray-300" : ""}`}
                      style={{ backgroundColor: color.color }}
                      title={color.label}
                    >
                      {selectedColor === color.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke={color.id === "" ? "white" : color.id === "WHITE" ? "#374151" : "white"}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4 md:mb-6">
                <div className="mb-3 flex items-center justify-between md:mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 md:text-sm">
                    Ukuran: {selectedSize}
                  </h3>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-700 md:text-sm">
                    Panduan Ukuran
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {sizes.map((sizeObj) => (
                    <button
                      key={sizeObj.size}
                      onClick={() => sizeObj.available && setSelectedSize(sizeObj.size)}
                      disabled={!sizeObj.available}
                      className={`relative h-10 rounded-lg border-2 text-xs font-semibold transition-all md:h-12 md:text-sm ${
                        selectedSize === sizeObj.size && sizeObj.available
                          ? "border-gray-900 bg-gray-900 text-white shadow-md"
                          : sizeObj.available
                            ? "border-gray-300 bg-white text-gray-900 hover:border-gray-900 hover:shadow-sm"
                            : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                      }`}
                    >
                      {sizeObj.size}
                      {!sizeObj.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-px w-6 rotate-45 transform bg-gray-400 md:w-8"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 border-t border-gray-200 pt-4 md:mb-8">
                <button
                  className="flex w-full items-center justify-between text-sm font-bold tracking-wide text-gray-900"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <span>DESKRIPSI PRODUK</span>
                  <ChevronDown size={20} className={`transition-transform ${showDescription ? "rotate-180" : ""}`} />
                </button>
                {showDescription && (
                  <div className="mt-4 space-y-3">
                    <p className="leading-relaxed text-gray-600">
                      {product.deskripsi ||
                        "Sepatu sneakers premium dengan desain modern dan kualitas terbaik. Terbuat dari bahan berkualitas tinggi yang memberikan kenyamanan maksimal untuk aktivitas sehari-hari."}
                    </p>
                    <div className="text-sm text-gray-500">
                      <p className="mb-2 font-medium">Spesifikasi:</p>
                      <ul className="space-y-1">
                        <li>• Bahan: Canvas Premium & Synthetic Leather</li>
                        <li>• Sol: Rubber Outsole</li>
                        <li>• Tinggi Sol: 3cm</li>
                        <li>• Berat: ±350 gram</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Available on E-commerce Platforms */}
              {product.marketplaces && product.marketplaces.length > 0 && (
                <div className="mb-6 border-t border-gray-200 pt-6 md:mb-8">
                  <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-gray-900 md:text-base">
                    Beli di Platform E-commerce
                  </h3>
                  <div className="space-y-3">
                    {product.marketplaces.map((marketplace) => {
                      const { borderColor, hoverBgColor, textColor } = getMarketplaceStyles(marketplace.name);
                      return (
                        <button
                          key={marketplace.name}
                          onClick={() => handleMarketplaceClick(marketplace.link)}
                          className={`flex w-full items-center justify-center gap-3 rounded-xl border-2 ${borderColor} bg-white px-4 py-4 transition-all duration-200 ${hoverBgColor} hover:shadow-lg md:gap-4 md:px-6 md:py-5`}
                        >
                          {getMarketplaceLogo(marketplace.name)}
                          <div className="flex-1 text-left">
                            <div className={`text-sm font-bold ${textColor} md:text-base`}>{marketplace.name}</div>
                            <div className="text-xs text-gray-500 md:text-sm">
                              Cari produk ini di {marketplace.name}
                            </div>
                          </div>
                          <svg
                            className={`h-5 w-5 ${textColor} md:h-6 md:w-6`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

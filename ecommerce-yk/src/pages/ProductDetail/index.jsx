import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft, Package, Truck, X } from "lucide-react";
import { formatPrice } from "../../utils/helpers";

// Hooks
// import { useCart } from "../../hooks/useCart";
import { fetchProductByArtikel } from "../../services/productService"; // Import the service
import SpecificationRating from "../../components/ui/SpecificationRating";
import PurposeChips from "../../components/ui/PurposeChips";

/**
 * Product Detail Page Component
 */
export default function ProductDetail() {
  // const { addToCart } = useCart();
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
        const fetchedProduct = await fetchProductByArtikel(productArticle);

        if (!fetchedProduct) {
          setError(new Error("Product not found"));
          return;
        }

        // Transform marketplace object to array (if needed, otherwise remove)
        const marketplaces =
          fetchedProduct.marketplace && Object.keys(fetchedProduct.marketplace).length > 0
            ? Object.entries(fetchedProduct.marketplace).map(([name, link]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                link,
              }))
            : [];

        // Transform offline stores array and filter out inactive stores
        const offlineStores = fetchedProduct.offline
          ? fetchedProduct.offline
              .filter((store) => store.is_active !== false) // Hide inactive stores
              .map((store) => ({
                name: store.name,
                url: store.url,
                address: store.address || null,
              }))
          : [];

        const transformedProduct = {
          ...fetchedProduct,
          marketplaces,
          offlineStores,
        };

        setProduct(transformedProduct);
        console.log("Final Product Data for Rendering:", transformedProduct);
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
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // const [quantity, setQuantity] = useState(1);

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

  const productImages = product.gambar && product.gambar.length > 0 ? product.gambar : []; // Removed static images fallback

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

  // const handleAddToCart = () => {
  //   addToCart({
  //     ...product,
  //     selectedColor,
  //     selectedSize,
  //     quantity,
  //   });
  // };

  const handleMarketplaceClick = (url) => {
    window.open(url, "_blank");
  };

  const handleOfflineStoreClick = (url) => {
    window.open(url, "_blank");
  };

  const getMarketplaceLogo = (name) => {
    const nameStr = name.toLowerCase();

    if (nameStr.includes("tokopedia")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" />
            <path d="M12 7L7 9.5v5l5 2.5 5-2.5v-5L12 7z" />
          </svg>
        </div>
      );
    } else if (nameStr.includes("shopee")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      );
    } else if (nameStr.includes("lazada")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12L12 2l10 10-10 10L2 12z" />
            <path d="M12 8l-4 4 4 4 4-4-4-4z" />
          </svg>
        </div>
      );
    } else if (nameStr.includes("bukalapak")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M8 8h8v2H8V8z" />
            <path d="M8 11h8v2H8v-2z" />
            <path d="M8 14h5v2H8v-2z" />
          </svg>
        </div>
      );
    } else if (nameStr.includes("tiktok") || nameStr.includes("tiktokshop")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.8a6.34 6.34 0 0 0 10.93-4.47V9.26a8.16 8.16 0 0 0 4.65 1.46V7.35a4.85 4.85 0 0 1-1.75-.66z" />
          </svg>
        </div>
      );
    } else if (nameStr.includes("blibli")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L3.09 8.26l2 1L12 4l6.91 5.26 2-1L12 2z" />
            <path d="M3.09 15.74L12 22l8.91-6.26-2-1L12 20l-6.91-5.26-2 1z" />
            <path d="M3.09 8.26v7.48l2-1V9.26l-2-1z" />
            <path d="M18.91 8.26v7.48l2 1V9.26l-2-1z" />
          </svg>
        </div>
      );
    } else if (nameStr.includes("zalora")) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
            <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500 md:h-10 md:w-10">
          <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
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

  const getOfflineStoreLogo = () => {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 md:h-10 md:w-10">
        <svg className="h-5 w-5 text-white md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    );
  };

  const getOfflineStoreStyles = () => {
    return {
      borderColor: "border-green-600",
      hoverBgColor: "hover:bg-green-50",
      textColor: "text-green-600",
    };
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
              <div className="flex h-64 flex-col gap-3 sm:h-80 md:h-96 md:flex-row md:gap-4 lg:h-[500px]">
                {/* Image Thumbnails */}
                <div className="order-2 flex gap-2 overflow-x-auto overflow-y-hidden md:order-1 md:h-full md:flex-col md:gap-3 md:overflow-y-auto md:overflow-x-hidden">
                  {productImages.map((img, index) => (
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
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-gray-50"
                  >
                    <img
                      src={productImages[selectedImage]}
                      alt={product.artikel}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 transition-all group-hover:bg-opacity-20"></div>
                  </button>
                </div>
              </div>

              {/* Description - Only visible on desktop (xl and above) */}
              <div className="mt-6 hidden border-t border-gray-200 pt-6 xl:block">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Deskripsi Produk</h3>
                <div className="space-y-3">
                  <p className="leading-relaxed text-gray-600">
                    {product.description ||
                      "Sepatu sneakers premium dengan desain modern dan kualitas terbaik. Terbuat dari bahan berkualitas tinggi yang memberikan kenyamanan maksimal untuk aktivitas sehari-hari."}
                  </p>
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

              {/* Product Specifications and Categories */}
              <div className="mb-6 flex flex-col gap-y-6 md:flex-row md:justify-between">
                <SpecificationRating rating={product.rating} displayType="star" />
                <PurposeChips purposes={product.rating?.purpose} />
              </div>

              {/* Price */}
              <div className="mb-6 md:mb-8">
                <div className="mb-1 flex items-baseline gap-2 md:gap-3">
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {formatPrice(
                      product.harga_diskon > 0 && product.harga_diskon < product.originalPrice
                        ? product.harga_diskon
                        : product.originalPrice
                    )}
                  </h2>
                  {product.harga_diskon > 0 && product.harga_diskon < product.originalPrice && (
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
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 md:text-sm"
                  >
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

              {/* Description - Only visible on mobile and tablet (below xl) */}
              <div className="mb-6 border-t border-gray-200 pt-4 md:mb-8 xl:hidden">
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
                      {product.description ||
                        "Sepatu sneakers premium dengan desain modern dan kualitas terbaik. Terbuat dari bahan berkualitas tinggi yang memberikan kenyamanan maksimal untuk aktivitas sehari-hari."}
                    </p>
                  </div>
                )}
              </div>

              {/* Available on E-commerce Platforms */}
              {product.marketplaces && product.marketplaces.length > 0 && (
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:mb-8 md:p-8">
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl">🛒 Tersedia di Marketplace</h3>
                    <p className="text-sm text-gray-600">Pilih platform belanja favorit Anda</p>
                  </div>

                  {/* Grid Layout for Marketplaces */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {product.marketplaces.map((marketplace) => {
                      console.log(marketplace);
                      if (marketplace.link === null || marketplace.link === undefined) {
                        return null;
                      }
                      const { borderColor, hoverBgColor, textColor } = getMarketplaceStyles(marketplace.name);
                      return (
                        <button
                          key={marketplace.name}
                          onClick={() => handleMarketplaceClick(marketplace.link)}
                          className={`group relative flex flex-col items-center rounded-xl border-2 ${borderColor} bg-white p-4 shadow-sm transition-all duration-300 ${hoverBgColor} hover:scale-105 hover:shadow-lg`}
                        >
                          <div className="mb-3">{getMarketplaceLogo(marketplace.name)}</div>

                          <div className="text-center">
                            <div className={`text-sm font-bold ${textColor} md:text-base`}>{marketplace.name}</div>
                            <div className="text-xs text-gray-500">Beli Sekarang</div>
                          </div>

                          {/* Hover Arrow */}
                          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <svg
                              className={`h-4 w-4 ${textColor}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* If there are many marketplaces, show popular ones first */}
                  {product.marketplaces.length > 6 && (
                    <div className="mt-4 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">Lihat semua marketplace →</button>
                    </div>
                  )}
                </div>
              )}

              {/* Available at Offline Stores */}
              {product.offlineStores && product.offlineStores.length > 0 && (
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:mb-8 md:p-8">
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl">📍 Tersedia di Toko Offline</h3>
                    <p className="text-sm text-gray-600">Kunjungi lokasi toko terdekat</p>
                  </div>

                  {/* Grid Layout for Offline Stores */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {product.offlineStores.map((store) => {
                      const { borderColor, hoverBgColor, textColor } = getOfflineStoreStyles();
                      return (
                        <button
                          key={store.name}
                          onClick={() => handleOfflineStoreClick(store.url)}
                          className={`group relative flex flex-col items-center rounded-xl border-2 ${borderColor} bg-white p-4 shadow-sm transition-all duration-300 ${hoverBgColor} hover:scale-105 hover:shadow-lg`}
                        >
                          <div className="mb-3">{getOfflineStoreLogo()}</div>

                          <div className="text-center">
                            <div className={`text-sm font-bold ${textColor} md:text-base`}>{store.name}</div>
                            {store.address && (
                              <div className="mt-1 line-clamp-2 text-xs text-gray-500">{store.address}</div>
                            )}
                            <div className="text-xs text-gray-500">Visit Location</div>
                          </div>

                          {/* Hover Arrow */}
                          <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <svg
                              className={`h-4 w-4 ${textColor}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* If there are many offline stores, show popular ones first */}
                  {product.offlineStores.length > 6 && (
                    <div className="mt-4 text-center">
                      <button className="text-sm text-green-600 hover:text-green-800">Lihat semua toko →</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lightbox Popup Overlay */}
        {isLightboxOpen && (
          <div
            className="animate-fade-in-fast fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Card Container */}
            <div
              className="relative w-full max-w-4xl rounded-xl bg-white p-4 shadow-2xl lg:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-white transition-transform hover:scale-110 hover:bg-gray-600"
              >
                <X size={22} />
              </button>

              {/* Main Image Display */}
              <div className="mb-4 h-[60vh] w-full overflow-hidden rounded-lg bg-gray-100 md:h-[70vh]">
                <img
                  src={productImages[selectedImage]}
                  alt={product.artikel}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-3 overflow-x-auto p-2 md:gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 md:h-20 md:w-20 ${
                      selectedImage === index
                        ? "border-blue-500 shadow-md"
                        : "border-transparent opacity-60 hover:border-blue-400 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img}
                      alt={`${product.artikel} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Size Guide Popup Overlay */}
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative h-[90vh] w-[90vw] overflow-hidden rounded-lg bg-white shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setShowSizeGuide(false)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
              >
                <X size={20} />
              </button>

              {/* Popup Content */}
              <div className="h-full overflow-y-auto p-6 pt-16">
                <div className="mx-auto max-w-4xl">
                  <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                    Panduan Ukuran Sepatu
                  </h2>

                  {/* Size Chart Table */}
                  <div className="mb-8 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            EU Size
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            US Size
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            UK Size
                          </th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                            Panjang Kaki (cm)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { eu: "36", us: "5", uk: "3.5", cm: "22.5" },
                          { eu: "37", us: "5.5", uk: "4", cm: "23" },
                          { eu: "38", us: "6", uk: "4.5", cm: "23.5" },
                          { eu: "39", us: "7", uk: "5.5", cm: "24.5" },
                          { eu: "40", us: "7.5", uk: "6", cm: "25" },
                          { eu: "41", us: "8", uk: "7", cm: "25.5" },
                          { eu: "42", us: "8.5", uk: "7.5", cm: "26" },
                          { eu: "43", us: "9.5", uk: "8.5", cm: "27" },
                          { eu: "44", us: "10", uk: "9", cm: "27.5" },
                          { eu: "45", us: "11", uk: "10", cm: "28.5" },
                        ].map((size, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 px-4 py-3 font-medium">{size.eu}</td>
                            <td className="border border-gray-300 px-4 py-3">{size.us}</td>
                            <td className="border border-gray-300 px-4 py-3">{size.uk}</td>
                            <td className="border border-gray-300 px-4 py-3">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* How to Measure Instructions */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">Cara Mengukur Kaki Anda</h3>
                    <img src="http://localhost:8080/uploads/panduan/1.png" alt="Panduan Ukuran" />
                  </div>

                  {/* Tips */}
                  <div className="rounded-lg bg-blue-50 p-6">
                    <h3 className="mb-3 text-lg font-semibold text-blue-900">Tips Memilih Ukuran</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Ukur kaki di sore hari karena kaki cenderung sedikit membesar</li>
                      <li>• Jika ragu antara dua ukuran, pilih yang lebih besar</li>
                      <li>• Pertimbangkan ketebalan kaus kaki yang akan digunakan</li>
                      <li>• Setiap merek sepatu mungkin memiliki sedikit perbedaan ukuran</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

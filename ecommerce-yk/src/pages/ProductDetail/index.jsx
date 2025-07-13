import React, { useState, useEffect, useMemo } from "react";
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
        setProduct(responseData.data);
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

  // Product images - using high-quality shoe/sneaker images
  const productImages = [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop&crop=center",
  ];

  // const colors = [
  //   { name: "BLACK", color: "#1f2937", label: "Hitam" },
  //   { name: "WHITE", color: "#f8fafc", label: "Putih", border: true },
  //   { name: "BLUE", color: "#1e40af", label: "Biru" },
  //   { name: "RED", color: "#dc2626", label: "Merah" },
  // ];

  const colors = product.colors.map((color) => ({
    id: color.id,
    color: color.hex,
    label: color.name,
  }));

  // const sizes = [
  //   { size: "36", available: true },
  //   { size: "37", available: true },
  //   { size: "38", available: false },
  //   { size: "39", available: true },
  //   { size: "40", available: true },
  //   { size: "41", available: false },
  //   { size: "42", available: true },
  //   { size: "43", available: true },
  // ];

  const sizes = product.size.split(",").map((size) => {
    return {
      size,
      available: true,
    };
  });

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  const handleTokopediaClick = () => {
    window.open(`https://tokopedia.com/search?st=product&q=${encodeURIComponent(product.model)}`, "_blank");
  };

  const handleShopeeClick = () => {
    window.open(`https://shopee.co.id/search?keyword=${encodeURIComponent(product.model)}`, "_blank");
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
                {/* Image Thumbnails - horizontal on mobile, vertical on desktop */}
                <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:gap-3 md:overflow-visible">
                  {productImages.slice(0, 5).map((img, index) => (
                    <button
                      key={index}
                      className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-16 md:w-16 ${
                        selectedImage === index ? "border-gray-900 shadow-md" : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={img} alt={`${product.model} ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="order-1 flex-1 md:order-2">
                  <div className="h-64 overflow-hidden rounded-xl bg-gray-50 sm:h-80 md:h-96 lg:h-[500px]">
                    <img
                      src={productImages[selectedImage]}
                      alt={product.model}
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

              {/* Available on Platforms */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="text-xs font-medium text-gray-500">Available on:</span>
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={handleTokopediaClick}
                      className="flex items-center gap-1 rounded-lg border-2 border-green-600 px-2 py-1 transition-all duration-200 hover:bg-green-50 md:gap-2"
                    >
                      <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-green-600 md:h-5 md:w-5">
                        <span className="text-xs font-bold text-white">T</span>
                      </div>
                      <span className="text-xs font-medium text-green-600">Tokopedia</span>
                    </button>
                    <button
                      onClick={handleShopeeClick}
                      className="flex items-center gap-1 rounded-lg border-2 border-orange-500 px-2 py-1 transition-all duration-200 hover:bg-orange-50 md:gap-2"
                    >
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 md:h-5 md:w-5">
                        <span className="text-xs font-bold text-white">S</span>
                      </div>
                      <span className="text-xs font-medium text-orange-500">Shopee</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 md:mb-8">
                <div className="mb-1 flex items-baseline gap-2 md:gap-3">
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{formatPrice(product.harga)}</h2>

                  {/* Display discounted price if available */}
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
                      style={{
                        backgroundColor: color.color,
                      }}
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

              {/* Quantity Selection */}
              <div className="mb-6 md:mb-8">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-900 md:mb-4 md:text-sm">
                  Jumlah: {quantity}
                </h3>
                <div className="flex max-w-28 items-center gap-0 md:max-w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-l-lg border-2 border-r-0 border-gray-300 text-base font-bold text-gray-600 transition-colors hover:bg-gray-50 md:h-12 md:w-12 md:text-lg"
                  >
                    −
                  </button>
                  <div className="flex h-10 w-12 items-center justify-center border-2 border-gray-300 bg-white text-sm font-semibold text-gray-900 md:h-12 md:w-16 md:text-base">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="h-10 w-10 rounded-r-lg border-2 border-l-0 border-gray-300 text-base font-bold text-gray-600 transition-colors hover:bg-gray-50 md:h-12 md:w-12 md:text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-6 space-y-3 md:mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-xl border-2 border-gray-900 py-3 text-xs font-bold tracking-wide text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white md:py-4 md:text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Package size={18} className="md:hidden" />
                    <Package size={20} className="hidden md:block" />
                    TAMBAHKAN KE KERANJANG
                  </span>
                </button>

                <button className="w-full rounded-xl bg-gray-900 py-3 text-xs font-bold tracking-wide text-white transition-all duration-200 hover:bg-gray-800 md:py-4 md:text-sm hidden">
                  <span className="flex items-center justify-center gap-2">
                    <Truck size={18} className="md:hidden" />
                    <Truck size={20} className="hidden md:block" />
                    BELI SEKARANG
                  </span>
                </button>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

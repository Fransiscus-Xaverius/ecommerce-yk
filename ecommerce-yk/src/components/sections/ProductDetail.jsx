import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ChevronDown, ArrowLeft, Package, Truck } from "lucide-react";
import { formatPrice } from "../../utils/helpers";
import { productSections } from "../../data/products";

/**
 * Product Detail Page Component
 */
const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product from all sections
  const product = productSections
    .flatMap((section) => section.products)
    .find((p) => p.id === parseInt(id));

  const [selectedColor, setSelectedColor] = useState("BLACK");
  const [selectedSize, setSelectedSize] = useState("37");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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

  const colors = [
    { name: "BLACK", color: "#1f2937", label: "Hitam" },
    { name: "WHITE", color: "#f8fafc", label: "Putih", border: true },
    { name: "BLUE", color: "#1e40af", label: "Biru" },
    { name: "RED", color: "#dc2626", label: "Merah" },
  ];

  const sizes = [
    { size: "36", available: true },
    { size: "37", available: true },
    { size: "38", available: false },
    { size: "39", available: true },
    { size: "40", available: true },
    { size: "41", available: false },
    { size: "42", available: true },
    { size: "43", available: true },
  ];

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  const handleTokopediaClick = () => {
    window.open(
      `https://tokopedia.com/search?st=product&q=${encodeURIComponent(
        product.name
      )}`,
      "_blank"
    );
  };

  const handleShopeeClick = () => {
    window.open(
      `https://shopee.co.id/search?keyword=${encodeURIComponent(product.name)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-4 md:py-6 px-3 md:px-4 lg:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6 group transition-colors"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium text-sm md:text-base">
            Kembali ke Beranda
          </span>
        </button>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
            {/* Left Side - Product Images */}
            <div className="p-3 md:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                {/* Image Thumbnails - horizontal on mobile, vertical on desktop */}
                <div className="flex md:flex-col gap-2 md:gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible">
                  {productImages.slice(0, 5).map((img, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 border-2 rounded-lg overflow-hidden transition-all ${
                        selectedImage === index
                          ? "border-gray-900 shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 order-1 md:order-2">
                  <div className="bg-gray-50 rounded-xl overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px]">
                    <img
                      src={productImages[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="p-4 md:p-6 lg:p-8 bg-white">
              {/* Breadcrumb */}
              <nav className="text-xs md:text-sm mb-3 md:mb-4">
                <ol className="flex items-center space-x-1 md:space-x-2 text-gray-500">
                  <li>
                    <button className="hover:text-gray-700 transition-colors">
                      Beranda
                    </button>
                  </li>
                  <li className="text-gray-300">/</li>
                  <li>
                    <button className="hover:text-gray-700 transition-colors">
                      Sepatu
                    </button>
                  </li>
                  <li className="text-gray-300">/</li>
                  <li className="text-gray-900 font-medium">Sneakers</li>
                </ol>
              </nav>

              {/* Product Title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Product Code */}
              <p className="text-sm text-gray-500 mb-4">
                Kode Produk: SNK-{product.id.toString().padStart(4, "0")}
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={
                        star <= (product.rating || 4)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  ({product.rating || 4.5})
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-600 text-sm">
                  {Math.floor(Math.random() * 100) + 50} ulasan
                </span>
              </div>

              {/* Available on Platforms */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span className="text-xs text-gray-500 font-medium">
                    Available on:
                  </span>
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                      onClick={handleTokopediaClick}
                      className="flex items-center gap-1 md:gap-2 px-2 py-1 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-all duration-200"
                    >
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-green-600 rounded-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        Tokopedia
                      </span>
                    </button>
                    <button
                      onClick={handleShopeeClick}
                      className="flex items-center gap-1 md:gap-2 px-2 py-1 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-all duration-200"
                    >
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">S</span>
                      </div>
                      <span className="text-xs text-orange-500 font-medium">
                        Shopee
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-baseline gap-2 md:gap-3 mb-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </h2>
                  {product.originalPrice && (
                    <span className="text-base md:text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-gray-500">
                  Harga sudah termasuk PPN
                </p>
              </div>

              {/* Color Selection */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-bold text-gray-900 text-xs md:text-sm uppercase tracking-wider">
                    Warna:{" "}
                    {colors.find((c) => c.name === selectedColor)?.label ||
                      selectedColor}
                  </h3>
                </div>
                <div className="flex gap-2 md:gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full transition-all ${
                        selectedColor === color.name
                          ? "ring-4 ring-gray-300 ring-offset-2"
                          : "hover:ring-2 hover:ring-gray-200 hover:ring-offset-1"
                      } ${color.border ? "border-2 border-gray-300" : ""}`}
                      style={{
                        backgroundColor: color.color,
                      }}
                      title={color.label}
                    >
                      {selectedColor === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke={
                                color.name === "BLACK"
                                  ? "white"
                                  : color.name === "WHITE"
                                  ? "#374151"
                                  : "white"
                              }
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
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-bold text-gray-900 text-xs md:text-sm uppercase tracking-wider">
                    Ukuran: {selectedSize}
                  </h3>
                  <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Panduan Ukuran
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {sizes.map((sizeObj) => (
                    <button
                      key={sizeObj.size}
                      onClick={() =>
                        sizeObj.available && setSelectedSize(sizeObj.size)
                      }
                      disabled={!sizeObj.available}
                      className={`relative h-10 md:h-12 text-xs md:text-sm font-semibold border-2 rounded-lg transition-all ${
                        selectedSize === sizeObj.size && sizeObj.available
                          ? "bg-gray-900 text-white border-gray-900 shadow-md"
                          : sizeObj.available
                          ? "bg-white text-gray-900 border-gray-300 hover:border-gray-900 hover:shadow-sm"
                          : "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      }`}
                    >
                      {sizeObj.size}
                      {!sizeObj.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 md:w-8 h-px bg-gray-400 transform rotate-45"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6 md:mb-8">
                <h3 className="font-bold text-gray-900 text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">
                  Jumlah: {quantity}
                </h3>
                <div className="flex items-center gap-0 max-w-28 md:max-w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 md:w-12 md:h-12 border-2 border-gray-300 border-r-0 text-gray-600 hover:bg-gray-50 font-bold text-base md:text-lg rounded-l-lg transition-colors"
                  >
                    −
                  </button>
                  <div className="w-12 h-10 md:w-16 md:h-12 border-2 border-gray-300 flex items-center justify-center bg-white font-semibold text-gray-900 text-sm md:text-base">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 md:w-12 md:h-12 border-2 border-gray-300 border-l-0 text-gray-600 hover:bg-gray-50 font-bold text-base md:text-lg rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6 md:mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 md:py-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold text-xs md:text-sm tracking-wide rounded-xl transition-all duration-200"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Package size={18} className="md:hidden" />
                    <Package size={20} className="hidden md:block" />
                    TAMBAHKAN KE KERANJANG
                  </span>
                </button>

                <button className="w-full py-3 md:py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs md:text-sm tracking-wide rounded-xl transition-all duration-200">
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
                  className="w-full flex justify-between items-center text-gray-900 font-bold text-sm tracking-wide"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <span>DESKRIPSI PRODUK</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      showDescription ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showDescription && (
                  <div className="mt-4 space-y-3">
                    <p className="text-gray-600 leading-relaxed">
                      {product.description ||
                        "Sepatu sneakers premium dengan desain modern dan kualitas terbaik. Terbuat dari bahan berkualitas tinggi yang memberikan kenyamanan maksimal untuk aktivitas sehari-hari."}
                    </p>
                    <div className="text-sm text-gray-500">
                      <p className="font-medium mb-2">Spesifikasi:</p>
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
};

export default ProductDetail;

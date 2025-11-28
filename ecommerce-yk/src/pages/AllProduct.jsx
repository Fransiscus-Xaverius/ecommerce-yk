import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Pagination from "../components/common/Pagination";
import ProductCard from "../components/ui/ProductCard";

// Hooks
import useAllProducts from "../hooks/useAllProducts";
import { useCart } from "../hooks/useCart";

// Constants
import { PAGE_SIZE } from "../constants/pagination";

const hasMarketplaceData = (marketplace) => {
  if (!marketplace || typeof marketplace !== "object") return false;
  return Object.values(marketplace).some((value) => {
    if (typeof value === "string")
      return value.trim() !== "" && !["-", "#", "NA", "N/A"].includes(value.trim().toUpperCase());
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === "object") return Object.values(value).some(Boolean);
    return Boolean(value);
  });
};

const hasOfflineData = (offline) => {
  if (!Array.isArray(offline)) return false;
  return offline.some((store) => {
    if (!store || typeof store !== "object") return false;
    const url = typeof store.url === "string" ? store.url.trim() : "";
    const isActive = store.is_active !== false;
    return url !== "" && !["-", "#", "NA", "N/A"].includes(url.toUpperCase()) && isActive;
  });
};

const SECTION_CONFIG = {
  all: {
    title: "Semua Produk",
    description: "Menampilkan seluruh koleksi Yongki Komaladi",
    queryOptions: {},
  },
  men: {
    title: "Koleksi Men",
    description: "Kurasi sneakers, loafers, dan sandal untuk gaya maskulin modern",
    queryOptions: { filters: { gender: "Pria" } },
  },
  women: {
    title: "Koleksi Women",
    description: "Pilihan heels, flats, dan sneakers feminin untuk setiap agenda",
    queryOptions: { filters: { gender: "Wanita" } },
  },
  kids: {
    title: "Koleksi Kids",
    description: "Pilihan sneakers, loafers, dan sandal untuk gaya kids modern",
    queryOptions: { filters: { gender: "Kids" } },
  },
  online: {
    title: "Produk Online",
    description: "Produk yang tersedia di marketplace online",
    queryOptions: { online: true },
    filterFn: (product) => hasMarketplaceData(product.marketplace),
  },
  offline: {
    title: "Produk Offline",
    description: "Produk yang bisa didapatkan di toko offline",
    queryOptions: { offline: true },
    filterFn: (product) => hasOfflineData(product.offline),
  },
  new: {
    title: "Produk Terbaru",
    description: "Rilis terbaru berdasarkan tanggal pembaruan",
    queryOptions: { sort: "tanggal_update", order: "desc" },
  },
};

const SECTION_TABS = [
  { key: "all", label: "Semua" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "kids", label: "Kids" },
  { key: "online", label: "Online" },
  { key: "offline", label: "Offline" },
  { key: "new", label: "New Arrivals" },
];

// All products page with pagination (shares styling with SearchResults)
const AllProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sectionParam = new URLSearchParams(location.search).get("section");
  const sectionKey = (sectionParam || "all").toLowerCase();
  const activeSection = useMemo(() => SECTION_CONFIG[sectionKey] || SECTION_CONFIG.all, [sectionKey]);
  const [page, setPage] = useState(1);
  const limit = PAGE_SIZE;

  const { addToCart } = useCart();

  useEffect(() => {
    setPage(1);
  }, [sectionKey]);

  const {
    products,
    totalItems,
    totalPages: totalPagesFromApi,
    isLoading,
    error,
  } = useAllProducts(page, limit, true, activeSection.queryOptions);

  const filteredProducts = useMemo(() => {
    if (!activeSection.filterFn) return products;
    return products.filter(activeSection.filterFn);
  }, [products, activeSection]);

  const totalPages = totalPagesFromApi || Math.ceil(totalItems / limit) || 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {isLoading ? (
        <LoadingSpinner label="Memuat produk..." />
      ) : error ? (
        <EmptyState title="Error memuat produk" description={error.message} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState title="Produk tidak ditemukan" description="Belum ada produk untuk ditampilkan." />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{activeSection.title}</h1>
              <p className="text-sm text-gray-600 sm:text-base">{activeSection.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SECTION_TABS.filter((tab) => SECTION_CONFIG[tab.key]).map((tab) => {
                const isActive = tab.key === sectionKey;
                const target = tab.key === "all" ? "/all-products" : `/all-products?section=${tab.key}`;
                return (
                  <button
                    key={tab.key}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors sm:text-base ${
                      isActive
                        ? "border-milky-blue bg-milky-blue text-white"
                        : "border-gray-200 text-gray-700 hover:border-milky-blue/60 hover:text-milky-blue"
                    }`}
                    onClick={() => {
                      if (isActive) return;
                      navigate(target);
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 place-items-center gap-2 xs:gap-3 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex w-full justify-center">
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onProductClick={(artikel) => navigate(`/product/${artikel}`)}
                  isSingleCard
                />
              </div>
            ))}
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            className="mt-6 sm:mt-8 md:mt-10 lg:mt-12"
          />
        </>
      )}
    </div>
  );
};

export default AllProduct;

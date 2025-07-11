import API_CONFIG from "../config/api.js";

/**
 * Fetch product by artikel from backend
 */
export const fetchProductByArtikel = async (artikel) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/products/${artikel}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform backend data to frontend format
    return transformProductData(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

/**
 * Transform backend product data to frontend format
 */
const transformProductData = (backendProduct) => {
  if (!backendProduct) return null;

  return {
    id: backendProduct.no || backendProduct.artikel,
    artikel: backendProduct.artikel,
    name: backendProduct.artikel,
    price: backendProduct.harga || 0,
    originalPrice: null,
    rating: 4.0 + Math.random() * 1,
    image: `https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center`,
    colors: backendProduct.colors || [],
    size: backendProduct.size || "",
    group: backendProduct.grup || "",
    category: backendProduct.kat || "",
    gender: backendProduct.gender || "",
    type: backendProduct.tipe || "",
    unit: backendProduct.unit || "",
    model: backendProduct.model || "",
    status: backendProduct.status || "",
    supplier: backendProduct.supplier || "",
    usia: backendProduct.usia || "",
    tanggalProduk: backendProduct.tanggal_produk,
    tanggalTerima: backendProduct.tanggal_terima,
    tanggalUpdate: backendProduct.tanggal_update,
    description: `Premium ${
      backendProduct.artikel
    } dengan kualitas terbaik dari ${
      backendProduct.supplier || "supplier terpercaya"
    }.`,
    isNew: calculateIsNew(backendProduct.tanggal_produk),
    isSale: false,
  };
};

/**
 * Calculate if product is new (less than 30 days old)
 */
const calculateIsNew = (tanggalProduk) => {
  if (!tanggalProduk) return false;

  const productDate = new Date(tanggalProduk);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return productDate > thirtyDaysAgo;
};

export default fetchProductByArtikel;

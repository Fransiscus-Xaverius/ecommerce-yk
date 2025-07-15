const BACKEND_URL = "http://localhost:8080";

/**
 * Fetch product by artikel from backend
 */
export const fetchProductByArtikel = async (artikel) => {
  try {
    const response = await fetch(`/api/products/${artikel}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform backend data to frontend format
    const transformedData = transformProductData(data.data);
    console.log("Backend Product Data:", data);
    console.log("Transformed Product Data:", transformedData);
    return transformedData;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`/api/products?q=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Assuming the search results are also in data.data and need transformation
    const transformedResults = data.data.map(product => transformProductData(product));
    return transformedResults;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

/**
 * Transform backend product data to frontend format
 */
const transformProductData = (backendProduct) => {
  if (!backendProduct) return null;

  const gambar =
    backendProduct.gambar && Array.isArray(backendProduct.gambar)
      ? backendProduct.gambar.map((g) => `${BACKEND_URL}${g}`)
      : [];

  return {
    id: backendProduct.no || backendProduct.artikel,
    artikel: backendProduct.artikel,
    nama: backendProduct.nama,
    harga_diskon: parseFloat(backendProduct.harga_diskon) || 0,
    originalPrice: parseFloat(backendProduct.harga) || 0,
    rating: 4.0 + Math.random() * 1,
    gambar: gambar,
    colors: backendProduct.colors || [],
    size: backendProduct.size || "",
    grup: backendProduct.grup || "",
    kat: backendProduct.kat || "",
    gender: backendProduct.gender || "",
    tipe: backendProduct.tipe || "",
    unit: backendProduct.unit || "",
    model: backendProduct.model || "",
    status: backendProduct.status || "",
    supplier: backendProduct.supplier || "",
    usia: backendProduct.usia || "",
    tanggal_produk: backendProduct.tanggal_produk,
    tanggal_terima: backendProduct.tanggal_terima,
    tanggal_update: backendProduct.tanggal_update,
    description: `Premium ${backendProduct.nama} dengan kualitas terbaik dari ${
      backendProduct.supplier || "supplier terpercaya"
    }.`,
    isNew: calculateIsNew(backendProduct.tanggal_produk),
    isSale: false,
    marketplace: backendProduct.marketplace || {},
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

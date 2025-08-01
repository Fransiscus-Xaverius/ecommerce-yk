const BACKEND_URL = "http://localhost:8080";

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
    rating:
      backendProduct.rating && typeof backendProduct.rating === "object"
        ? {
            comfort: parseInt(backendProduct.rating.comfort) || 0,
            style: parseInt(backendProduct.rating.style) || 0,
            support: parseInt(backendProduct.rating.support) || 0,
            purpose: Array.isArray(backendProduct.rating.purpose)
              ? backendProduct.rating.purpose.filter((p) => p && p.trim() !== "")
              : [],
          }
        : { comfort: 0, style: 0, support: 0, purpose: [] },
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
    description:
      backendProduct.deskripsi ||
      `Premium ${backendProduct.nama} dengan kualitas terbaik dari ${backendProduct.supplier || "supplier terpercaya"}.`,
    isSale: false,
    marketplace: backendProduct.marketplace || {},
    offline: backendProduct.offline || [],
  };
};

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

export const searchProducts = async (query, page = 1, limit = 12) => {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(`/api/products?q=${query}&limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Backend Search Data:", data);

    const responseData = data.data || {};
    const productsArray = responseData.items || [];
    const totalItems = responseData.total_items || 0;

    const transformedResults = productsArray.map((product) => transformProductData(product));
    console.log("Transformed Search Results:", transformedResults);
    return { products: transformedResults, totalItems };
  } catch (error) {
    console.error("Error searching products:", error);
    return { products: [], totalItems: 0 };
  }
};

export const fetchProductList = async ({
  limit = 1000,
  offset = 0,
  sortColumn = "tanggal_terima",
  sortDirection = "desc",
  query = "",
}) => {
  try {
    let url = `/api/products?limit=${limit}&offset=${offset}&sort=${sortColumn}&order=${sortDirection}`;
    if (query) {
      url += `&q=${query}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Backend Product List Data:", data);

    let productsArray = [];
    if (data.data && Array.isArray(data.data)) {
      productsArray = data.data;
    } else if (data.data && data.data.items && Array.isArray(data.data.items)) {
      productsArray = data.data.items;
    } else if (Array.isArray(data)) {
      productsArray = data;
    }

    const transformedResults = productsArray.map((product) => transformProductData(product));
    console.log("Transformed Product List Results:", transformedResults);
    return transformedResults;
  } catch (error) {
    console.error("Error fetching product list:", error);
    return [];
  }
};

export default fetchProductByArtikel;

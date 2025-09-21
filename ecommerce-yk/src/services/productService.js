import { get } from './apiClient';
import { transformProductData } from './transformers/productTransformer';

export const fetchProductByArtikel = async (artikel) => {
  try {
    const data = await get(`/api/products/${artikel}`);
    return transformProductData(data.data);
  } catch (err) {
    if (err.status === 404) return null;
    console.error('Error fetching product:', err);
    return null;
  }
};

export const searchProducts = async (query, page = 1, limit = 12) => {
  try {
    const offset = (page - 1) * limit;
    const data = await get(`/api/products?q=${query}&limit=${limit}&offset=${offset}`);
    const responseData = data.data || {};
    const productsArray = responseData.items || [];
    const totalItems = responseData.total_items || 0;
    return { products: productsArray.map(transformProductData), totalItems };
  } catch (err) {
    console.error('Error searching products:', err);
    return { products: [], totalItems: 0 };
  }
};

export const fetchProductList = async ({
  sortColumn = 'tanggal_terima',
  sortDirection = 'desc',
  query = '',
  online = false,
  offline = false,
  limit,
} = {}) => {
  try {
    let url = `/api/products?sort=${sortColumn}&order=${sortDirection}`;
    if (query) url += `&q=${query}`;
    if (online) url += `&online`;
    if (offline) url += `&offline`;
    if (limit) url += `&limit=${limit}`;
    const data = await get(url);

    let productsArray = [];
    if (Array.isArray(data.data)) {
      productsArray = data.data;
    } else if (data.data?.items && Array.isArray(data.data.items)) {
      productsArray = data.data.items;
    } else if (Array.isArray(data)) {
      productsArray = data;
    }

    return productsArray.map(transformProductData);
  } catch (err) {
    console.error('Error fetching product list:', err);
    return [];
  }
};

export default fetchProductByArtikel;

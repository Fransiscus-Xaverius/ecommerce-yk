import useApiRequest from "./useApiRequest.jsx";
import { transformProductData } from "../services/transformers/productTransformer";

export default function useSearchProducts(query, page = 1, limit = 12, enable = true) {
  const offset = (page - 1) * limit;
  const encoded = encodeURIComponent(query || "");
  const url = `/api/products?q=${encoded}&limit=${limit}&offset=${offset}`;

  const { response, isLoading, error, refetch } = useApiRequest({
    url,
    queryKey: ["searchProducts", query, page, limit],
    enableQuery: enable && query !== undefined,
  });

  const data = response?.data || {};
  const items = data.items || [];
  const totalItems = data.total_items || 0;
  return {
    products: items.map(transformProductData),
    totalItems,
    isLoading,
    error,
    refetch,
  };
}

import useApiRequest from "./useApiRequest.jsx";
import { transformProductData } from "../services/productTransformer";

const appendFlag = (url, flag, shouldAppend) => {
  if (!shouldAppend) return url;
  return `${url}&${flag}=true`;
};

export default function useSearchProducts(query, page = 1, limit = 12, enable = true, options = {}) {
  const offset = (page - 1) * limit;
  const encoded = encodeURIComponent(query || "");
  let url = `/api/products?q=${encoded}&limit=${limit}&offset=${offset}`;

  if (options.sort) url += `&sort=${options.sort}`;
  if (options.order) url += `&order=${options.order}`;
  url = appendFlag(url, "online", options.online);
  url = appendFlag(url, "offline", options.offline);

  const optionsKey = JSON.stringify(options || {});

  const { response, isLoading, error, refetch } = useApiRequest({
    url,
    queryKey: ["searchProducts", query, page, limit, optionsKey],
    enableQuery: enable && query !== undefined,
  });

  const data = response?.data || {};
  const items = data.items || [];
  const totalItems = data.total_items || 0;
  const totalPages = data.total_pages || 0;
  return {
    products: items.map(transformProductData),
    totalItems,
    totalPages,
    isLoading,
    error,
    refetch,
  };
}

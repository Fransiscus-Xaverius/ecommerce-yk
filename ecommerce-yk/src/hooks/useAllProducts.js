import useSearchProducts from "./useSearchProducts";

export default function useAllProducts(page = 1, limit = 12, enable = true, options = {}) {
  return useSearchProducts("", page, limit, enable, options);
}

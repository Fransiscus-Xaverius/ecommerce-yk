import useApiRequest from "./useApiRequest.jsx";
import { transformProductData } from "../services/transformers/productTransformer";

export default function useProductDetail(artikel, enable = true) {
  const { response, isLoading, error, refetch } = useApiRequest({
    url: `/api/products/${artikel}`,
    queryKey: ["productDetail", artikel],
    enableQuery: enable && !!artikel,
  });

  let product = null;
  if (response?.data) {
    product = transformProductData(response.data);
    // derive marketplaces array
    const marketplaces =
      product.marketplace && Object.keys(product.marketplace).length > 0
        ? Object.entries(product.marketplace).map(([name, link]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            link,
          }))
        : [];
    const offlineStores = product.offline
      ? product.offline
          .filter((store) => store.is_active !== false)
          .map((store) => ({ name: store.name, url: store.url, address: store.address || null }))
      : [];
    product = { ...product, marketplaces, offlineStores };
  }

  return { product, isLoading, error, refetch };
}

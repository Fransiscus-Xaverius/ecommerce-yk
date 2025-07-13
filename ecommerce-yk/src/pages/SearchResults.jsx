import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCarousel from '../components/ui/ProductCarousel';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';

const fetchSearchResults = async (query) => {
  const response = await fetch(`http://localhost:8080/api/products/?q=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const { wishlist, toggleWishlist } = useWishlist();
  const { cartItems, addToCart } = useCart();

  const { data, error, isLoading } = useQuery({
    queryKey: ['searchResults', query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query, // Only run the query if a query exists
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error.message}</div>;
  }

  const products = data?.data?.items || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <ProductCarousel
          section={{ title: `Search Results`, products: products }}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          wishlist={wishlist}
          sectionIndex={0}
        />
      ) : (
        <p>No products found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
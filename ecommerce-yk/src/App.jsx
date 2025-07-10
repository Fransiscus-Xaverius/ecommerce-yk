import React, { useState, useEffect } from "react";

// Layout Components
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Section Components
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import Newsletter from "./components/sections/Newsletter";

// UI Components
import ProductCarousel from "./components/ui/ProductCarousel";
import GlobalStyles from "./components/ui/GlobalStyles";

// Data
import { productSections } from "./data/products";

// Hooks
import { useHeroSlider } from "./hooks/useHeroSlider";
import { useWishlist } from "./hooks/useWishlist";
import { useCart } from "./hooks/useCart";

// Utils
import { loadBootstrapCSS } from "./utils/helpers";

/**
 * Main Application Component - Yongki Komaladi E-commerce Website
 */
const YongkiKomaladiWebsite = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [heroSlides, setHeroSlides] = useState([]);
	const [loadingBanners, setLoadingBanners] = useState(true);
	const [errorBanners, setErrorBanners] = useState(null);

	// Initialize custom hooks
	const { currentSlide, setCurrentSlide } = useHeroSlider(heroSlides);
	const { wishlist, toggleWishlist } = useWishlist();
	const { cartItems, addToCart } = useCart();

	// Fetch banners from backend
	useEffect(() => {
		const fetchBanners = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/banners/active"
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const responseData = await response.json();
				console.log(responseData);
				// Map backend banner data to existing hero slide structure
				const mappedSlides = responseData.data.banners.map((banner) => ({
					id: banner.id,
					title: banner.title,
					subtitle: banner.subtitle,
					description: banner.description,
					cta: banner.cta_text,
					image: `url('http://localhost:8080${banner.image_url}')`, // Prepend backend URL
				}));
				console.log(mappedSlides);
				setHeroSlides(mappedSlides);
			} catch (error) {
				console.error("Error fetching banners:", error);
				setErrorBanners(error);
			} finally {
				setLoadingBanners(false);
			}
		};

		fetchBanners();
	}, []);

	// Load Bootstrap CSS
	useEffect(() => {
		const cleanup = loadBootstrapCSS();
		return cleanup;
	}, []);

	if (loadingBanners) {
		return <div>Loading banners...</div>; // Or a more sophisticated loading spinner
	}

	if (errorBanners) {
		return <div>Error loading banners: {errorBanners.message}</div>;
	}

	return (
		<div
			className='min-h-screen bg-light'
			style={{ maxWidth: "100vw", overflowX: "hidden" }}
		>
			<GlobalStyles />

			{/* Top Announcement Bar */}
			<AnnouncementBar />

			{/* Header */}
			<Header
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				cartItems={cartItems}
				wishlist={wishlist}
			/>

			{/* Hero Section */}
			<HeroSection
				slides={heroSlides}
				currentSlide={currentSlide}
				setCurrentSlide={setCurrentSlide}
			/>

			{/* Features Section */}
			<FeaturesSection />

			{/* Product Sections */}
			{productSections.map((section, sectionIndex) => (
				<ProductCarousel
					key={sectionIndex}
					section={section}
					sectionIndex={sectionIndex}
					onAddToCart={addToCart}
					onToggleWishlist={toggleWishlist}
					wishlist={wishlist}
				/>
			))}

			{/* Newsletter Section */}
			<Newsletter />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default YongkiKomaladiWebsite;

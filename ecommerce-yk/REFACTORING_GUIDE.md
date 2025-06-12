# Yongki Komaladi E-commerce Website - Refactored Code Structure

## 📁 Project Structure

This project has been professionally refactored into a modular, maintainable architecture:

```
src/
├── components/
│   ├── layout/                 # Layout components
│   │   ├── AnnouncementBar.jsx # Top announcement banner
│   │   ├── Header.jsx          # Navigation header with cart/wishlist
│   │   └── Footer.jsx          # Website footer
│   ├── sections/               # Main page sections
│   │   ├── HeroSection.jsx     # Hero carousel banner
│   │   ├── FeaturesSection.jsx # Feature highlights
│   │   └── Newsletter.jsx      # Newsletter subscription
│   └── ui/                     # Reusable UI components
│       ├── ProductCard.jsx     # Individual product display
│       ├── ProductCarousel.jsx # Product listing carousel
│       └── GlobalStyles.jsx    # Global CSS styles
├── data/                       # Static data
│   ├── heroSlides.js          # Hero carousel content
│   └── products.js            # Product catalog data
├── hooks/                      # Custom React hooks
│   ├── useCart.js             # Shopping cart management
│   ├── useWishlist.js         # Wishlist functionality
│   ├── useHeroSlider.js       # Hero slider auto-rotation
│   └── useCarouselDrag.js     # Drag/swipe carousel behavior
├── utils/                      # Utility functions
│   └── helpers.js             # Common helper functions
└── App.jsx                     # Main application component
```

## 🔧 Key Improvements

### 1. **Separation of Concerns**

- **Components**: Each component has a single responsibility
- **Data**: Static data moved to dedicated files
- **Logic**: Business logic extracted into custom hooks
- **Utilities**: Common functions centralized

### 2. **Component Organization**

- **Layout**: Structural components (Header, Footer, etc.)
- **Sections**: Page-specific content areas
- **UI**: Reusable interface elements

### 3. **Custom Hooks**

- `useCart`: Shopping cart state management
- `useWishlist`: Wishlist functionality
- `useHeroSlider`: Automatic slide rotation
- `useCarouselDrag`: Touch/mouse drag interactions

### 4. **Professional Features**

- **TypeScript-ready**: JSDoc comments for better IDE support
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Performance**: Optimized component structure
- **Maintainability**: Clear naming conventions and structure

## 🚀 Usage

### Running the Project

```bash
npm run dev    # Development server
npm run build  # Production build
npm run preview # Preview production build
```

### Adding New Components

1. Create component in appropriate folder (`components/layout/`, `components/sections/`, or `components/ui/`)
2. Import and use in `App.jsx` or other components
3. Add any new data to the `data/` folder
4. Extract complex logic into custom hooks in `hooks/` folder

### Component Props

Each component is documented with JSDoc comments explaining:

- Purpose and functionality
- Required and optional props
- Return values for hooks

## 📦 Dependencies

- **React**: UI framework
- **Lucide React**: Icon library
- **Bootstrap CSS**: Styling framework (loaded dynamically)

## 🎨 Styling

- Bootstrap classes for layout and components
- Custom CSS in `GlobalStyles.jsx` for specific animations and effects
- Responsive design with mobile-first approach

## 🔄 State Management

- Local component state for UI interactions
- Custom hooks for complex state logic
- Props drilling for data sharing between components

This refactored structure provides a solid foundation for scaling the application and makes it easy for multiple developers to work on different parts of the codebase simultaneously.

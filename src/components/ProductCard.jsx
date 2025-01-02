import React, { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check initial favorite status when the component mounts
    setIsFavorited(isFavorite(product.id));
  }, [product.id]);

  const handleFavoriteToggle = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = savedFavorites.filter((fav) => fav.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      savedFavorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    }
    setIsFavorited(!isFavorited); // Update the state to trigger re-render
  };

  const isFavorite = (productId) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return savedFavorites.some((fav) => fav.id === productId);
  };

  const navigateToProductDetail = () => {
    navigate(`/app/product-detail/${product.id}`);
  };

  return (
    <div 
    className="bg-white border rounded-lg p-4 hover:shadow-lg transition relative"
    onClick={navigateToProductDetail}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-contain mb-4"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-red-500 text-sm line-through">${product.originalPrice}</p>
      <p className="text-green-500 font-bold">${product.price}</p>

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteToggle}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isFavorited ? "bg-red-500 text-white" : "bg-gray-200"
        } hover:bg-red-600`}
      >
        {isFavorited ? "♥" : "♡"}
      </button>
    </div>
  );
};

export default ProductCard;

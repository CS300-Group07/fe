import React, { useEffect, useState } from "react";

const FavoritePage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Load favorite products from localStorage
  useEffect(() => {
    refreshFavoriteProducts();
  }, []);

  // Function to refresh the favorite products list
  const refreshFavoriteProducts = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteProducts(savedFavorites);
  };

  // Remove a product from favorites
  const removeFromFavorites = (productId) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = savedFavorites.filter((fav) => fav.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    refreshFavoriteProducts(); // Refresh the favorite products list
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Favorite Products</h1>
        {favoriteProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No favorite products yet. Start adding some!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-lg p-4 hover:shadow-lg transition relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-contain mb-4"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-red-500 text-sm line-through">
                  ${product.originalPrice}
                </p>
                <p className="text-green-500 font-bold">${product.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;

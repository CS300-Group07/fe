import React, { useEffect, useState } from "react";
import productsData from "../mock/products.json"; // Import the JSON file
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isIncreasingPrice, setIncreasingPrice] = useState(true);
  const navigate = useNavigate();
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get('key') || '';

  const isFavorite = (productId) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return savedFavorites.some((fav) => fav.product_id === productId);
  };

  const handleFavoriteToggle = (product) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (isFavorite(product.product_id)) {
      // Remove from favorites
      updatedFavorites = savedFavorites.filter((fav) => fav.product_id !== product.product_id);
    } else {
      // Add to favorites
      updatedFavorites = [...savedFavorites, product];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));  // Save to localStorage

    setFavoriteStatus((prevState) => ({
      ...prevState,
      [product.product_id]: !prevState[product.product_id],
    })); // Toggle the favorite status  
  };

  useEffect(() => {
    const initialFavoriteStatus = productsData.reduce((status, product) => {
      status[product.product_id] = isFavorite(product.product_id); // Check if product is a favorite
      return status;
    }, {});
    setFavoriteStatus(initialFavoriteStatus);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const moveToProductDetailPage = (product) => { 
      navigate(`${product.product_id}`); 
  }
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '';
        if (searchKey) {
          url = `http://localhost:5002/product/${searchKey}/hehe/20/0`;
        } else {
          url = 'http://localhost:5002/products/trending';
        }
        console.log('Sending request to:', url);
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchKey]);

  useEffect(() => {
    products.sort((b,a) => {
      if (isIncreasingPrice) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [products, isIncreasingPrice]);

  if (isLoading) 
    return <LoadingSpinner />;

  var limitPage = Math.ceil(products.length / productsPerPage);

  const handleCurrentPageChange = (step) => {
      if (currentPage + step > 0 && currentPage + step <= limitPage)
        setCurrentPage(currentPage + step);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="text-center mb-6">
          <SearchBar setProducts = {setProducts} setLoading={setLoading} isIncreasingPrice={isIncreasingPrice}/>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="z-10">
            <label htmlFor="perPage" className="text-gray-600 mr-2">Per Page:</label>
            <select id="perPage" className="border border-gray-300 rounded px-2 py-1"
              value={productsPerPage}
              onChange={(e) => setProductsPerPage(parseInt(e.target.value))}>
                <option value="8">8</option>
                <option value="12">12</option>
            </select>
          </div>

          <div className="z-10">
            <label htmlFor="sortBy" className="text-gray-600 mr-2">Sort By:</label>
            <select id="sortBy" className="border border-gray-300 rounded px-2 py-1"
              value={isIncreasingPrice ? "price-asc" : "price-desc"}
              onChange={(e) => setIncreasingPrice(e.target.value === "price-asc")}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
          .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
          .map((product) => (
              <div
                className="bg-white border rounded-lg p-4 hover:shadow-lg transition relative"
                key={product.product_id}
                onClick={() => moveToProductDetailPage(product)}
              >
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the favorite button
                  handleFavoriteToggle(product);
                }}
                className={`absolute top-2 right-2
                flex items-center justify-center w-10 h-10 rounded-full focus:outline-none transition duration-200 z-10
                ${favoriteStatus[product.product_id] ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500"}`}
                aria-label={favoriteStatus[product.product_id] ? "Remove from favorites" : "Add to favorites"}
              >
                {/* Heart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 fill-current transition-transform duration-200 ${
                    isFavorite ? "transform scale-110" : ""
                  }`}
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z"
                  />
                </svg>
              </button>

              {/* Product Image */}
              <div className="h-64 w-full object-contain mb-4">
                  <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  />
              </div>

              {/* Product Info */}
              <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                  </h2>
                  {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                      </p>
                  )}
                  <p className="text-lg font-semibold text-green-600">${product.price}</p>
              </div>
            </div>
          ))}
      </div>

        <div className="flex justify-center mt-6">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={() => handleCurrentPageChange(-1)}
          >
            Previous
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded ml-2 hover:bg-purple-600"
            onClick={() => handleCurrentPageChange(1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;

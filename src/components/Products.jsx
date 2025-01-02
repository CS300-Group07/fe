import React, { useEffect, useState } from "react";
import productsData from "../mock/products.json"; // Import the JSON file
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      const be_url = `localhost:5002/${encodeURIComponent(inputValue)}`;
      const url = `/app/products?key=${inputValue}`;
      console.log('Sending request to:', url);
      navigate(url);
      fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };


  return (
    <div className="flex justify-center items-center mt-5">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Search
      </button>
    </div>
  );
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const {key} = useParams();
  const navigate = useNavigate();
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const isFavorite = (productId) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return savedFavorites.some((fav) => fav.id === productId);
  };

  const handleFavoriteToggle = (product) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (isFavorite(product.id)) {
      // Remove from favorites
      updatedFavorites = savedFavorites.filter((fav) => fav.id !== product.id);
    } else {
      // Add to favorites
      updatedFavorites = [...savedFavorites, product];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));  // Save to localStorage

    setFavoriteStatus((prevState) => ({
      ...prevState,
      [product.id]: !prevState[product.id],
    })); // Toggle the favorite status  
  };

  useEffect(() => {
    // Load products from mock data
    setProducts(productsData);

    // Initialize favorite status from localStorage
    const initialFavoriteStatus = productsData.reduce((status, product) => {
      status[product.id] = isFavorite(product.id); // Check if product is a favorite
      return status;
    }, {});
    setFavoriteStatus(initialFavoriteStatus);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const moveToProductDetailPage = ([productID]) => { 
    navigate(`${productID}`, { state: { productID: productID } }); 
    //window.open('https://www.google.com/url?url=https://xaba.vn/new-louis-vuittondiane-pm-st-nm-mng-handbag-monogram-m45985-v1i404808420052i0.html%3Fsrsltid%3DAfmBOopacWe2DDgq1Mmu7zzY0ToUH7R4zVcZOHqdLQ5_d7cqk1LHEepIbqA&rct=j&q=&esrc=s&opi=95576897&sa=U&ved=0ahUKEwjq_NOYsaKKAxXILEQIHaG9GQgQ2SkI5QI&usg=AOvVaw3uwn26MpiW7mYeEZo_tYVZ', '_blank');
  }

  var data = productsData;
  if (key != null) {
    console.log('Key NULL');
    data = null
  }
  var limitPage = Math.ceil(data.length / productsPerPage);
  useEffect(() => {
      // Load products from JSON file
      setProducts(data);
  }, []);

  const handleCurrentPageChange = (step) => {
      if (currentPage + step > 0 && currentPage + step <= limitPage)
        setCurrentPage(currentPage + step);
  };
  const handlePerPageChange = (e) => {
      setProductsPerPage(parseInt(e.target.value));
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="text-center mb-6">
          <SearchBar />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <label htmlFor="perPage" className="text-gray-600 mr-2">Per Page:</label>
            <select id="perPage" className="border border-gray-300 rounded px-2 py-1"
              value={productsPerPage}
              onChange={handlePerPageChange}>
                <option value="8">8</option>
                <option value="12">12</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortBy" className="text-gray-600 mr-2">Sort By:</label>
            <select id="sortBy" className="border border-gray-300 rounded px-2 py-1">
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
                key={product.id}
                className="bg-white border rounded-lg p-4 hover:shadow-lg transition relative"
                onClick={() => moveToProductDetailPage(product.id)}
              >
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the favorite button
                  handleFavoriteToggle(product);
                }}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  favoriteStatus[product.id] ? "bg-red-500 text-white" : "bg-gray-200"
                } hover:bg-red-600 z-10`}
              >
                {favoriteStatus[product.id] ? "♥" : "♡"}
              </button>

              {/* Product Image */}
              <div className="h-64 w-full object-contain mb-4">
                  <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  />
              </div>

              {/* Product Info */}
              <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                  </p>
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

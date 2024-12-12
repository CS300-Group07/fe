import React, { useEffect, useState } from "react";
import productsData from "../mock/products.json"; // Import the JSON file
import { appRoutes } from "../constants/routes";
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

function getProducts(key) {
// fetch data from localhost:5001/prducts?key=key
    return fetch(`http://localhost:5001/products?key=${key}`)
}

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const {key} = useParams();
  const navigate = useNavigate(); 
  
  const moveToProductDetailPage = (productId) => { 
    navigate(`/app/${appRoutes.PRODUCTDETAIL}`); 
  }

  useEffect(() => {
    // Load products from JSON file
    setProducts(productsData.products);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="text-center mb-6">
          <SearchBar />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <label htmlFor="perPage" className="text-gray-600 mr-2">Per Page:</label>
            <select id="perPage" className="border border-gray-300 rounded px-2 py-1">
              <option value="12">12</option>
              <option value="24">24</option>
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
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg p-4 hover:shadow-lg transition"
              onClick={() => moveToProductDetailPage(product.id)}
            >
              <img
                src={product.image}  // Use the image path from the JSON
                alt={product.name}
                className="h-64 w-full object-contain mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-red-500 text-sm line-through">
                ${product.originalPrice}
              </p>
              <p className="text-green-500 font-bold">${product.price}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Previous
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded ml-2 hover:bg-purple-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

import React, { useState } from 'react';
import axios from 'axios';


const SearchBar = ({ setProducts, setLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const handleSearch = async () => {
        if (inputValue.trim() !== '') {
        try {
            const num = 20;
            const start = 0;
            const url = `http://localhost:5002/product/${inputValue}/hehe/${num}/${start}`;
            console.log('Sending request to:', url);
            const response = await axios.get(url);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error searching products:', err);
            setLoading(false);
        }
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
};
export default SearchBar;
import React from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../constants/routes";

function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard title="Cantilever Chair" price="$42.00" />
          <ProductCard title="Cantilever Chair" price="$42.00" />
          <ProductCard title="Cantilever Chair" price="$42.00" />
          <ProductCard title="Cantilever Chair" price="$42.00" />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ title, price }) {
  const navigate = useNavigate(); 
  
  const moveToProductDetailPage = (productId) => { 
    navigate(`/app/${appRoutes.PRODUCTDETAIL}`); 
  }
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg"
        onClick={() => moveToProductDetailPage()}
      >
      <div className="h-40 bg-gray-200 mb-4">
        <img
            src="https://via.placeholder.com/200"
            alt={title}
            className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-700">{price}</p>
    </div>
  );
}

export default FeaturedProducts;

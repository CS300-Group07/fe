import React from "react";

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
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg">
      <div className="h-40 bg-gray-200 mb-4"></div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-700">{price}</p>
    </div>
  );
}

export default FeaturedProducts;

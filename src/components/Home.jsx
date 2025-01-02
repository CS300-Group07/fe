import React from "react";
import AboutUs from "./AboutUs";
import ProductSlider from "./ProductsSlider";
import products_featured from "../mock/featured_products.json";
import products_latest from "../mock/latest_products.json";
import products_trending from "../mock/trending_products.json";

function Home() {
  return (
    <>
        <AboutUs />
        <ProductSlider title = 'Featured Products' products={products_featured}/>
        <ProductSlider title = 'Trending Products' products={products_latest}/>
        <ProductSlider title = 'Latest Products' products={products_trending}/>
    </>
    
    
  );
}

export default Home;

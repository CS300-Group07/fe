import React from "react";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import FeaturedProducts from "./components/FeaturedProducts";
import LatestProducts from "./components/LatestProducts";
import TrendingProducts from "./components/TrendingProducts";
import Footer from "./components/Footer";

function HomeScreen() {
  return (
    <div className="font-sans">
      <Header />
      <AboutUs />
      <FeaturedProducts />
      <LatestProducts />
      <TrendingProducts />
      <Footer />
    </div>
  );
}

export default HomeScreen;

import React from "react";

function Header() {
  return (
    <header className="bg-purple-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">VBMatch</h1>
        <nav className="flex space-x-4">
          <a href="#" className="hover:text-pink-400">Home</a>
          <a href="#" className="hover:text-pink-400">Products</a>
          <a href="#" className="hover:text-pink-400">Shop</a>
          <a href="#" className="hover:text-pink-400">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

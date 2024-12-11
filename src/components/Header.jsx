import React from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../constants/routes";

function Header(activeSection) {
    const navigate = useNavigate();

    const menuItems = [
        { route: appRoutes.HOME, label: "Home" },
        { route: appRoutes.PRODUCTS, label: "Products" },
        { route: appRoutes.SHOP, label: "Shop" },
        { route: appRoutes.CONTACT, label: "Contact" }
    ];

    const handleItemClick = (route) => {
        // Navigate to the clicked route
        navigate(route);
    };
  return (
    <header className="bg-purple-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">VBMatch</h1>
        <nav className="flex space-x-4">
          {menuItems.map((item) => (
            <button
              key={item.route}
              className={activeSection === item.route ? "hover:underline active" : "hover:underline"}
              onClick={() => handleItemClick(item.route)}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;

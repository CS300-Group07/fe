import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { appRoutes } from "../constants/routes";
import Home from "../components/Home";
import Contact from "../components/Contact";
import Products from "../components/Products";
import Compare from "../components/Compare";
import NotFound from "../components/notfound";
import ProductDetail from "../components/ProductDetail";
import ChatbotScreen from "../components/chatbot";
import Favourite from "../components/Favourite";

function AppPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [activeSection, setActiveSection] = useState("");
    useEffect(() => {
        // Extracting the section from the current path
        const pathSections = location.pathname.split("/");
        console.log("Path sections: ", pathSections);
        setActiveSection(pathSections[2]); // Using index 1 to get the second element
    }, [location.pathname]);

    return (
        <div className="AppPage">
            <div className="TopbarContainer">
                <Header activeSection={activeSection} />
            </div>
            <div className="ContentContainer">
                <Routes>
                    <Route path={appRoutes.HOME} element={<Home />} />
                    <Route path={appRoutes.PRODUCTS} element={<Products/>} />
                    <Route path={appRoutes.PRODUCTS_SEARCH} element={<Products/>} />
                    <Route path={appRoutes.COMPARE} element={<Compare/>} />
                    <Route path={appRoutes.FAVOURITE} element={<Favourite/>} />
                    <Route path={appRoutes.NOTFOUND} element={<NotFound />} />
                    <Route path={appRoutes.PRODUCTDETAIL} element={<ProductDetail/>}/>
                    <Route path={appRoutes.CHATBOT} element={<ChatbotScreen/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/app/home" replace />}
                    />
                </Routes>
            </div>
            <div className="FooterContainer">
                <Footer />
            </div>
        </div>
    );
}

export default AppPage;

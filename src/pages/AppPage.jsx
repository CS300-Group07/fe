import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { appRoutes } from "../constants/routes";
import Home from "../components/Home";
import Contact from "../components/Contact";
import Products from "../components/Products";
import ProductPage from "../components/ProductPage";
import Compare from "../components/Compare";
import NotFound from "../components/NotFound";
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
        <div className="AppPage flex flex-col h-screen overflow-hidden">
            <div className="TopbarContainer fixed top-0 left-0 w-full z-50">
                <Header/>
            </div>
            <div className="ContentContainer">
                <Routes>
                    <Route path={appRoutes.HOME} element={<Home />} />
                    <Route path={appRoutes.PRODUCTS} element={<ProductPage/>}>
                        <Route path=":productId" element={<ProductDetail/>}/>
                        <Route path="" element={<Products />} />
                    </Route>
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

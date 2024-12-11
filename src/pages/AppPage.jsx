import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { appRoutes } from "../constants/routes";
import Home from "../components/Home";

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
            <div className="RightContent">
                <Routes>
                    <Route path={appRoutes.HOME} element={<Home />} />
                    <Route path={appRoutes.PRODUCTS} element={<div> Products</div>} />
                    <Route path={appRoutes.COMPARE} element={<div> Compare</div>} />
                    <Route path={appRoutes.SHOP} element={<div> Shop</div>} />
                    <Route path={appRoutes.CONTACT} element={<div> Contact</div>} />
                    <Route
                        path="*"
                        element={<Navigate to="/app/home" replace />}
                    />
                </Routes>
            </div>
            </div>
        </div>
    );
}

export default AppPage;
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
        setActiveSection(pathSections[2]); // Using index 1 to get the second element
      }, [location.pathname]);

    return (
        <div className="font-sans">
            <div className="AppPage">
                <div className="HeaderContainer">
                    <Header activeSection={activeSection}/>
                </div>
                <div className="ContentContainer">
                    <Routes>
                        <Route path={appRoutes.HOME} element={<Home />} />
                        <Route
                            path="/"
                            element={<Navigate to={appRoutes.HOME} replace />}
                        />
                    </Routes>
                </div>
                
                <div className="FooterContainer">
                    <Footer />
                </div>
                
            </div>
        </div>
    );
}

export default AppPage;

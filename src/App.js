import { React } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./constants/routes";
import "./App.css";
import { useLocation } from "react-router-dom";
import DynamicTitle from "./utils/DynamicTitle";
import AppPage from "./pages/AppPage";
import LoginPage from "./pages/LoginPage";
import { Helmet } from "react-helmet";

function App() {
  const location = useLocation();
  return (
      <>
      <Helmet>
          <title>{DynamicTitle(location.pathname)}</title>
      </Helmet>

      <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />

          <Route path={routes.LOGIN} element={<LoginPage />} />
          <Route path={routes.APP} element={<AppPage />} />
      </Routes>
      
      </>
  );
}

export default App;

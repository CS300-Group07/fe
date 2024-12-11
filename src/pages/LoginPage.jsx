import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";

function LoginPage() {
  const navigate = useNavigate()
  //handle logic login later
  console.log("Login Page is not available");
  useEffect(() => {
    navigate(routes.APP)
  }, [])
  
  return (
    <div className="font-sans">
      <div className="LoginPage">
        <div className="logo">
          Login Page is not available
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { accessTokenService } from "../lib"; // Adjust the import path as needed
import { api } from "../api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = accessTokenService.get();

      if (!accessToken) {
        navigate("/sign-in");
        return;
      }

      setIsAuth(true);

      api.get("/Account").then((res) => {
        console.log("res", res);
      });
    };

    checkAuth();
  }, [location.pathname, navigate]);

  if (!isAuth) return null;

  return <>{children}</>;
};

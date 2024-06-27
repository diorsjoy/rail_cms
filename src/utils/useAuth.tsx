import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { accessTokenService } from "../lib/accessTokenService";

const useAuth = () => {
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = accessTokenService.get();
    const responseStatus = accessTokenService.getResponseStatus();

    if (!accessToken && responseStatus !== 401) {
      accessTokenService.setPreviousPageUrl(location.pathname);
      setRedirectPath("/sign-in");
    } else if (responseStatus === 401) {
      accessTokenService.remove();
      accessTokenService.removeResponseStatus();
      accessTokenService.setPreviousPageUrl(location.pathname);
      setRedirectPath("/sign-in");
    } else if (accessToken) {
      const previousPageUrl = accessTokenService.getPreviousPageUrl();
      if (previousPageUrl) {
        accessTokenService.setPreviousPageUrl("");
        setRedirectPath(previousPageUrl);
      }
    }
  }, [location.pathname]);

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return null;
};

export default useAuth;

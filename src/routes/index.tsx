import { createBrowserRouter } from "react-router-dom";
import { HomePage, SignInPage } from "../pages";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

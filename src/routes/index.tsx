import { createBrowserRouter } from "react-router-dom";
import { HomePage, SignInPage } from "../pages";
import { ErrorPage } from "../pages/ErrorPage";
import NavbarElements from "../components/NavbarElements";

export const router = createBrowserRouter([
  {
    element: <NavbarElements />,
    children: [
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
    ],
  },
]);

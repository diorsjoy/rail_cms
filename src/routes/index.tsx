import { createBrowserRouter } from "react-router-dom";
import { HomePage, SignInPage } from "../pages";
import { ErrorPage } from "../pages/ErrorPage";
import NavbarElements from "../components/NavbarElements";
import SignUpPage from "../pages/SignUpPage";

export const router = createBrowserRouter([
  {
    element: <NavbarElements />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

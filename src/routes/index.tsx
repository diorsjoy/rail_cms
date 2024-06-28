import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "../pages";
import HomePage from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";
import NavbarElements from "../components/NavbarElements";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import { ForgotPassword } from "../pages/SignInPage/ForgotPassword";
import { AboutPage } from "../pages/AboutPage/AboutPage";
import { FaqPage } from "../pages/Faq/FaqPage";

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
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
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
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

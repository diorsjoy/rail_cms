import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";
import NavbarElements from "../components/NavbarElements";
import { AboutPage } from "../pages/AboutPage/AboutPage";
import FaqDetailsPage from "../pages/FaqItemPage/FaqDetailsPage";
import FaqPage from "../pages/FaqPage/FaqPage";
import NewsPage from "../pages/NewsPage/NewsPage";

export const router = createBrowserRouter([
  {
    element: <NavbarElements />,
    children: [
      {
        path: "/blog",
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
        children: [
          {
            path: ":id",
            element: <FaqDetailsPage />,
          },
        ],
      },
      {
        path: "/faq/add",
        element: <FaqDetailsPage />,
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
    ],
  },
]);

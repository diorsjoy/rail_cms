import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import "./i18n/i18n";

export const App = () => {
  return <RouterProvider router={router} />;
};

import { useTranslation } from "react-i18next";
import { useTitle } from "../hooks";

export const HomePage = () => {
  useTitle("Home");
  const { t } = useTranslation();

  return (
    <div className="container">
      <span>{t("description.line1")}</span>
    </div>
  );
};

export default HomePage;

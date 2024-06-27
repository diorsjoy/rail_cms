import Select from "antd/es/select";

import { useTranslation } from "react-i18next";
const { Option } = Select;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select defaultValue="en" style={{ width: 120 }} onChange={changeLanguage}>
      <Option value="en">English</Option>
      <Option value="ru">Russian</Option>
    </Select>
  );
};

export default LanguageSelector;

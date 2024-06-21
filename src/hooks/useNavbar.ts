import { useState } from "react";

const useNavbar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return { collapsed, toggleCollapse };
};

export default useNavbar;

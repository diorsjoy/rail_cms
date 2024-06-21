import { Button } from "../Button";
import { useTitle } from "../hooks";

export const HomePage = () => {
  useTitle("Home");

  return <Button />;
};

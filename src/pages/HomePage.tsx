import { useTitle } from "../hooks";

export const HomePage = () => {
  useTitle("Home");
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;

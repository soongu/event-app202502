import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <h1>My Home Page</h1>
      <Outlet />
    </>
  );
}

export default HomeLayout;
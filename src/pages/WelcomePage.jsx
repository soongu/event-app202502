import LoginForm from "../components/auth/LoginForm";
import Main from "../components/Main";
import { useLoaderData } from "react-router-dom";

const WelcomePage = () => {

  const userData = useLoaderData();
  
  return (
    <>
      {userData ? <Main userData={userData} /> : <LoginForm />}
    </>
  );
};

export default WelcomePage;

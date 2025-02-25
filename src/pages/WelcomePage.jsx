import LoginForm from "../components/auth/LoginForm";
import Main from "../components/Main";
import { useRouteLoaderData } from "react-router-dom";

const WelcomePage = () => {

  // 상위 페이지에서 전달한 로더를 하위 페이지에서 사용하는 법
  const userData = useRouteLoaderData('user-data');
  
  return (
    <>
      {userData ? <Main userData={userData} /> : <LoginForm />}
    </>
  );
};

export default WelcomePage;

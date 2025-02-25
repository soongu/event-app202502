import { Form } from "react-router-dom";

const Main = ({ userData }) => {

  const { role, email } = userData;

  return (
    <>
      <h2>{email}님 환영합니다.</h2>
      <h3>현재 권한: [ {role} ]</h3>

      <Form
        action='/logout'
        method='POST'>
        <button>Logout</button>
      </Form>
    </>
  );
};

export default Main;

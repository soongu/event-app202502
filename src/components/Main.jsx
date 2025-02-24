const Main = ({ userData }) => {

  const { role, email } = userData;

  return (
    <>
      <h2>{ email }님 환영합니다.</h2>
      <h3>현재 권한: [ { role } ]</h3>
      <button>Logout</button>
    </>
  );
};

export default Main;

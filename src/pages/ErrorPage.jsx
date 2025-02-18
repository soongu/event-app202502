import { useRouteError } from 'react-router-dom';
import MainNavigation from '../layout/MainNavigation';

const ErrorPage = () => {

  // loader가 throw한 에러정보를 받아서 사용하기
  const error = useRouteError();
  // console.log(error);

  let errorText = `페이지를 찾을 수 없습니다! URL을 확인하세요.`;
  if (error.status != 404) {
    errorText = JSON.parse(error.data).message;
  }

  return (
    <>
      <MainNavigation />
      <main>
        <h1>에러가 발생했습니다!</h1>
        <p>{ errorText }</p>
      </main>
    </>
  );
};

export default ErrorPage;

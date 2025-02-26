import { Form, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../services/api';
import { AUTH_API_URL } from '../config/host-config';
import { setUserData } from '../config/auth-config';

const Main = ({ userData }) => {

  const navigate = useNavigate();
  const { role, email } = userData;

  const handlePromote = async () => { 

    const response = await fetchWithAuth(`${AUTH_API_URL}/promote`, 'PUT');

    if (response.ok) {
      // 토큰 갱신
      const responseData = await response.json();
      setUserData(responseData);

      // 홈으로 이동
      alert(responseData.message);
      
      navigate('/');
    }
  
  };

  return (
    <>
      <h2>{email}님 환영합니다.</h2>
      <h3>현재 권한: [ {role} ]</h3>

      {role === 'COMMON' && (
        <button
          style={{
            background: 'orangered',
            color: '#fff',
          }}
          onClick={handlePromote}
        >
          Go To Premium
        </button>
      )}

      <Form
        action='/logout'
        method='POST'>
        <button>Logout</button>
      </Form>
    </>
  );
};

export default Main;

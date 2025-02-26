import { getUserToken } from "../config/auth-config";

// 토큰이 자동 포함된 fetch함수
export const fetchWithAuth = async (url, method='GET', payload=null) => { 

  const token = getUserToken();

  // 요청 옵션 설정
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  // 서버로 보낼데이터가 있고, GET요청이 아니라면
  if (payload && method.toUpperCase() !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);

  // 권한이 부족한 경우 사용자 피드백
  if (response.status === 403) {
    const errorMessage = '권한이 부족합니다. 프리미엄 회원으로 업그레이드 해보세요!';
    alert(errorMessage);
    throw new Response(
      JSON.stringify({ message: errorMessage }), // 에러메시지
      {
        status: response.status,
      } // 에러 정보 객체
    );
  }

  return response;
};
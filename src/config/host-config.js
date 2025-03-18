
// 백엔드 로컬서버의 포트번호
const LOCAL_PORT = 9000;

/*
  현재 요청하는 브라우저의 host가 http://localhost:5173 이라면
  hostname은 localhost를 리턴
  만약 클라이언트가 https://www.naver.com 이면
  hostname은 www.naver.com을 리턴
*/
const clientHostName = window.location.hostname;

// 백엔드 호스트 조건부 처리
let backendHostName;

if (clientHostName === 'localhost') {
  backendHostName = `http://localhost:${LOCAL_PORT}`;
} else if (
  clientHostName === 'gondue.co.kr.s3-website.ap-northeast-2.amazonaws.com'
  || clientHostName ===  'gondue.co.kr'
) {
  backendHostName = `http://3.36.142.125:9000`;
}

// 기본 백엔드 주소 저장
const API_BASE_URL = `${backendHostName}/api`;

// API별 메인엔드포인트
const EVENT = '/events';
const AUTH = '/auth';

// 만약에 클라이언트가 localhost면 
// http://localhost:9000/api/events
export const EVENT_API_URL = `${API_BASE_URL}${EVENT}`;
export const AUTH_API_URL = `${API_BASE_URL}${AUTH}`;
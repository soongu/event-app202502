
const USER_DATA_KEY = 'userData';

// 로그인한 유저의 정보를 로컬스토리지로부터 불러오는 함수
const getUserData = () => { 
  const userDataJson = localStorage.getItem(USER_DATA_KEY);
  return userDataJson ? JSON.parse(userDataJson) : null;
};

// 로그인한 회원의 정보를 불러오는 loader
export const userDataLoader = () => { 
  // console.log('userDataLoader call!');
  return getUserData(); // loader가 리턴한 데이터는 loader가 걸린 페이지 및 하위 컴포넌트에서 사용가능
};
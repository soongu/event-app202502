import { createContext } from "react";

// 이벤트 관련 전역적 상태값 관리
const EventContext = createContext({
  totalEventCount: 0, // 특정 유저가 작성한 총 이벤트 수
  changeTotalEventCount: (count) => { } // 총 이벤트 수를 갱신하는 함수
});

export default EventContext;
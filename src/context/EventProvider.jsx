import { useState } from 'react';
import EventContext from './event-context';

const EventProvider = ({ children }) => {

  const [totalEventCount, setTotalEventCount] = useState(0);

  return (
    <EventContext.Provider
      value={{
        totalEventCount: totalEventCount, // 특정 유저가 작성한 총 이벤트 수
        changeTotalEventCount: (count) => setTotalEventCount(count), // 총 이벤트 수를 갱신하는 함수
      }}>
        { children }
      </EventContext.Provider>
  );
};

export default EventProvider;

import { useContext, useEffect, useRef, useState } from "react";
import EventList from "../components/EventList";
import EventSkeleton from "../components/EventSkeleton";
import { EVENT_API_URL } from "../config/host-config";
import { fetchWithAuth } from "../services/api";
import EventContext from "../context/event-context";

const EventsPage = () => {

  // 컨텍스트에서 총 이벤트 수를 갱신하는 함수를 소비
  const { changeTotalEventCount } = useContext(EventContext);

  // 무한스크롤 옵저버가 감시할 태그 ref
  const observerRef = useRef();

  // loader가 리턴한 데이터 받아오기
  // const { eventList, hasNext } = useLoaderData();

  // 서버에서 가져온 화면에 렌더링할 이벤트 목록
  const [eventList, setEventList] = useState([]);

  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // 더 이상 가져올 데이터가 있는지 여부
  const [isFinish, setIsFinish] = useState(false);

  // 로딩바를 보여주기 여부
  const [loading, setLoading] = useState(false);

  // 서버에서 데이터를 불러오는 함수
  const fetchEvents = async () => { 

    if (isFinish || loading) return;

    // 강제로 2초간 로딩 부여
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    const response = await fetchWithAuth(`${EVENT_API_URL}?sort=id&page=${currentPage}`);
    const { hasNext, eventList: events, totalCount } = await response.json();

    // 총 이벤트 수를 컨텍스트에 저장
    changeTotalEventCount(totalCount);

    setEventList(prev => [...prev, ...events]);
    setIsFinish(!hasNext);
    // 페이지번호 갱신
    setCurrentPage(prev => prev + 1);

    setLoading(false);
  };



  // useEffect는 렌더링 이후에 실행됨
  useEffect(() => { 

    // 무한스크롤 옵저버 생성
    const observer = new IntersectionObserver(([target]) => { 
      // entries는 옵저버가 감시하고 있는 대상들의 집합배열
      if (!target.isIntersecting || isFinish || loading) {
        return;
      }
      fetchEvents();
    }, {
      // 관찰하고 있는 대상의 높이가 50% 보일 때 감지 실행
      threshold: 0.5
    });

    // 옵저버의 감시 대상을 설정
    if (observerRef.current) {
      // 감시 설정
      observer.observe(observerRef.current);
    }

    // 다 불러왔으면 감시 해제
    return () => { 
      observer.disconnect();
    };

  }, [currentPage]);

  // console.log('event page render!!');
  
  return (
    <>
      <EventList eventList={eventList} />
      {/* 무한스크롤을 위한 옵저버 감시 태그 */}
      <div
        ref={observerRef}
        style={{ height: 100 }}
      >
        {/* 로딩 바 or 로딩 프로그레스바 or 스켈레톤 폴백 */}
        {loading && <EventSkeleton />}
      </div>
    </>
  );
};

export default EventsPage;

// loader를 아웃소싱
// export const loader = async () => fetch(`http://localhost:9000/api/events`);

export const loader = async () => {
  const res = await fetch(`http://localhost:9000/api/events?sort=id&page=1`);
  // const jsonData = await res.json();

  // 예외처리
  if (!res.ok) {
    const jsonData = await res.json();
    throw new Response(
      JSON.stringify(jsonData) // 에러메시지
      , {
        status: res.status
      } // 에러 정보 객체
    );
  }

  // loader가 리턴한 데이터는 라우팅된 페이지와
  // 그 컴포넌트의 하위 컴포넌트에서 언제든 뽑아서 사용할 수 있음
  return res; // loader는 fetch결과를 바로 리턴하는 경우 json추출작업을 자동수행
};

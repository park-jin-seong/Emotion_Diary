import { Routes, Route, Link, useNavigate, data } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";

import { getEmotionImage } from "./util/get-emotion-images";
import Header from "./components/Header";
import Button from "./components/Button";
import Editor from "./pages/Editor";
import { useEffect, useReducer, useRef, useState } from "react";
import { createContext } from "react";

// 임시 일기 데이터 생성 : mock
// const mockData = [
//   {
//     id: 1, // 각 일기를 구분 할 수 있는 key 필요
//     createDate: new Date("2025-06-01").getTime(), // getTime : 추후 날짜 정렬을 위해 숫자로 저장
//     emotionId: 1,
//     content: "1번 일기 내용",
//   },
//   {
//     id: 2,
//     createDate: new Date("2025-06-02").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용",
//   },
//   {
//     id: 3,
//     createDate: new Date("2025-06-03").getTime(),
//     emotionId: 3,
//     content: "3번 일기 내용",
//   },
//   {
//     id: 4,
//     createDate: new Date("2025-05-02").getTime(),
//     emotionId: 4,
//     content: "4번 일기 내용",
//   },
//   {
//     id: 5,
//     createDate: new Date("2025-07-03").getTime(),
//     emotionId: 5,
//     content: "5번 일기 내용",
//   },
// ];

// 실제 일기 데이터를 관리하기 위한 함수
function reducer(state, action) {
  let nextState; // 추가 수정 삭제 후 변경된 스테이트를 저장하기 위한 변수
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": // 일기 데이터 추가하는 액션
      nextState = [action.data, ...state]; // 기존 상태(mockData)에 새로운 데이터를 앞에 추가
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        // 각 일기의 id와 수정할 일기 id를 비교하여
        // 일치하면 전달받은 데이터로 값을 변경
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    case "DELETE":
      // 삭제요청이 발생한 일기 id와 기존에 일기들의 id를 비교하여
      // 다른 id를 가진 일기들만 새로운 배열로 반환
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    default:
      // 정의 되지 않은 action.type이면 현재 상태 그대로 반환
      return state;
  }
  // 일기가 삭제, 수정, 삭제될 때 마다 일기의 현재 데이터를 바로바로
  // 로컬 스토리지에 저장
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

/*
  localStorage.setItem("test", "hi");
  객체를 그대로 value에 넣으면 제대로 저장되지 않음
  localStorage.setItem("person", JSON.stringify({ name: "jiwon" }));
  localStorage.removeItem("test");
  console.log(localStorage.getItem("test"));
  console.log(localStorage.getItem("person"));
  console.log(JSON.parse(localStorage.getItem("person")));
  let obj = JSON.parse(localStorage.getItem("person"));
  console.log(obj.name);
 */

// context 사용 이유 : 모든 컴포넌트에 공유하기 위해서
// 일기 데이터 관리하는 context 생성
export const DiaryStateContext = createContext();
// CRUD 기능을 하는 함수 관리하는 context 생성
export const DiaryDispatchContext = createContext();

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  const [date, dispatch] = useReducer(reducer, []);
  // 로컬 스토리지에서 값을 가져오기 전에 다른 페이지 컴퍼넌트들이 랜더링 되면 문제 발생
  //  ex) 일기 상세보기 페이지에서 새로고침하면 없는 일기라고 뜨는 문제 발생
  //  따라서 로딩 기능을 만들 필요가 있다. -> 로딩 여부를 저장하는 state 추가
  const [isLoading, setIsLoading] = useState(true); // 현재 로딩중
  const idRef = useRef(0); // react변수 이므로 새로고침 or 웹브라우저 재시작 시 초기화

  // 컴포넌트가 마운트 되었을 떄 딱 한번만 로컬 스토리지에서 값을 받아오도록 처리
  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false); // 로딩 완료
      return;
    }

    // 웹 스토리지에 저장된 문자열 형태의 일기 데이터를 객체로 변환
    const parsedData = JSON.parse(storedData);

    let maxId = 0;
    parsedData.forEach((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });

    idRef.current = maxId + 1; // 새 일기의 id 지정

    // 기존에 웹 스토리지의 저장된 일기 데이터를 reducer() 전달
    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []); // 마운트 될 떄만 실행되도록 deps를 빈 배열로 지정
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: id,
        createDate,
        emotionId,
        content,
      },
    });
  };
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };
  if (isLoading) {
    console.log("아직 다 안올라왔다잉");
  }
  return (
    <>
      {/* <button
        onClick={() => {
          onCreate(new Date().getTime(), 5, "FUCKING TIRED");
        }}
      >
        ADD Diary Button
      </button>
      <button
        onClick={() => {
          onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다.");
        }}
      >
        1번 일기 수정 테스트 버튼
      </button>
      <button
        onClick={() => {
          onDelete(1);
        }}
      >
        1번 일기 삭제 테스트 버튼
      </button> */}
      <DiaryStateContext.Provider value={date}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;

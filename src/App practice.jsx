import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";

import { getEmotionImage } from "./util/get-emotion-images";
import Header from "./components/Header";
import Button from "./components/Button";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  const nav = useNavigate();
  const onClickButton = () => {
    nav("/diary");
  };
  return (
    <>
      <Header
        title={"title"}
        leftChild={<Button text={"Left"} />}
        rightChild={<Button text={"Right"} />}
      />
      <Button
        text={"123"}
        onClick={() => {
          console.log("123 버튼 클릭!!");
        }}
      />

      <Button
        text={"456"}
        type={"POSITIVE"}
        onClick={() => {
          console.log("123 버튼 클릭!!");
        }}
      />
      <div>
        {/* src/assets에 저장된 이미지 : 이미지 최적화 */}

        <img src={getEmotionImage(1)} />
        <img src={getEmotionImage(2)} />
        <img src={getEmotionImage(3)} />
        <img src={getEmotionImage(4)} />
        <img src={getEmotionImage(5)} />
        {/* public에 저장된 이미지 */}
        {/* <img src="/emotion5.png" /> */}
      </div>
      <a href="/new">New</a>

      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
      </div>

      <div>hi</div>

      {/* 이벤트 핸들러를 이용하여 특정 이벤트 발생 시 페이지 이동
      ex) 로그인, 회원가입 페이지
      이때에는 useNavigate라는 토글 사용하여 useNavigate()에서 반환하는 
      navigate 함수를 이용하여 페이지 이동 처리 */}
      <button onClick={onClickButton} style={{ backgroundColor: "lightblue" }}>
        go to Diary page
      </button>
      {/* 
      page 컴포넌트들은 브라우저의 URL에 따라서 
      각각 요청에 맞는 페이지가 렌더링 되어야 한다.
      이렇게 페이지 라우팅을 구현하려면 <Route> 사용해야함
      이 컴포넌트를 사용하려면 <Routes> 컴포넌트 안에서 사용 가능함
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

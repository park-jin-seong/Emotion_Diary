import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

// useDiary 훅을 만든이유 : id에 해당하는 특정 일기 객체 찾는 기능
// 리액트 훅은 무조건 컴퍼넌트 또는 같은 훅 내부에서만 사용 가능
const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const nav = useNavigate();
  const [currDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      // 명시적으로 브라우저의 전역 함수 사용 표시
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }
    setCurDiaryItem(currentDiaryItem);
  }, [id]); // deps : id 또는 data 값이 변경되면 useEffect 실행
  return currDiaryItem;
};
export default useDiary;

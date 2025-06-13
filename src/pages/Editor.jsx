import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Edit from "../components/Edit";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext } from "../App";
import { DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Editor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  const params = useParams();
  const currDiaryItem = useDiary(params.id);

  usePageTitle(params.id + "번 일기 수정");

  if (!currDiaryItem) {
    return <div>데이터 로딩중</div>;
  }
  console.log(currDiaryItem);

  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const onclickDelete = () => {
    if (window.confirm("정말 삭제 할까요?")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일일 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"◀ back"} />}
        rightChild={
          <Button type={"NEGATIVE"} onClick={onclickDelete} text={"삭제하기"} />
        }
      />
      <Edit initData={currDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Editor;

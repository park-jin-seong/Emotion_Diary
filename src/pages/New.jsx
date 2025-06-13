import Header from "../components/Header";
import Button from "../components/Button";
import Edit from "../components/Edit";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  usePageTitle("새 일기 쓰기");

  const onSubmit = (input) => {
    onCreate(input.createDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav(-1)} text={"◀ back"} />}
      />
      <Edit onSubmit={onSubmit} />
    </div>
  );
};

export default New;

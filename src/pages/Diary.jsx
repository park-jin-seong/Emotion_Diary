import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";
import Viewer from "../components/Viewer";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  usePageTitle(params.id + "번 일기");

  const currDiaryItem = useDiary(params.id);
  if (!currDiaryItem) {
    return <div>데이터 로딩중</div>;
  }
  const { createDate, emotionId, content } = currDiaryItem;

  const title = getStringedDate(new Date(createDate));
  return (
    <div>
      <Header
        title={title + " 기록"}
        leftChild={<Button onClick={() => nav(-1)} text={"◀ back"} />}
        rightChild={
          <Button
            onClick={() => nav("/editor/" + params.id)}
            text={"수정하기"}
          />
        }
      />
      <Viewer emotionId={emotionId} content={content}></Viewer>
    </div>
  );
};

export default Diary;

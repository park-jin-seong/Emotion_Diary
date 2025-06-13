import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./Edit.css";
import { useEffect, useState } from "react";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";

const Edit = ({ initData, onSubmit }) => {
  const nav = useNavigate();

  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({ ...initData, createDate: new Date(initData.createDate) });
    }
  }, [initData]);

  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "createDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
    console.log(onSubmitButtonClick);
  };
  console.log(onSubmitButtonClick);
  return (
    <div className="Edit">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createDate"
          value={getStringedDate(input.createDate)}
          onChange={onChangeInput}
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => {
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                });
              }}
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"cancel"} />
        <Button
          onClick={onSubmitButtonClick}
          text={"complete"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Edit;

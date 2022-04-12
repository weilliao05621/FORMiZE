import { FC } from "react";
import styled from "styled-components";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 70%;
  right: 4%;
  padding-top: 0.4rem;
  width: 10rem;
  background-color: #333;
  z-index: 1;
  /* height: 100%; */
`;

const Item = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
  padding: 0.4rem 1rem;
  cursor: pointer;

  &:hover {
    /* color: #f90; */
    background-color: #f90;
  }
`;

const defalutOptionItems = [
  "開啟",
  "預覽",
  "移動",
  "複製",
  "建立子問卷",
  "統計圖表",
  "明細匯出",
  "刪除問卷",
];

const SurveyOptionList: FC = () => {
  return (
    <ListWrapper>
      {defalutOptionItems.map((t, i) => (
        <Item key={i}>{t}</Item>
      ))}
    </ListWrapper>
  );
};

export default SurveyOptionList;
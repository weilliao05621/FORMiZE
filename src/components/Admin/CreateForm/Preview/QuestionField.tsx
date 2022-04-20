import { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../store/slice/questionSlice";
import Field from "./UI/Field";
import TitleIndex from "./UI/TitleIndex";
import EditableTitle from "./UI/EditableTitle";
import Note from "./UI/Note";
import type { Question } from "../../../../types/question";

import OneLineText from "./Fields/OneLineText";
import MultiLineText from "./Fields/MultiLineText";
import Introduction from "./Fields/Introduction";
import Choice from "./Fields/OneChoice";
import MultiChoice from "./Fields/MultiChoice";
import Martix from "./Fields/Martix";
import Slider from "./Fields/Slider";
import SequenceWeight from "./Fields/Sort";
import Date from "./Fields/Date";
import QuestionDeleteButton from "./QuestionDeleteButton";
import useDeleteQuestion from "../../../../hooks/useDeleteQuestion";

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

interface QuestionFieldProps {
  question: Question;
  titleIndex: string;
}

const generateResponseQuestion = (type: string, question: Question) => {
  switch (type) {
    case "0":
      return <OneLineText />;
    case "1":
      return <MultiLineText />;
    case "2":
      return <Introduction id={question.id} title={question.title} />;
    case "3":
      if (question.options) {
        return <Choice id={question.id} options={question.options} />;
      }
    case "4":
      if (question.options) {
        return <Choice id={question.id} options={question.options} />;
      }
    case "5":
      if (question.options && question.martixs) {
        return (
          <Martix
            id={question.id}
            options={question.options}
            martixs={question.martixs}
          />
        );
      }
    case "6":
      return <OneLineText />;
    case "7":
      if (question.validations.min && question.validations.max) {
        return (
          <Slider
            id={question.id}
            min={question.validations.min}
            max={question.validations.max}
          />
        );
      }
    case "8":
      if (question.options) {
        return (
          <>
            <Choice id={question.id} options={question.options} />
          </>
        );
      }
    case "9":
      return <Date id={question.id} />;
  }
};

const QuestionField: FC<QuestionFieldProps> = ({
  question,
  titleIndex,
}: QuestionFieldProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestion } = useAppSelector((state) => state.question);
  const editingFieldHandler = (question: Question, target: Element) => {
    const hasSwitched = editingQuestion && editingQuestion.id === question.id;
    if (hasSwitched) return;

    dispatch(questionActions.willChangeLimitationValue(true));

    const hasId = target.id ? true : false;
    if (hasId && target.id === question.id) {
      dispatch(questionActions.switchEditingQuestion(null));
      return;
    }
    dispatch(questionActions.switchEditingQuestion(question));
  };

  const deleteAddedQuestionHandler = useDeleteQuestion(editingQuestion);

  return (
    <Field
      key={question.id}
      onClick={(event) => {
        const { target } = event;
        editingFieldHandler(question, target as Element);
      }}
      isActive={question.id === editingQuestion?.id}
    >
      <QuestionDeleteButton
        id={question.id}
        text="X"
        clickHandler={() => {
          deleteAddedQuestionHandler(question.id);
        }}
      />
      {question.type !== "2" && (
        <>
          <TitleWrapper>
            <TitleIndex titleIndex={titleIndex} />
            <EditableTitle id={question.id} title={question.title} />
          </TitleWrapper>
          <Note id={question.id} note={question.note} />
        </>
      )}
      {generateResponseQuestion(question.type, question)}
    </Field>
  );
};

export default QuestionField;

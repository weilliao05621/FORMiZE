import { FC } from "react";

import styled from "styled-components";

import questionConfig from "../../configs/questionConfig";
import useAppSelector from "../../hooks/useAppSelector";
import { Question } from "../../types/question";
import helper from "../../utils/helper";
import Date from "./QuestionType/Date";
import Introduction from "./QuestionType/Introdction";
import Matrix from "./QuestionType/Matrix";
import MultiChoice from "./QuestionType/MultipleChoice";
import MultipleLineText from "./QuestionType/MultipleLineText";
import OneChoice from "./QuestionType/OneChoice";
import OneLineText from "./QuestionType/OneLineText";
import Slider from "./QuestionType/Slider";
import Sort from "./QuestionType/Sort";

interface QuestionWrapperProps {
  hasErrorMessage: boolean;
  isCreatingProcess: boolean;
}

const QuestionWrapper = styled.div<QuestionWrapperProps>`
  padding: 2rem 2rem 0 2rem;
  position: relative;
  width: 100%;

  &:first-child {
    margin-top: 6rem;
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  border-radius: 7px;
  border: 3px solid transparent;
  transition: border 0.3s ease-in-out;

  ${(props) =>
    !props.hasErrorMessage
      ? ""
      : `
    border: 3px solid ${props.theme.titleContrast};
  `}

  ${(props) => (props.isCreatingProcess ? "border:none" : "")}
`;

const Heading = styled.div`
  display: inline-block;
  font-size: 2rem;
  line-break: strict;
  color: ${(props) => {
    return props.theme.title;
  }};

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const NoteText = styled.div`
  width: 100%;
  color: #aaa;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.note}; ;
`;

const QuestionTypeTag = styled.div`
  display: inline-block;
  margin-left: 1rem;
  padding: 0 1.6rem;
  height: 2.4rem;
  font-size: 1.6rem;
  border-radius: 30px;
  background-color: ${(props) => props.theme.option};
  text-align: center;
  line-height: 2.4rem;
  color: #fff;
  transform: translateY(-0.1rem);
`;

const LimitationQuestionTag = styled(QuestionTypeTag)`
  background-color: ${(props) => props.theme.titleContrast};
`;

const ErrorReminder = styled.p`
  margin: 2rem 0;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.5rem;
  color: ${(props) => props.theme.titleContrast};
  animation: moveInTop 0.3s ease-in-out;

  @keyframes moveInTop {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0rem);
    }
  }
`;

const EmptyErrorMessage = styled.div`
  margin: 2rem 0;
  height: 2rem;
`;

interface QuestionListProps {
  titleIndex: string;
  question: Question;
  isCreatingProcess: boolean;
}

const QuestionList: FC<QuestionListProps> = ({
  titleIndex,
  question,
  isCreatingProcess = false,
}) => {
  const { errorMessages, errorMessagesIdKeys } = useAppSelector(
    (state) => state.user
  );
  const errorMessage = errorMessages[errorMessagesIdKeys[question.id]];
  const hasErrorMessage = errorMessage !== "";
  const limitationTagText = helper.generateQuestionLimitationTagText(question);

  const isNotIntroduction =
    errorMessage !== "" ? (
      <ErrorReminder>{errorMessage}</ErrorReminder>
    ) : (
      <EmptyErrorMessage />
    );

  return (
    <>
      <QuestionWrapper
        hasErrorMessage={hasErrorMessage}
        style={{ marginBottom: question.type === "2" ? "4rem" : "2rem" }}
        isCreatingProcess={isCreatingProcess}
      >
        {question.type !== "2" && (
          <>
            <Heading>
              {helper.generateUserFormQuestionTitle(titleIndex, question.title)}
            </Heading>
            <QuestionTypeTag>
              {questionConfig[question.type] + "題"}
            </QuestionTypeTag>
            {limitationTagText !== "" && (
              <LimitationQuestionTag>{limitationTagText}</LimitationQuestionTag>
            )}
            {question.note.trim().length !== 0 && (
              <NoteText>{question.note}</NoteText>
            )}
          </>
        )}

        {question.type === "0" && (
          <OneLineText
            textType="text"
            length={question.validations.length}
            questionId={question.id}
          />
        )}

        {question.type === "1" && (
          <MultipleLineText
            maxLength={question.validations.length}
            questionId={question.id}
          />
        )}

        {question.type === "2" && <Introduction textContent={question.title} />}
        {question.type === "3" && (
          <OneChoice
            options={question.options ? question.options : []}
            questionId={question.id}
            isCreatingProcess={isCreatingProcess}
          />
        )}
        {question.type === "4" && (
          <MultiChoice
            options={question.options ? question.options : []}
            maxSelected={
              question.validations.maxSelected
                ? question.validations.maxSelected
                : 1
            }
            questionId={question.id}
            isCreatingProcess={isCreatingProcess}
          />
        )}
        {question.type === "5" && (
          <Matrix
            options={question.options ? question.options : []}
            matrixs={question.matrixs ? question.matrixs : []}
            questionId={question.id}
          />
        )}
        {question.type === "6" && (
          <OneLineText
            textType="number"
            questionId={question.id}
            max={question.validations.max}
            min={question.validations.min}
            decimal={question.validations.decimal}
          />
        )}

        {question.type === "7" && (
          <Slider
            questionId={question.id}
            max={question.validations.max && question.validations.max}
            min={question.validations.min && question.validations.min}
            unit={question.validations.unit && question.validations.unit}
            interval={
              question.validations.interval && question.validations.interval
            }
          />
        )}

        {question.type === "8" && (
          <Sort
            options={question.options ? question.options : []}
            maxSelected={
              question.validations.maxSelected
                ? question.validations.maxSelected
                : 1
            }
            questionId={question.id}
          />
        )}

        {question.type === "9" && (
          <Date
            questionId={question.id}
            isMultipleDate={question.validations.multipleDate}
            hasRange={question.validations.hasRange}
            startDate={question.validations.startDate}
            endDate={question.validations.endDate}
            maxSelectedDateQuantity={
              question.validations.maxSelectedDateQuantity
            }
          />
        )}

        {question.type !== "2" ? isNotIntroduction : <></>}
      </QuestionWrapper>
    </>
  );
};

export default QuestionList;
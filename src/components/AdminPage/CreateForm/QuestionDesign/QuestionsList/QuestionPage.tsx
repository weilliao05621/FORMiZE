import { FC, ReactNode, useState } from "react";

import { KeyboardArrowDown } from "@styled-icons/material-rounded/KeyboardArrowDown";
import styled from "styled-components";

import breakpointConfig from "../../../../../configs/breakpointConfig";
import useAppDispatch from "../../../../../hooks/useAppDispatch";
import useAppSelector from "../../../../../hooks/useAppSelector";
import { questionActions } from "../../../../../store/slice/questionSlice";
import scrollBar from "../../../../UI/scrollBar";
import useCheckQuestionArraySameString from "../../../../../hooks/useCheckQuestionArraySameString";
import sweetAlert from "../../../../../utils/sweetAlert";

interface PageWrapperProps {
  isActive: boolean;
}

const SwitchPageReminder = styled.div`
  position: absolute;

  opacity: 0;
  visibility: hidden;
  text-align: center;
  padding: 0.4rem 1rem;
  font-size: 1.4rem;

  background-color: #fff;
  color: #f90;

  transition: opacity 0.3s, visibility 0.3s;
`;

const PageWrapper = styled.div<PageWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  width: 100%;
  border-radius: 3px;
  border: ${(props: PageWrapperProps) =>
    props.isActive ? " 3px solid#777 " : "1px solid  #c8c8c8"};
  transition: border 0.3s;
  cursor: pointer;

  ${(props) =>
    props.isActive
      ? ""
      : ` 
    &:not(:hover) ${SwitchPageReminder} {
      opacity: 0;
      visibility: hidden;
    }

    &:hover ${SwitchPageReminder} {
      opacity: 1;
      visibility: visible;
    }`}

  @media ${breakpointConfig.laptopM} {
    margin-top: 2rem;
    padding: 2rem 1rem;
    margin-bottom: 0;
    overflow-y: auto;
    ${scrollBar}
  } ;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  & .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  width: 90%;
  cursor: pointer;
`;
interface ExpandMoreProps {
  isExpand: boolean;
}

const ExpandMore = styled(KeyboardArrowDown)<ExpandMoreProps>`
  width: 10%;
  height: 2rem;
  cursor: pointer;
  transform: ${(props) => `rotate(${props.isExpand ? "-180deg" : ""})`};
  transition: transform 0.3s;
`;

interface QuestionPageProps {
  title: string;
  isActive: boolean;
  page: number;
  children: ReactNode;
}

const QuestionPage: FC<QuestionPageProps> = ({
  title,
  isActive,
  page,
  children,
}: QuestionPageProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { editingFormPage, isEditingOption, isEditingMatrix } = useAppSelector(
    (state) => state.question
  );
  const checkHasNoSameArrayStringNameHandler = useCheckQuestionArraySameString();

  const switchEditingFormPageHandler = (page: number) => {
    dispatch(questionActions.switchEditingField({ id: null, page }));
  };

  return (
    <PageWrapper
      isActive={isActive}
      onClick={(event: any) => {
        if (event.target.nodeName === "svg" || event.target.nodeName === "path") return;
        if (editingFormPage === page) return;
        const hasNoSameStringName = checkHasNoSameArrayStringNameHandler();
        if (!hasNoSameStringName) return;
        if (isEditingOption || isEditingMatrix) {
          sweetAlert.errorReminderAlert("請先儲存正在編輯的選項或內容！");
          return;
        }
        switchEditingFormPageHandler(page);
      }}
    >
      <SwitchPageReminder>點擊能切換編輯的分頁</SwitchPageReminder>
      <TitleWrapper>
        <Title>{title}</Title>

        <ExpandMore isExpand={isExpanded} onClick={() => setIsExpanded((prev) => !prev)} />
      </TitleWrapper>
      {isExpanded && children}
    </PageWrapper>
  );
};

export default QuestionPage;

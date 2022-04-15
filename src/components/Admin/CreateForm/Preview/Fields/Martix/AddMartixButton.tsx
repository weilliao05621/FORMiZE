import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { ButtonWrapper } from "../UI/AddOptionButton";

const Button = styled(ButtonWrapper)`
  width: auto;
  height: 2rem;
  background-color: #f55;
  margin-bottom: 0;
  font-size: 1.4rem;
`;

interface AddMartixButtonProps {
  id: string;
  martixs: string[];
}

const AddMartixButton: FC<AddMartixButtonProps> = ({
  id,
  martixs,
}: AddMartixButtonProps) => {
  const dispatch = useAppDispatch();
  const addNewMartixHandler = () => {
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MARTIXS,
        stringArr: [...martixs, `預設選項${martixs.length + 1}`],
      })
    );
  };

  return <Button onClick={addNewMartixHandler}>新增欄位</Button>;
};

export default AddMartixButton;

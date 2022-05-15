import { FC } from "react";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import styled from "styled-components";
import { ButtonWrapper, ButtonText, AddButtonIcon } from "../../UI/Button";
import sweetAlert from "../../../../../../utils/sweetAlert";
import useCheckEditingStateOfTextEditingField from "../../../../../../hooks/useCheckEditingStateOfTextEditingField";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";

interface MatrixButtonProps {
  isEditingField: boolean;
}

const MatrixButton = styled(ButtonWrapper)<MatrixButtonProps>`
  margin-bottom: 0;

  /* ${(props) =>
    props.isEditingField
      ? ""
      : `
  &:hover {
    background-color:${props.theme.title};  
  }
  `} */
`;

interface AddMatrixButtonProps {
  id: string;
  matrixs: string[];
}

const AddMatrixButton: FC<AddMatrixButtonProps> = ({
  id,
  matrixs,
}: AddMatrixButtonProps) => {
  const dispatch = useAppDispatch();
  const { editingQuestion } = useAppSelector((state) => state.question);
  const checkOpenEditingTextHandler = useCheckEditingStateOfTextEditingField();

  const hasEditingQuestion = editingQuestion !== null ? editingQuestion.id : "";
  const isEditingField = hasEditingQuestion === id;
  const addNewMatrixHandler = () => {
    if (matrixs.length > 4) {
      sweetAlert.errorReminderAlert(
        "【 新增失敗 】\n欄位數量目前最多只能5個！"
      );
      return;
    }
    const updateMatrixs = [...matrixs, "預設欄位"];
    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id,
        actionType: questionActionType.MATRIXS,
        stringArr: updateMatrixs,
      })
    );
  };

  return (
    <MatrixButton
      isEditingField={isEditingField}
      onClick={() => {
        checkOpenEditingTextHandler(addNewMatrixHandler, id);
      }}
    >
      <ButtonText>新增欄位</ButtonText>
      <AddButtonIcon />
    </MatrixButton>
  );
};

export default AddMatrixButton;

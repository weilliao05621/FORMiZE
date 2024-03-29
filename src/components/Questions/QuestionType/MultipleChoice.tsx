import { FC, useState, useEffect, useRef, ChangeEvent } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import styled from "styled-components";

import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import useCheckAnswerValid from "../../../hooks/useCheckAnswerValid";
import useGetQuestionIdIndex from "../../../hooks/useGetQuestionIdIndex";
import { userActions } from "../../../store/slice/userSlice";
import {
  CustomIcon,
  CustomCheckedIcon,
  CustomFormLabel,
} from "./ChoiceIcon/icon";

const CustomFormControl = styled(FormControl)`
  margin: 0;
  width: 100%;
  font-family: inherit;

  & .MuiTypography-root {
    margin-left: 1rem;
    font-family: inherit;
    font-size: 1.8rem;
  }

  & .MuiFormControlLabel-root {
    margin-right: 0;
    width: 100%;
  }
`;

const CustomFormGroup = styled(FormGroup)`
  align-items: end;
`;

interface MultipleChoiceProps {
  options: string[];
  maxSelected: number;
  questionId: string;
  isCreatingProcess: boolean;
}

const MultipleChoice: FC<MultipleChoiceProps> = ({
  options,
  maxSelected,
  questionId,
  isCreatingProcess = false,
}) => {
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.user);
  const showInvalidHandler = useCheckAnswerValid(questionId);
  const questionIdIndex = useGetQuestionIdIndex(questionId);
  const existingInput = answers[questionIdIndex]
    ? answers[questionIdIndex].input
    : "";

  const [isValid, setIsValid] = useState(() => {
    const existedOption: {
      [key: string]: boolean;
    } = {};

    options.forEach((option, i) => {
      if (!existingInput || isCreatingProcess) {
        existedOption[option] = false;
        return;
      }
      if (existingInput.includes(`${i + 1}.`)) {
        existedOption[option] = true;
        return;
      }
      existedOption[option] = false;
    });
    return existedOption;
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
    const selectedArray: string[] = [];

    if (!existingInput || isCreatingProcess) {
      return Array(options.length).fill("");
    }
    options.forEach((option, i) => {
      const existingOptionValue = `${i + 1}.${option}\n`;
      if (existingInput.includes(existingOptionValue)) {
        selectedArray[i] = existingOptionValue;
        return;
      }
      selectedArray[i] = "";
    });

    return selectedArray;
  });

  const isDidMount = useRef<boolean>(true);
  const optionValue = Object.values(isValid);
  const error = optionValue.filter((value) => value).length > maxSelected;

  const checkSelectedOptionNumberHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsValid((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked,
      };
    });

    const input = `${+event.target.id + 1}.${event.target.name}\n`;
    const updateInput = selectedOptions.includes(input) ? "" : `${input}`;

    setSelectedOptions((prevState) => {
      const updateState = [...prevState];
      updateState[+event.target.id] = updateInput;
      return updateState;
    });
  };

  useEffect(() => {
    if (isDidMount.current) {
      isDidMount.current = false;
      return;
    }
    const input =
      selectedOptions.join("") === "" ? null : selectedOptions.join("");
    dispatch(
      userActions.updateFormAnswer({
        questionIdIndex,
        input,
      })
    );

    if (error) {
      showInvalidHandler(`最多只能選擇${maxSelected}個選項!`);
      return;
    }

    showInvalidHandler("");
  }, [selectedOptions]);

  return (
    <CustomFormControl required error={error} variant="standard">
      <CustomFormGroup>
        {options.map((option, i) => (
          <CustomFormLabel
            active={optionValue[i] ? "true" : "false"}
            key={i}
            control={
              <Checkbox
                disableRipple
                icon={<CustomIcon />}
                checkedIcon={<CustomCheckedIcon />}
                checked={optionValue[i]}
                onChange={checkSelectedOptionNumberHandler}
                name={option}
                id={`${i}`}
              />
            }
            label={option}
          />
        ))}
      </CustomFormGroup>
    </CustomFormControl>
  );
};

export default MultipleChoice;

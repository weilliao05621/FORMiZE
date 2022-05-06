import { FC, useEffect, useRef } from "react";
import useGenerateValidationHandler from "../../../../../../hooks/useGenerateValidationHandler";
import useGetQuestion from "../../../../../../hooks/useQuestion";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";

import type { Question } from "../../../../../../types/question";

import { Switch } from "@mui/material";
import RequiredSwitch from "./UI/RequiredSwitch";
import TextInput from "./UI/TextInput";
import LimitationWrapper from "./UI/LimitationWrapper";
import Field from "./UI/Field";
import Label from "./UI/Label";

import helper from "../../../../../../utils/helper";
import questionConfig from "../../../../../../configs/questionConfig";
import { questionActions } from "../../../../../../store/slice/questionSlice";
import questionActionType from "../../../../../../store/actionType/questionActionType";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
interface DateLimitationProps {
  id: string;
}

const DateLimitation: FC<DateLimitationProps> = ({
  id,
}: DateLimitationProps) => {
  const question = useGetQuestion(id) as Question;
  const dispatch = useAppDispatch();
  const startDate = questionConfig.START_DATE;
  const endDate = questionConfig.END_DATE;
  const maxSelectedDateQuantity = questionConfig.MAX_SELECTED_DATE_QUANTITY;

  const didUpdateRange = useRef<boolean>(false);
  const didUpdateMultipleDate = useRef<boolean>(false);

  console.log(question.validations);

  const startDateValidationHandler = (value: string) => {
    console.log(question.validations.endDate);
    if (question.validations.endDate === undefined) return null;
    const startDateReplace = helper.generateParseNumberTime(value);
    if (!question.validations.endDate) return null;
    const { endDate } = question.validations;
    const endDateReplace = helper.generateParseNumberTime(endDate, false);
    if (startDateReplace < endDateReplace) return null;
    return "起始日期不可以大於終點日期(但可同日)，請再選擇一次來修正";
  };

  const endDateValidationHandler = (value: string) => {
    if (question.validations.startDate === undefined) return null;
    const endDateReplace = helper.generateParseNumberTime(value, false);
    if (!question.validations.startDate) return null;
    const { startDate } = question.validations;
    const startDateReplace = helper.generateParseNumberTime(startDate);
    if (startDateReplace < endDateReplace) return null;
    return "終點日期不可以小於起始日期(但可同日)，請再選擇一次來修正";
  };

  const maxSelectedDateQuantityValidationHandler = (value: string) => {
    if (question.validations.maxSelectedDateQuantity === undefined) return null;
    if (+value >= 2) return null;
    return "請填入至少為2的數值";
  };
  // prettier-ignore
  const startDateHandler = useGenerateValidationHandler(id, startDate, false, question,startDateValidationHandler);
  // prettier-ignore
  const endDateHandler = useGenerateValidationHandler(id, endDate, false, question,endDateValidationHandler);
  // prettier-ignore
  const maxSelectedDateQuantityHandler = useGenerateValidationHandler(id,maxSelectedDateQuantity,true,question,maxSelectedDateQuantityValidationHandler)

  useEffect(() => {
    if (!didUpdateRange.current) return;
    didUpdateRange.current = false;

    if (question.validations.hasRange) {
      const currentDate = helper.generateNewDate();
      const tomorrowDate = helper.generateNewDate(
        helper.generateNewDate().getTime() + 1000 * 60 * 60 * 24
      );
      const initStartDate = helper.generateDateFormatString(currentDate);
      const initEndDate = helper.generateDateFormatString(tomorrowDate);
      dispatch(
        questionActions.initRangeDateOfDateQuestion({
          id: question.id,
          startDate: initStartDate,
          endDate: initEndDate,
        })
      );
      return;
    }

    dispatch(
      questionActions.initRangeDateOfDateQuestion({
        id: question.id,
        startDate: null,
        endDate: null,
      })
    );
  }, [question.validations.hasRange]);

  useEffect(() => {
    if (!didUpdateMultipleDate.current) return;
    didUpdateMultipleDate.current = false;
    const initMaxSelectedDateQuantity = question.validations.multipleDate
      ? 2
      : null;

    dispatch(
      questionActions.updateSiglePropOfQuestion({
        id: question.id,
        actionType: questionActionType.VALIDATIONS,
        validations: {
          ...question.validations,
          maxSelectedDateQuantity: initMaxSelectedDateQuantity,
        },
      })
    );
  }, [question.validations.multipleDate]);

  return (
    <LimitationWrapper>
      <RequiredSwitch id={id} />
      <Field>
        <Label>允許多日</Label>
        <Switch
          checked={question.validations.multipleDate}
          onChange={(event) => {
            const { checked } = event.target;
            didUpdateMultipleDate.current = true;
            dispatch(
              questionActions.updateSiglePropOfQuestion({
                id: question.id,
                actionType: questionActionType.VALIDATIONS,
                validations: {
                  ...question.validations,
                  multipleDate: checked,
                },
              })
            );
          }}
        />
      </Field>
      {question.validations.multipleDate && (
        <Field>
          <Label>天數上限</Label>
          <TextInput
            id={id}
            inputType="number"
            validationType={questionConfig.DATE}
            defaultValue="2"
            dispatchHandler={maxSelectedDateQuantityHandler}
          />
        </Field>
      )}
      <Field>
        <Label>設定範圍</Label>
        <Switch
          checked={question.validations.hasRange}
          onChange={(event) => {
            const { checked } = event.target;
            didUpdateRange.current = true;
            dispatch(
              questionActions.updateSiglePropOfQuestion({
                id: question.id,
                actionType: questionActionType.VALIDATIONS,
                validations: {
                  ...question.validations,
                  hasRange: checked,
                },
              })
            );
          }}
        />
      </Field>
      {question.validations.hasRange && (
        <>
          <Field>
            <Label>起始日期</Label>
            <TextInput
              id={id}
              label="設定範圍起始"
              inputType="date"
              defaultValue={helper.generateDate()}
              validationType={questionConfig.DATE}
              dispatchHandler={startDateHandler}
            />
          </Field>
          <Field>
            <Label>結尾日期</Label>
            <TextInput
              id={id}
              label="設定範圍終點"
              inputType="date"
              defaultValue={helper.generateDate(false)}
              validationType={questionConfig.DATE}
              dispatchHandler={endDateHandler}
            />
          </Field>
        </>
      )}
    </LimitationWrapper>
  );
};

export default DateLimitation;

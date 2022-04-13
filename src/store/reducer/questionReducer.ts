import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import type {
  QuestionState,
  Question,
  Validation,
} from "../slice/questionSlice";
import questionActionType from "../actionType/questionActionType";

/*
  新增題目
  刪除題目
  改單一選項? ( 移除的話要帶 default 回來)
*/

const addNewQuestion: CaseReducer<QuestionState, PayloadAction<Question>> = (
  state,
  action
) => {
  state.questions.push(action.payload);
};

const deleteExistedQuestion: CaseReducer<
  QuestionState,
  PayloadAction<string>
> = (state, action) => {
  state.questions = state.questions.filter(
    (question) => question.id !== action.payload
  );
};

const updateSiglePropOfQuestion: CaseReducer<
  QuestionState,
  PayloadAction<{
    id: string;
    text?: string;
    number?: number;
    booleanOption?: boolean;
    date?: Date;
    stringArr?: string[];
    validations?: Validation;
  }>
> = (state, action) => {
  try {
    state.questions = state.questions.map((question) => {
      if (question.id !== action.payload.id) return question;
      switch (action.type) {
        case questionActionType.TITLE: {
          if (action.payload.text) {
            return {
              ...question,
              title: action.payload.text,
            };
          }
        }
        case questionActionType.NOTE: {
          if (action.payload.text) {
            return {
              ...question,
              note: action.payload.text,
            };
          }
        }
        case questionActionType.PLACEHOLDER: {
          if (action.payload.text) {
            return {
              ...question,
              placeholder: action.payload.text,
            };
          }
        }

        case questionActionType.PAGE: {
          if (action.payload.number) {
            return {
              ...question,
              page: action.payload.number,
            };
          }
        }

        case questionActionType.TYPE: {
          if (action.payload.number) {
            return {
              ...question,
              type: action.payload.number,
            };
          }
        }

        case questionActionType.OPTIONS: {
          if (action.payload.stringArr) {
            return {
              ...question,
              options: action.payload.stringArr,
            };
          }
        }

        case questionActionType.MARTIXS: {
          if (action.payload.stringArr) {
            return {
              ...question,
              martixs: action.payload.stringArr,
            };
          }
        }

        case questionActionType.VALIDATIONS: {
          if (action.payload.validations) {
            return {
              ...question,
              validations: action.payload.validations,
            };
          }
        }

        default: {
          throw new Error(
            "updateQuestionDisplayText只能用來更新題目內容是文字類的欄位"
          );
        }
      }
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

export default {
  addNewQuestion,
  deleteExistedQuestion,
  updateSiglePropOfQuestion,
};
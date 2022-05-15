import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/questionReducer";
import { Question } from "../../types/question";
export interface ErrorMessage {
  id: string;
  message: string;
}

export interface QuestionState {
  questions: Question[];
  editingQuestion: Question | null;
  willSwitcEditinghQuestion: boolean;
  accumulatedInValidInputError: ErrorMessage[];
  currentStep: number;
  editingFormPage: number;
  isEditingOption: boolean;
  isSwitchingEditingOption: boolean;
  editingOptionQuantity: number;
  isEditingMatrix: boolean;
  isSwitchingEditingMatrix: boolean;
  editingMatrixQuantity: number;
}

const initialState: QuestionState = {
  questions: [],
  editingQuestion: null,
  willSwitcEditinghQuestion: false,
  accumulatedInValidInputError: [{ id: "", message: "" }],
  currentStep: 1,
  editingFormPage: 1,
  isEditingOption: false,
  isSwitchingEditingOption: false,
  editingOptionQuantity: 0,
  isEditingMatrix: false,
  isSwitchingEditingMatrix: false,
  editingMatrixQuantity: 0,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers,
});

export const questionReducer = questionSlice.reducer;
export const questionActions = questionSlice.actions;

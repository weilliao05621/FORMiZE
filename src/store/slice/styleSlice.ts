import { createSlice } from "@reduxjs/toolkit";
import reducers from "../reducer/styleReducer";
import styleConfig from "../../configs/styleConfig";
import backgroundConfig from "../../configs/backgroundConfig";

export interface StyleState {
  theme: string;
  font: string;
  backgroundImages: string[];
}

const initialState: StyleState = {
  theme: styleConfig.MAIN_CODE,
  font: styleConfig.OPENHUNNINN_CODE,
  backgroundImages: [backgroundConfig.YELLOW1],
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers,
});

export const styleReducer = styleSlice.reducer;
export const styleActions = styleSlice.actions;

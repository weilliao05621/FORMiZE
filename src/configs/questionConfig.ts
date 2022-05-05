interface QuestionConfig {
  [key: string]: string;
}

const questionConfig: QuestionConfig = {
  ONE_LINE_TEXT: "0",
  MULTIPLE_LINE_TEXT: "1",
  INTRODUCTION: "2",
  ONE_CHOICE: "3",
  MULTIPLE_CHOICE: "4",
  MATRIX: "5",
  NUMBER: "6",
  SLIDER: "7",
  SORT: "8",
  DATE: "9",
  REQUIRED: "required",
  LENGTH: "length",
  MAX_SELECTED: "maxSelected",
  MIN: "min",
  MAX: "max",
  UNIT: "unit",
  INTERVAL: "interval",
  DECIMAL: "decimal",
  START_DATE: "startDate",
  END_DATE: "endDate",
  "0": "單行文字",
  "1": "多行文字",
  "2": "引言",
  "3": "單選",
  "4": "多選",
  "5": "矩陣",
  "6": "數值",
  "7": "滑桿",
  "8": "排序",
  "9": "日期",
};
export default questionConfig;

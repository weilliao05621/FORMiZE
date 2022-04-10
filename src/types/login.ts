// import { MouseEvent } from "react";

export interface SignFunctionType {
  (email: string, password: string): void;
}

export interface UserInfoType {
  email: string;
  password: string;
}

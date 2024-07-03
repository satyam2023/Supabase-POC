import { MutableRefObject } from "react";
import { TextStyle, ViewStyle } from "react-native";

export interface IUserDetails {
  [key: string | number]: MutableRefObject<string>;
  email: MutableRefObject<string>;
  password: MutableRefObject<string>;
}

export interface IToDoStyle {
  addBtn: ViewStyle;
  itemContainer: ViewStyle;
  delUpdContainer: ViewStyle;
  delBtn: ViewStyle;
  updBtn: ViewStyle;
  headingStyle: TextStyle;
}

export interface Itable {
  id: string;
  Values: string;
  Created_By: string;
  last_updated: string;
  created_at: string;
}

export interface IScore {
  id: number;
  name: string;
  score: number;
  user_id: string;
}

export interface IStoreStyle{
    addLocationBtn:ViewStyle;
    container:ViewStyle; 
}

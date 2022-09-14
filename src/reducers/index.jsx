import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import getCategoriesReduce from "./getCategoriesReduce";

export default combineReducers({
  auth: LoginReducer,
  categories: getCategoriesReduce
});
import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import getCategoriesReducer from "./getCategoriesReducer";
import getMeasuresReducer from "./getMeasuresReducer";
import getMaterialsReducer from "./getMaterialsReducer";

export default combineReducers({
  auth: LoginReducer,
  categories: getCategoriesReducer,
  unit_measures: getMeasuresReducer,
  materials: getMaterialsReducer,
});
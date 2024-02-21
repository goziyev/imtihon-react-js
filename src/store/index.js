import { combineReducers, createStore } from "redux";
import { customeReducer } from "./customerReducer";

const rootReducer = combineReducers({
  customers: customeReducer,
});

export const store = createStore(rootReducer);

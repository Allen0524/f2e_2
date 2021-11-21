import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./reducer";
import SearchReducer from "./reducer/searchReducer";

export default configureStore({
  reducer: {
    appState: AppReducer,
    searchState: SearchReducer,
  },
});

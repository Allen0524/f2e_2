import { createSlice } from "@reduxjs/toolkit";

export const SearchReducer = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    searchValue: "",
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchValue: (state, acorn) => {
      state.searchValue = acorn.payload;
    },
  },
});

export const { setSearchResult, setSearchValue } = SearchReducer.actions;

export default SearchReducer.reducer;

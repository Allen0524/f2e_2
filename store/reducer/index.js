import { createSlice } from "@reduxjs/toolkit";

export const AppReducer = createSlice({
  name: "app",
  initialState: {
    data: [],
    userCoords: {
      lon: 0,
      lat: 0,
    },
    switchValue: "findBike",
    viewPortStore: {
      latitude: 0,
      longitude: 0,
      zoom: 14,
    },
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setCoords: (state, action) => {
      state.userCoords = action.payload;
    },
    setSwitchValue: (state, action) => {
      state.switchValue = action.payload;
    },
    setViewPortStore: (state, action) => {
      state.viewPortStore = action.payload;
    },
  },
});

export const { setData, setCoords, setSwitchValue, setViewPortStore } =
  AppReducer.actions;

export default AppReducer.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TData } from "../../types";
import { z1MapAPI } from "./../../core/Z1MapAPI";

const initialState = {
  results: {},
  error: null,
  location: null,
  loading: "idle",
  currentRequestId: undefined,
};
export const fetchWhatHere = createAsyncThunk(
  "fetchWhatHere",
  async (
    params: TData,
    { getState, signal, requestId, rejectWithValue, dispatch }: any
  ) => {
    const location = params.location;
    dispatch(setLocation(location));
    const { currentRequestId, loading } = getState().whathere;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return;
    }
    let source = signal.addEventListener("abort", () => {
      source.cancel();
    });
    try {
      const { data } = await z1MapAPI.fetchGeoLocation(
        location,
        (_source) => (source = _source)
      );
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
const whatHereSlice = createSlice({
  name: "whathere",
  initialState,
  reducers: {
    reset: () => initialState,
    setLocation: (state: any, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWhatHere.pending, (state: any, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchWhatHere.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.results = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchWhatHere.rejected, (state: any, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.error = action.error;
          state.results = {};
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { reset, setLocation } = whatHereSlice.actions;
export default whatHereSlice.reducer;

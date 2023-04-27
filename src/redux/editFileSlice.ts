import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TextFile } from "../models/TextFile";
import {editFile, getFile} from "./filesThunk";

type EditFileReducerState = {
  isLoading: boolean;
  isError: boolean;
  error?: string;
  file: TextFile | null;
  editText: TextFile['text'];
}

const initialState: EditFileReducerState = {
  isLoading: false,
  isError: false,
  file: null,
  editText: ''
}

const editFileSlice = createSlice<EditFileReducerState>({
  name: 'editFile',
  initialState: initialState,
  reducers: {
    changeText(state: EditFileReducerState, action: PayloadAction<string>) {
      state.editText = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getFile.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getFile.fulfilled, (state, action) => {
      state.isLoading = false;

      if (typeof action.payload === 'string') {
        state.isError = true;
        state.error = action.payload;
      } else {
        state.file = action.payload as TextFile;
        state.editText = action.payload?.text as string;
      }
    })
    builder.addCase(editFile.pending, (state,action) => {
      state.isLoading = true;
    })
    builder.addCase(editFile.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.isError = true;
        state.error = action.payload;
      }
    })
  }
})

export default editFileSlice;

export const { changeText } = editFileSlice.actions;
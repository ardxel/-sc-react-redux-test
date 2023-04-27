import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createNewFile, deleteFile, getAllFiles} from "./filesThunk";
import {TextFile} from "../models/TextFile";

interface FilesReducerState {
  isLoading: boolean;
  files: TextFile[];
  isError: boolean;
  error: string | null;
  filteredFiles: TextFile[] | null
}

const initialState: FilesReducerState = {
  isLoading: false,
  files: [],
  isError: false,
  error: null,
  filteredFiles: null,
}

const filesSlice = createSlice<FilesReducerState>({
  name: 'files',
  initialState: initialState,
  reducers: {
    searchFiles(state: FilesReducerState, action: PayloadAction<string>) {
      if (action.payload) {
        state.filteredFiles = state.files
            .filter(file => file.name
                .toLowerCase()
                .includes(action.payload.toLowerCase()));
      } else {
        state.filteredFiles = state.files;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllFiles.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getAllFiles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.files = action.payload;
      state.filteredFiles = action.payload;
    })

    builder.addCase(deleteFile.rejected, (state, action) => {
      state.isLoading = false;

      state.isError = true;
      state.error = action.payload as string;
    })

    builder.addCase(createNewFile.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(createNewFile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload === 'string') {
        state.isError = true;
        state.error = action.payload as string;
      } else {
        state.files.push(action.payload as TextFile);
        state.filteredFiles?.push(action.payload as TextFile);
      }
    })

    builder.addCase(deleteFile.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.isLoading = false;

      const newFiles = state.files.filter(file => file.name !== action.payload);

      state.files = newFiles;

      state.filteredFiles = newFiles;
    })
  }
})

export default filesSlice;

export const { searchFiles, deleteStateFile } = filesSlice.actions;


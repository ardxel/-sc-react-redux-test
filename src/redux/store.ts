import {combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import filesSlice from "./filesSlice";
import editFileSlice from "./editFileSlice";
import { AnyAction } from 'redux';

const rootReducer = combineReducers({
  files: filesSlice.reducer,
  editFile: editFileSlice.reducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
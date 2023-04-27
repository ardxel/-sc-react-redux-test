import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  RequestAllFiles,
  ResponseAllFiles,
  RequestFile,
  ResponseFile,
  ResponseEditFile,
  RequestEditFile,
  ResponseDeleteFile,
  RequestDeleteFile,
  RequestCreateNewFile,
  ResponseCreateNewFile
} from "./apiModels";
import {RootState, TypedDispatch} from "./store";

const useExtension = (str) => {
  if (str.includes('.txt')) {
    return str;
  } else {
    return str + '.txt';
  }
}

type BASE_URL = 'http://localhost:5000';

const BASE_URL: BASE_URL = 'http://localhost:5000' as const;

const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: RootState, dispatch: TypedDispatch<RootState> }>()

const _AppHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

export const getAllFiles = createAppAsyncThunk<ResponseAllFiles, RequestAllFiles>(
    'files/getAllFiles',
    async () => {
      const response = await fetch(`${BASE_URL}/allFiles`);
      const data = await response.json() as Promise<ResponseAllFiles>;

      if (!data) {
        return 'Is Empty';
      } else {
        return await data;
      }
    }
)

export const getFile = createAppAsyncThunk<ResponseFile, RequestFile>(
    'files/getFile',
    async (filename: RequestFile) => {
      const response = await fetch(`${BASE_URL}/getFile/${filename}`, {
        headers: _AppHeaders,
        method: 'get'
      });

      const data = await response.json();

      return await data;
    }
)

export const editFile = createAppAsyncThunk<ResponseEditFile, RequestEditFile>(
    'files/editFile',
    async ({name, text}) => {

      const response = await fetch(`${BASE_URL}/editFile`, {
        body: JSON.stringify({
          "name": name,
          "text": text
        }),
        method: 'post',
        mode: 'cors',
        headers: _AppHeaders
      })

      if (response.status !== 200) {
        return 'Server Error';
      }
    }
)

export const createNewFile = createAppAsyncThunk<ResponseCreateNewFile, RequestCreateNewFile>(
    'files/createFile',
    async (filename) => {

      const response = await fetch(`${BASE_URL}/createNewFile`, {
        body: JSON.stringify({
          "name": useExtension(filename)
        }),
        method: 'post',
        mode: 'cors',
        headers: _AppHeaders
      })

      const data = await response.json();

      if (response.status !== 200 && data.hasOwnProperty('message')) {
        return data.message;
      } else if (data.hasOwnProperty('name')) {
        return data;
      }
    }
)

export const deleteFile = createAppAsyncThunk<ResponseDeleteFile, RequestDeleteFile>(
    'files/deleteFile',
    async (filename) => {

      const response = await fetch(`${BASE_URL}/deleteFile`, {
        body: JSON.stringify({
          "filename": filename,
        }),
        method: 'post',
        mode: 'cors',
        headers: _AppHeaders
      })

      const data = await response.json();

      if (data.hasOwnProperty('filename')) {
        return await data.filename;
      }

      return 'Server Error';

    }
)
import {TextFile} from "../models/TextFile";

export type RequestAllFiles = void;

export type ResponseAllFiles = TextFile[];

export type RequestFile = string;

export type ResponseFile = TextFile | string | undefined;

export type RequestEditFile = {
  name: string,
  text: string
}

export type ResponseEditFile = string | void;

export type RequestDeleteFile = string;

export type ResponseDeleteFile = string | void;

export type RequestCreateNewFile = string;

export type ResponseCreateNewFile = {message: string} | void | TextFile;
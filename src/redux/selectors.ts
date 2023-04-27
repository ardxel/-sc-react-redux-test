import {useAppSelector} from "./reduxHooks";

export const useEditFileSelector = () => useAppSelector(state => state.editFile);

export const useAllFilesSelector = () => useAppSelector(state => state.files);
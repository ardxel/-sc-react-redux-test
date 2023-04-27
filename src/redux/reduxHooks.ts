import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState, TypedDispatch} from "./store";

export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
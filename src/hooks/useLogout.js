import { useDispatch } from "react-redux";
import { clearToken } from "../features/tokenSlice";
import { persistor } from "../app/store";

export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(clearToken());
    persistor.purge()
  };
};

import { useDispatch } from "react-redux";
import { clearToken } from "../features/tokenSlice";
import { persistor } from "../app/store";
import {useNavigate} from "react-router-dom";


export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return () => {
    dispatch(clearToken());
    persistor.purge().then(r => navigate("https://consultantajuridcaonline.com/login"))

  };
};

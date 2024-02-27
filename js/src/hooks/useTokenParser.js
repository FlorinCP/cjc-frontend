import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setToken } from "../features/tokenSlice";

const useTokenParser = () => {
  const dispatch = useDispatch();

  return (token) => {
    try {
      const decoded = jwtDecode(token);

      console.log(decoded);
      const userDetails = {
        role: decoded.role,
        email: decoded.sub,
      };

      dispatch(setToken({ token: token, ...userDetails }));
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  };
};

export default useTokenParser;

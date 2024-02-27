import useTokenParser from "./useTokenParser";
import {singin} from "../services/user_api";
import {useNavigate} from "react-router-dom";

const useLogin = () => {

    const parser = useTokenParser()
    const navigate = useNavigate();

    return async (userLoginData) => {
        try {
            console.log(userLoginData)
            const data = await singin(userLoginData)
            parser(data.token)

            navigate("/questions/status/waiting")
        } catch (error) {
            console.error("Error authenticating:", error);
        }
    };
};

export default useLogin;

import useTokenParser from "./useTokenParser";
import {singin, singup} from "../services/user_api";
import {useNavigate} from "react-router-dom";

const useRegister = () => {

    const parser = useTokenParser()
    const navigate = useNavigate();


    return async (userRegisterData) => {
        try {
            console.log(userRegisterData)
            const data = await singup(userRegisterData)
            parser(data.token)
            navigate("/questions/status/accepted")

        } catch (error) {
            console.error("Error authenticating:", error);
        }
    };
};

export default useRegister

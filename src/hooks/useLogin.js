import useTokenParser from "./useTokenParser";
import {singin} from "../services/user_api";

const useLogin = () => {

    const parser = useTokenParser()


    return async (userLoginData) => {
        try {
            console.log(userLoginData)
            const data = await singin(userLoginData)
            parser(data.token)
        } catch (error) {
            console.error("Error authenticating:", error);
        }
    };
};

export default useLogin;

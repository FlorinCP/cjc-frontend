import useTokenParser from "./useTokenParser";
import {registerWithToken} from "../services/user_api";

const useRegisterWithToken = () => {

    const parser = useTokenParser()


    return async (userRegisterData) => {
        try {
            console.log(userRegisterData)
            const data = await registerWithToken(userRegisterData)
            parser(data.token)
        } catch (error) {
            console.error("Error authenticating:", error);
        }
    };
};

export default useRegisterWithToken

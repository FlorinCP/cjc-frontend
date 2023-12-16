import useTokenParser from "./useTokenParser";
import {singin, singup} from "../services/user_api";

const useRegister = () => {

    const parser = useTokenParser()


    return async (userRegisterData) => {
        try {
            console.log(userRegisterData)
            const data = await singup(userRegisterData)
            parser(data.token)
        } catch (error) {
            console.error("Error authenticating:", error);
        }
    };
};

export default useRegister

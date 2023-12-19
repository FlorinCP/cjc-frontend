import style from "./Login.module.css";
import ConfirmPassword from "../../components/LoginRegister/ConfirmPassword";

function RegisterWithToken(){

    return (
        <div className={style.center}>
            <ConfirmPassword />
        </div>
    );
}

export default RegisterWithToken;

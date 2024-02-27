import style from "../../components/LoginRegister/ConfirmPassword.module.css";
import ConfirmPasswordBetterUI from "../../components/LoginRegister/ConfirmPasswordBetterUI";
import ConfirmPassword from "../../components/LoginRegister/ConfirmPassword";

function RegisterWithToken() {
  return (
    <div className={style.pagewrapper}>
      <div className={style.formPage}>
        <div className={style.formHeader}>
          <h1 className={style.title}>Bine ai venit!</h1>
          <h3 className={style.infoT}>consultantajuridicaonline.com</h3>
        </div>

        <ConfirmPassword/>
      </div>
    </div>
  );
}

export default RegisterWithToken;

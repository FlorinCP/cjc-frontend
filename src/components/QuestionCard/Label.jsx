import style from "./QuestionCard.module.css";
export default function Label({ label }) {
  function getLabelStyle(label) {
    switch (label) {
      case "ACCEPTED":
        return "label-accepted";
      case "REJECTED":
        return "label-rejected";
      default:
        return "label-pending";
    }
  }

  function translateLabel(label) {
    switch (label) {
      case "Actele autoritatilor publice":
        return "Actele autorităților publice";
      case "Contracte":
        return "Contracte";
      case "Faliment":
        return "Faliment";
      case "Procedura civila penala":
        return "Procedură civilă penală";
      case "Societati comerciale":
        return "Societăți comerciale";
      default:
        return "Neclasificat";
    }
  }

  return (
    <div className={style.label}>
      <span className="material-symbols-outlined">loyalty</span>
      {translateLabel(label)}
    </div>
  );
}

import style from "../ViewQuestions/ViewQuestions.module.css";
import Header from "../../Layouts/SideBar/Header";
import React, { useEffect, useState } from "react";
import PaymentLinkForm from "../../components/PaymentLinkForm/PaymentLinkForm";
import PaymentLinkCard from "../../components/PaymentLinkCard/PaymentLinkCard";
import { getAllSessions } from "../../services/stripe_api";

export default function GenerateLinks() {
  const [returnedLink, setReturnedLink] = useState({
    serviceName: "",
    servicePrice: "",
    currency: "",
    url: "",
    paid: false,
  });


  return (
    <div className={style.mainContainer}>
      <Header
        title={"Linkuri pentru cereri de plata"}
        subtitle={"Adaugare  link-uri cereri de plata."}
      />

      <div className={style.questionsWrapper}>
        <div className={style.addLinkWrapper}>
          <h2 className={style.cardTitle}>
            <span className="material-symbols-outlined">add_card</span>Generează
            link de plată
          </h2>
          <PaymentLinkForm sendPaymentLink={(link) => setReturnedLink(link)} />
        </div>

        {returnedLink.url !== "" && (
          <PaymentLinkCard returnedLink={returnedLink} />
        )}

      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import style from "./PaymentLinkCard.module.css";
import ActionButton from "../ActionButton/ActionButton";
import {useNavigate} from "react-router-dom";

export default function PaymentLinkCard({ returnedLink }) {
  function formatPrice(value) {
    return (value / 100).toFixed(2);
  }

  function formatDateString(dateString) {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return (
      // date.toLocaleDateString("ro-RO", options) +
      // " " +
      date.toLocaleTimeString("ro-RO", options)
    );
  }

  useEffect(() => {
    if (returnedLink) {
      console.log(returnedLink.paid);
    }
  }, [returnedLink]);

  function returnStatus() {
    if (returnedLink.paid) {
      return <p className={style.statusPaid}>Plătit</p>;
    } else {
      return <p className={style.statusNotPaid}>Neplătit</p>;
    }
  }

  const [copyText, setCopyText] = useState("Copiază");

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyText("Copiat!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Plata Servicii Consultanta Juridica", // Title of the content to be shared
          text: "", // Text to be shared
          url: returnedLink.url,
        });
        console.log("Content shared successfully");
      } catch (err) {
        console.error("Error sharing the content", err);
      }
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };

  const navigation = useNavigate();

  const handleReuse = () =>{
    navigation("/stripe/generate-payment-link", {state: {reuseLink: returnedLink}})
  }

  return (
    <div className={style.cardWrapper}>
      <p className={style}>Link de plată</p>

      <div className={style.cardHeader}>
        <div className={style.cardHeaderItem}>
          <p>Serviciul</p>
          <p className={style.elipsis}>{returnedLink.serviceName}</p>
        </div>

        <div className={style.cardHeaderItem}>
          <p>Prețul </p>
          <span className={style.flex}>
            <p>{formatPrice(returnedLink.servicePrice)}</p>
            <p>{returnedLink.currency.toUpperCase()}</p>
          </span>
        </div>
        <div className={style.cardHeaderItem}>
          <p>Data emiterii </p>
          <span className={style.flex}>
            <p>{formatDateString(returnedLink.createdAt)}</p>
          </span>
        </div>
        {returnedLink.paid && (
          <>
            <div className={style.cardHeaderItem}>
              <p>Data platii </p>
              <span className={style.flex}>
                <p>{formatDateString(returnedLink.updatedAt)}</p>
              </span>
            </div>

            <div className={style.cardHeaderItem}>
              <p>Plătitor </p>
              <span className={style.flex}>
                <p>{formatDateString(returnedLink.paidBy)}</p>
              </span>
            </div>
          </>
        )}
      </div>

      <div className={style.cardHeaderItem}>
        <p>Status</p>
        <p>{returnStatus(returnedLink.paid)}</p>
      </div>

      <a href={returnedLink.url} className={style.paymentLinkText}>
        {returnedLink.url}
      </a>
      <div className={style.buttons}>
        {
          returnedLink.paid ? (
              <div className={style.acctionBtnWrapper}>
                <ActionButton
                    text={"Copiază Modelul"}
                    backgroundColor={"#fff"}
                    color={"#1888ff"}
                    onClick={() => handleReuse()}
                >
                  <span className="material-symbols-outlined">move_group</span>
                </ActionButton>
              </div>
          ) : (
              <>
                <div className={style.acctionBtnWrapper}>
                  <ActionButton
                      text={copyText}
                      backgroundColor={"#fff"}
                      color={"rgb(183, 0, 255)"}
                      onClick={() => handleCopy(returnedLink.url)}
                  >
                    <span className="material-symbols-outlined">content_copy</span>
                  </ActionButton>
                </div>
                <div className={style.acctionBtnWrapper}>
                  <ActionButton
                      text={"Distribuie"}
                      backgroundColor={"#fff"}
                      color={"#1888ff"}
                      onClick={() => handleShare()}
                  >
                    <span className="material-symbols-outlined">share</span>
                  </ActionButton>
                </div>
              </>
          )
        }

      </div>
    </div>
  );
}

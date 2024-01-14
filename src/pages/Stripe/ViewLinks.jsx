import style from "../ViewQuestions/ViewQuestions.module.css";
import Header from "../../Layouts/SideBar/Header";
import PaymentLinkCard from "../../components/PaymentLinkCard/PaymentLinkCard";
import React, {useEffect, useState} from "react";
import {getAllSessions} from "../../services/stripe_api";
import PaymentLinkLong from "../../components/PaymentLinkCard/PaymentLinkLong";


export default function ViewLinks() {

    const [fetchedLinks, setFetchedLinks] = useState([]);

    async function fetchLinks() {
        return getAllSessions();
    }

    useEffect(() => {
        if (fetchedLinks.length === 0) {
            fetchLinks()
                .then((r) => setFetchedLinks(r))
                .catch(error => console.error("Error fetching sessions:", error));
        }
    }, []);

    return (
      <div className={style.mainContainer}>
        <Header
          title={"Linkuri emise"}
          subtitle={"Vizualizare link-uri cereri de plata."}
        />

        <div className={style.questionsWrapper}>
          {fetchedLinks.length > 0 && (
             <>
                 {fetchedLinks.map((link) => (
                     <PaymentLinkLong returnedLink={link} />
                 ))}
             </>
          )}
        </div>
      </div>
    );
}

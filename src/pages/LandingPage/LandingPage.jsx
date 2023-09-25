import React, { useEffect, useState } from "react";
import style from "./LandingPage.module.css";
import Footer from "../../components/Footer/Footer";
import LoginRegisterForm from "../../components/LoginRegisterForm/LoginRegisterForm";

function LandingPage(props) {

  const s1t1 = "In sectiunea de mai jos puteti adresa intrebari la care cu siguranta\n" +
      "            veti primi un raspuns si in functie de aria noastra de expertiza si\n" +
      "            de situatia dumneavoastra putem organiza o sedinta de consiliere."

  const s1t2 = "Odata ce ne adresati intrebarea vom anailiza situatia si revenii in\n" +
      "            cel mai scurt timp cu un raspuns , de acea va rugam ca pe langa\n" +
      "            adresa de mail sa introduceti si numarul dumneavoastra de telefon si\n" +
      "            sa incarcati cat mai multe documente ce ne pot fi de folos pentru a\n" +
      "            va putea ajuta !"

  const s3t1 = " In momentul in care intreabare dumneavoastra a primit un raspuns ,\n" +
      "            veti primi un email la adresa mentionata anterior unde veti primi\n" +
      "            mai multe detalii referitoare la modul in care puteti sa va faceti o\n" +
      "            programare."

  const s3t2 = "Programarea se realizeaza achitand contravaloarea acesteia in\n" +
      "            functie de timpul necesar recomnadat de noi, in cazul in care\n" +
      "            dumneavoastra doriti puteti selecta o perioada mai lunga de timp\n" +
      "            pentru o sedinta."

  return (
    <div className={style.wrapper}>
      <div className={style.presentationLayer}></div>

      <div className={style.messagesInfo}>
        <div className={style.inputContainer}>
          <p className={style.title}>Cum functioneaza platforma noastra ?</p>
          <h2 className={style.info}>
            {s1t1}
          </h2>
          <h2 className={style.info}>
            {s1t2}
          </h2>
        </div>
        <div className={style.imageContainer}>
          <img src="/how.svg" alt="" className={style.how} />
        </div>
      </div>

      <div id={style["messagesInfo2"]}>
        <div className={style.inputContainer}>
          <img src="/togheter.svg" alt="" />
        </div>
        <div id={style["rightContainer"]}>
          <p className={style.title}>
            Cum procedez dupa ce am primit un raspuns ?
          </p>
        </div>
      </div>

      <div id={style["messagesInfo3"]}>
        <div>
          <h2 className={style.info2}>
            {s3t1}
          </h2>
          <h2 className={style.info2}>
            {s3t2}
          </h2>
        </div>

        <img src="/calendar.svg" alt="" id={style["calendar"]} />
      </div>

        <div id={style["questions"]} >
            <div id={style["questionTitle"]}>
                <p className={style.title}>Formular intrebari</p>
            </div>

            <LoginRegisterForm/>


        </div>

      <Footer/>

    </div>
  );
}

export default LandingPage;

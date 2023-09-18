import React, { useState } from "react";
import style from "./LandingPage.module.css";

function LandingPage(props) {
  const [questionData, setQuestionData] = useState({
    email: "",
    phone: "",
    questionText: "",
  });

  const [nextPage, setNextPage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/cjc/api/v1/question/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionData),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data sent successfully:", responseData);
      } else {
        console.error("Error sending data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.presentationLayer}></div>

      <div className={style.messagesInfo}>
        <div className={style.inputContainer}>
          <p className={style.title}>Cum functioneaza platforma noastra ?</p>
          <h2 className={style.info}>
            In sectiunea de mai jos puteti adresa intrebari la care cu siguranta
            veti primi un raspuns si in functie de aria noastra de expertiza si
            de situatia dumneavoastra putem organiza o sedinta de consiliere.
          </h2>
          <h2 className={style.info}>
            Odata ce ne adresati intrebarea vom anailiza situatia si revenii in
            cel mai scurt timp cu un raspuns , de acea va rugam ca pe langa
            adresa de mail sa introduceti si numarul dumneavoastra de telefon si
            sa incarcati cat mai multe documente ce ne pot fi de folos pentru a
            va putea ajuta !
          </h2>
        </div>
        <div className={style.imageContainer}>
          <img src="/how.svg" alt="" className={style.how} />
        </div>
      </div>

      <div id={style["messagesInfo2"]}>
        <div className={style.inputContainer}>
          <img src="/togheter.svg" alt="" />

          {/*</textarea>*/}
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
            In momentul in care intreabare dumneavoastra a primit un raspuns ,
            veti primi un email la adresa mentionata anterior unde veti primi
            mai multe detalii referitoare la modul in care puteti sa va faceti o
            programare.
          </h2>

          <h2 className={style.info2}>
            Programarea se realizeaza achitand contravaloarea acesteia in
            functie de timpul necesar recomnadat de noi, in cazul in care
            dumneavoastra doriti puteti selecta o perioada mai lunga de timp
            pentru o sedinta.
          </h2>
        </div>

        <img src="/calendar.svg" alt="" id={style["calendar"]} />
      </div>

      <form id={style["questions"]} onSubmit={handleSubmit}>
        <div id={style["questionTitle"]}>
          <p className={style.title}>Formular intrebari</p>
        </div>

        {!nextPage && (
          <div className={style.formPage}>
            <div className={style.pageIndex}>
              <div id={style["line"]}></div>
              <div className={style.holly}>
                <button className={style.indexButton}>1</button>
                Fisiere si Descriere
              </div>
              <div className={style.holly}>
                <button className={style.indexButton}>2</button>
                Creeare Cont
              </div>
            </div>

            <h2>Textul intrebarii</h2>

            <textarea
              name="questionText"
              value={questionData.questionText}
              onChange={handleChange}
              className={style.enterQuestion}
              cols="20"
              rows="7"
            ></textarea>

            <button type="submit" className={style.actionBtn}>
              Urmatorul Pas
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}

        {nextPage && (
          <div className={style.formPage}>
            <div id={style["inputs"]}>
              <input
                type="text"
                name="phone"
                value={questionData.phone}
                onChange={handleChange}
                className={style.inputField}
                placeholder="Phone"
              />

              <input
                type="text"
                name="email"
                value={questionData.email}
                onChange={handleChange}
                className={style.inputField}
                placeholder="Email"
              />
            </div>

            <button type="submit" className={style.actionBtn}>
              Trimite intrebarea !
            </button>
          </div>
        )}
      </form>

      <div className={style.footer}>
        <img src="/whitelogo.png" alt="check-email" id={style["logo-img"]} />
        <p>2023</p>
      </div>
    </div>
  );
}

export default LandingPage;

import React, { useEffect, useRef, useState } from "react";
import style from "./LandingPage.module.css";
import Footer from "../../components/Footer/Footer";
import LoginRegisterQuestionForm from "../../components/LoginRegisterQuestionForm/LoginRegisterQuestionForm";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";

function LandingPage(props) {
  const questionComponent = useRef(null);
  const scrollToTopBtn = useRef(null);

  const scrollToElement = () => {
    if (questionComponent.current) {
      questionComponent.current.scrollIntoView({
        behavior: "smooth", // You can use 'auto' for instant scrolling
        block: "start", // 'start' will scroll to the top of the element
      });
    }
  };

    const [scrollY, setScrollY] = useState(0);



    useEffect(() => {

        const handleScroll = () =>{
            setScrollY(window.scrollY)

        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  const s1t1 =
    "In sectiunea de mai jos puteti adresa intrebari la care cu siguranta\n" +
    "            veti primi un raspuns si in functie de aria noastra de expertiza si\n" +
    "            de situatia dumneavoastra putem organiza o sedinta de consiliere.";

  const s1t2 =
    "Odata ce ne adresati intrebarea vom anailiza situatia si revenii in\n" +
    "            cel mai scurt timp cu un raspuns , de acea va rugam ca pe langa\n" +
    "            adresa de mail sa introduceti si numarul dumneavoastra de telefon si\n" +
    "            sa incarcati cat mai multe documente ce ne pot fi de folos pentru a\n" +
    "            va putea ajuta !";

  const s3t1 =
    " In momentul in care intreabare dumneavoastra a primit un raspuns ,\n" +
    "            veti primi un email la adresa mentionata anterior unde veti primi\n" +
    "            mai multe detalii referitoare la modul in care puteti sa va faceti o\n" +
    "            programare.";

  const s3t2 =
    "Programarea se realizeaza achitand contravaloarea acesteia in\n" +
    "            functie de timpul necesar recomnadat de noi, in cazul in care\n" +
    "            dumneavoastra doriti puteti selecta o perioada mai lunga de timp\n" +
    "            pentru o sedinta.";

  const images = [
    "/judge_set1.jpg",
    '/Lawyer.jpg',
    '/imobiliar.jpg',
    // Add more image URLs here
  ];

    return (
    <div className={style.wrapper}>

        <div
            className={scrollY > 350 ? style.scrollToTop : style.scrollToTopHidden}
            onClick={scrollToTop}
            ref={scrollToTopBtn}
        >
            <span className="material-symbols-outlined">expand_less</span>
        </div>

      <div className={style.infoPanel}>
        <h1 className={style.infoh1}>Consultanta juritica online</h1>
        <h2 className={style.infoh2}>cel mai inalt nivel de profesionalism</h2>
        <h3 className={style.infoh3}>
          peste 15 ani de experianta in domeniul juritic
        </h3>
        <button className={style.askQuestion} onClick={scrollToElement}>
          {" "}
          Adreseaza o intrebare !
        </button>
      </div>


      <ImageCarousel images={images} />

      <div className={style.messagesInfo}>
        <div className={style.inputContainer}>
          <p className={style.title}>Cum functioneaza platforma noastra ?</p>
          <h2 className={style.info}>{s1t1}</h2>
          <h2 className={style.info}>{s1t2}</h2>
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
          <h2 className={style.info2}>{s3t1}</h2>
          <h2 className={style.info2}>{s3t2}</h2>
        </div>

        <img src="/calendar.svg" alt="" id={style["calendar"]} />
      </div>

      <div id={style["questions"]}>
        <div id={style["questionTitle"]}>
          <p className={style.title} ref={questionComponent}>
            Formular intrebari
          </p>
        </div>

        <LoginRegisterQuestionForm />
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;

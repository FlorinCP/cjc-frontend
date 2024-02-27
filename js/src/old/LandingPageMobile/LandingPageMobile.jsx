import React, { useEffect, useRef, useState } from "react";
import style from "./LandingPageMobile.module.css"
import Footer from "../../Layouts/Footer/Footer";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import ResponsiveNavbar from "../../Layouts/ResponsiveNavbar/ResponsiveNavbar";
// import ImageCarousel from "../../components/OLDImageCarousel/ImageCarousel";
// import ResponsiveNavbar from "../../components/ResponsiveNavbar/ResponsiveNavbar";

function LandingPageMobile(props) {
  const scrollToTopBtn = useRef(null);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  return (
    <div className={style.wrapper}>
      <a href={`tel:0752919073`}
         aria-label="Call Us shortcut"
        className={scrollY > 200 ? style.scrollToTop : style.scrollToTopHidden}
        ref={scrollToTopBtn}
      >
        <i className="fa fa-phone" />
      </a>

      <section className={style.infoPanel}>
        <h1 className={style.header}>
          {" "}
          Consultanță Juridică <span className={style.highlight}>Online</span>
        </h1>
        <h2 className={style.motto}>
          Obțineți răspunsurile juridice de care aveți nevoie:
        </h2>
        <a href={`tel:0752919073`} className={style.callNow}>
          Sună acum
          <i className="fa fa-phone" />
        </a>
      </section>

      <ImageCarousel />

      <section className={style.contentBoxGray}>
        <h1 className={style.subheader}>
          Oferim servicii de consultanță într-o{" "}
          <span className={style.highlight}>gamă variată</span> de arii
          juridice, <br />
          punând la dispoziție expertiză de{" "}
          <span className={style.highlight}>înalt nivel</span> și răspunsuri
          prompte la
          <span className={style.highlight}> orice întrebare</span> legală.
        </h1>
      </section>

      <section className={style.contentBoxWhite}>
        <i className={style.quote}>
          "Ați fost acuzat pe nedrept sau simțiți că drepturile dvs. sunt
          încălcate? <br /> Echipa noastră vă poate apăra și ghida în acest
          parcurs dificil."
        </i>
        <h2 className={style.sectionTitle}> Drept Penal</h2>
        <ul className={style.list}>
          <li>Apărare în faza de urmărire penală</li>
          <li>Reprezentare în fața instanțelor judecătorești</li>
          <li>Contestatii și revizuiri</li>
        </ul>
      </section>

      <section className={style.contentBoxGray}>
        <i className={style.quote}>
          "V-ați confruntat vreodată cu un contract nerespectat sau un litigiu
          imobiliar neașteptat? Lăsați-ne să vă oferim claritate și soluții!"
        </i>
        <h2 className={style.sectionTitle}> Drept Civil</h2>
        <ul className={style.list}>
          <li>Reclamații și litigii contractuale</li>
          <li>Proprietate imobiliară</li>
          <li>Succesiuni și moșteniri</li>
          <li>Dreptul familiei (divorț, custodie, partaj)</li>
        </ul>
      </section>

      <section className={style.contentBoxWhite}>
        <i className={style.quote}>
          "V-ați confruntat vreodată cu un contract nerespectat sau un litigiu
          imobiliar neașteptat? Lăsați-ne să vă oferim claritate și soluții!"
        </i>
        <h2 className={style.sectionTitle}> Dreptul Muncii</h2>
        <ul className={style.list}>
          <li>Conflict de muncă și litigii</li>
          <li>Condiții de muncă</li>
          <li>Contracte de muncă și reziliere</li>
        </ul>
      </section>

      <section className={style.contentBoxGray}>
        <i className={style.quote}>
          "Intenționați să înființați o afacere sau să navigați în apele agitate
          ale contractelor comerciale? Lăsați-ne să vă conducem spre succes!"
        </i>
        <h2 className={style.sectionTitle}> Drept Comercial</h2>
        <ul className={style.list}>
          <li>Înființare, fuziune, divizare sau lichidare de societăți</li>
          <li>Contracte comerciale și litigii</li>
          <li>Dreptul concurenței.</li>
        </ul>
      </section>

      <section className={style.contentBoxWhite}>
        <i className={style.quote}>
          "Ideea sau creația dvs. merită protejată? Fie că este vorba de o marcă
          sau de un drept de autor, suntem aici pentru a vă asigura securitatea
          acesteia!"
        </i>
        <h2 className={style.sectionTitle}>
          {" "}
          Dreptul Proprietății Intelectuale
        </h2>
        <ul className={style.list}>
          <li>Înregistrarea mărcilor și patentelor</li>
          <li>
            Drepturi de autor și licențiere Litigii privind proprietatea
            intelectuală
          </li>
        </ul>
      </section>

      <section className={style.contentBoxGray}>
        <i className={style.quote}>
          "Simțiți că sunteți prins în labirintul birocrației sau aveți
          dificultăți cu obținerea unei licențe? Noi suntem ghidul dvs. prin
          complexitatea legilor administrative!"
        </i>
        <h2 className={style.sectionTitle}> Drept Administrativ</h2>
        <ul className={style.list}>
          <li>Contestații acte administrative</li>
          <li>Reprezentare în fața autorităților administrative</li>
          <li>Licențe și autorizații</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPageMobile;

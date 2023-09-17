import React from 'react';
import style from './LandingPage.module.css'


function LandingPage(props) {
    return (
        <div className={style.wrapper} >


            <div className={style.presentationLayer}>


            </div>


            <div className={style.messagesInfo}>

                <div className={style.inputContainer}>
                    <p className={style.title}>
                        Cum functioneaza platforma noastra ?
                    </p>
                    <h2 className={style.info}>
                        In sectiunea de mai jos puteti adresa intrebari la care cu siguranta veti primi un raspuns si in functie
                        de aria noastra de expertiza si de situatia dumneavoastra putem organiza o sedinta de consiliere.
                    </h2>
                    <h2 className={style.info}>
                        Odata ce ne adresati intrebarea vom anailiza situatia si revenii in cel mai scurt timp cu un raspuns , de acea
                        va rugam ca pe langa adresa de mail sa introduceti si numarul dumneavoastra de telefon si sa incarcati cat mai multe documente ce ne pot fi de folos pentru a va putea ajuta !
                    </h2>


                </div>
                <div className={style.imageContainer}>
                    <img src="/how.svg" alt="" className={style.how}/>
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

                <div >

                <h2 className={style.info2}>
                    In momentul in care intreabare dumneavoastra a primit un raspuns , veti primi un email la adresa mentionata anterior
                    unde veti primi mai multe detalii referitoare la modul in care puteti sa va faceti o programare.
                </h2>

                <h2 className={style.info2}>
                    Programarea se realizeaza achitand contravaloarea acesteia in functie de
                    timpul necesar recomnadat de noi, in cazul in care dumneavoastra doriti
                    puteti selecta o perioada mai lunga de timp pentru o sedinta.
                </h2>
                </div>


                <img src="/calendar.svg" alt=""  id={style["calendar"]}/>

            </div>



            <div id={style['questions']}  >
                <div id={style["questionTitle"]}>
                    <p className={style.title}>Formular intrebari</p>
                </div>

                <div id={style["inputs"]}>

                <input type="text"/>

                <input type="text"/>

                </div>

                <textarea name="" className={style.enterQuestion} cols="30" rows="10">

                </textarea>


            </div>



            <div className={style.footer}>

                <img src="/whitelogo.png" alt="check-email" id={style['logo-img']}/>
                <p>2023</p>
            </div>

        </div>
    );
}

export default LandingPage;
import React, { useEffect, useState } from "react";
import style from "./LandingPage.module.css";

function LandingPage(props) {
  const [questionData, setQuestionData] = useState({
    email: "",
    phone: "",
    questionText: "",
  });
  const [nextPage, setNextPage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  useEffect(() => {
    if (selectedFiles) {
      const obj = [];

      selectedFiles.forEach((file, index) => {
        let type = file.type;
        const indexOfSlash = type.indexOf("/");
        const finalType = type.substring(indexOfSlash + 1);

        const img = new Image();

        switch (finalType) {
          case "pdf":
            img.src = "/pdf-icon.svg";
            break;
          case "jpg":
          case "png":
          case "jpeg":
            img.src = "/img-icon.svg";
            break;
          case "doc":
            img.src = "/word-img.svg";
            break;
        }

        let name = file.name;
        const indexOfDot = name.indexOf(".");
        const finalName = name.substring(0, indexOfDot);

        let fileSize = file.size;
        const finalSize = fileSize / 1024 ** 2;

        obj.push({
          image: img,
          type: finalType,
          name: finalName,
          size: finalSize.toFixed(2),
        });
      });

      console.log(obj);
      setSelectedFilesObj(obj);
    }
  }, [selectedFiles]);

  const handleUpload = () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });

    console.log(formData);

    fetch("http://localhost:8080/cjc/api/v1/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the Spring Boot backend
        console.log(data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleUpload();

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

  function moveForward(e) {
    e.preventDefault();
    console.log("something");
    setNextPage((prevState) => !prevState);
  }

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

        <div className={style.formPage}>
          <div className={style.pageIndex}>
            <div id={nextPage ? style["line"] : style["lineDisabled"]}></div>
            <div className={style.holly}>
              <button className={style.indexButton}>1</button>
              Fisiere si Descriere
            </div>
            <div div className={nextPage ? style.holly : style.hollyDisabled}>
              <button className={style.indexButton}>2</button>
              Creeare Cont
            </div>
          </div>

          {!nextPage ? (
            <>
              <h2>Textul intrebarii</h2>

              <textarea
                name="questionText"
                value={questionData.questionText}
                onChange={handleChange}
                className={style.enterQuestion}
                cols="20"
                rows="7"
              ></textarea>

              <h2>Incarcarea Fisierelor</h2>
              <div className={style.fileUpload}>
                <div id={style["fileHeader"]}>
                  <label
                    htmlFor="file-upload"
                    className={style.customFileUpload}
                  >
                    <span className="material-symbols-outlined">
                      upload_file
                    </span>{" "}
                    <span>Alegeti fisierele</span>
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    multiple
                  />
                  {/*<button onClick={handleUpload}>Incarcati</button>*/}
                </div>

                <div id={style["uploadedFiles"]}>
                  {selectedFilesObj ? (
                    selectedFilesObj.map((file, index) => (
                      <div className={style.fileRepresentation} key={index}>
                        <img src={file.image.src} alt="" />
                        <p>{file.name}</p>
                        <h4>{file.size} MB</h4>

                        {/* fff util pt descarcare */}
                        {/*<a*/}
                        {/*  href={URL.createObjectURL(file)}*/}
                        {/*  download={file.name}*/}
                        {/*>*/}
                        {/*  Download*/}
                        {/*</a>*/}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <button className={style.actionBtn} onClick={moveForward}>
                Urmatorul Pas
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          ) : (
            <>
              <div id={style["inputs"]}>
                <div id={style["swichDiv"]}>
                  <p className={!isChecked ? style.choiceP : style.choiceD}>
                    Cont nou
                  </p>
                  <label className={style.switch}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    ></input>
                    <span className={`${style.slider} ${style.round}`}></span>
                  </label>
                  <p className={isChecked ? style.choiceP : style.choiceD}>
                    Autentificare
                  </p>
                </div>

                {isChecked ? (
                  <>
                    <h3>Email / Numar de telefon</h3>
                    <input
                      type="text"
                      name="email"
                      value={questionData.email}
                      onChange={handleChange}
                      className={style.inputField}
                    />

                    <h3>Parola</h3>
                    <input
                      type="password"
                      name="password"
                      value={questionData.password}
                      onChange={handleChange}
                      className={style.inputField}
                    />
                  </>
                ) : (
                  <>
                    <h3>Numar de telefon</h3>
                    <input
                      type="text"
                      name="phone"
                      value={questionData.phone}
                      onChange={handleChange}
                      className={style.inputField}
                    />

                    <h3>Email</h3>
                    <input
                      type="text"
                      name="email"
                      value={questionData.email}
                      onChange={handleChange}
                      className={style.inputField}
                    />

                    <h3>Parola</h3>
                    <input
                      type="password"
                      name="password"
                      value={questionData.password}
                      onChange={handleChange}
                      className={style.inputField}
                    />

                    <h3>Confirmare Parola</h3>
                    <input
                      type="password"
                      name="password"
                      value={questionData.confirmPassword}
                      onChange={handleChange}
                      className={style.inputField}
                    />
                  </>
                )}
              </div>

              <div className={style.buttons}>
                <button className={style.actionBtn2} onClick={moveForward}>
                  Inapoi
                </button>
                <button type="submit" className={style.actionBtn2}>
                  Trimite intrebarea !
                </button>
              </div>
            </>
          )}
        </div>
      </form>

      <div className={style.footer}>
        <img src="/whitelogo.png" alt="check-email" id={style["logo-img"]} />
        <p>2023</p>
      </div>
    </div>
  );
}

export default LandingPage;

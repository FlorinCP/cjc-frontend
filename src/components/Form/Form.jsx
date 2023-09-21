import React, { useEffect, useState } from "react";
import style from "./Form.module.css";
import {registerUser,loginUser} from "../../services/user_api";
import {sendQuestion,mapToObject} from "../../services/question_api";

function Form(props) {
  const [isLoggedOrRegistered, setIsLoggedOrRegistered] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [questionText,setQuestionText] = useState("")
  const [currentLoggedUser,setCurrentLoggedUser] = useState(null)

  const [userRegisterData, setUserRegisterData] = useState({
    nume: "",
    prenume: "",
    email: "",
    phone: "",
    password: "",
  });

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserRegisterData({ ...userRegisterData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const {name,value} = e.target;
    setUserLoginData({...userLoginData, [name] : value})
  }
  const handleQuestionChange = (event) => {
    setQuestionText(event.target.value);
  };

  // used for Register / Auth toggle
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  useEffect(() => {
    if (selectedFiles) {
      const obj = mapToObject(selectedFiles)
      console.log(obj);
      setSelectedFilesObj(obj);
    }
  }, [selectedFiles]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`questionFiles`, file);
    });
    formData.append('questionText', questionText)
    formData.append("user", currentLoggedUser)

    console.log(formData);

    await sendQuestion(formData)
  };

  async function registerUserFunction(e){
    e.preventDefault();
     const data = await registerUser(userRegisterData)
    if (data){setIsLoggedOrRegistered(true)}
    setCurrentLoggedUser(data.email)
    console.log(data)
  }

  async function loginUserFunction(e){
    e.preventDefault();
    console.log(userLoginData)
    const data = await loginUser(userLoginData)
    if (data){setIsLoggedOrRegistered(true)}
    setCurrentLoggedUser(data.email)
    console.log(data)
  }

  function moveForward(e) {
    e.preventDefault();
    setNextPage((prevState) => !prevState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();
  };

  return (
    <div>
      <form id={style["questions"]} onSubmit={handleSubmit}>
        <div id={style["questionTitle"]}>
          <p className={style.title}>Formular intrebari</p>
        </div>

        <div className={style.formPage}>



          <div className={style.pageIndex}>
            <div id={nextPage ? style["line"] : style["lineDisabled"]}></div>
            <div className={style.holly}>
              <button className={style.indexButton}>1</button>
              Creeare Cont
            </div>
            <div div className={nextPage ? style.holly : style.hollyDisabled}>
              <button className={style.indexButton}>2</button>
              Fisiere si Descriere
            </div>
          </div>



          {!nextPage ? (
              <>
                    <div id={style["inputs"]}>

                      <div id={isLoggedOrRegistered ? style["swichDivNone"] : style["swichDiv"]}>
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

                      {!isChecked ? (
                          <>

                            {/* Register  */}

                            {
                              !isLoggedOrRegistered ? (<>
                                <h3>Nume</h3>
                                <input
                                    type="text"
                                    name="nume"
                                    value={userRegisterData.nume}
                                    onChange={handleRegisterChange}
                                    className={style.inputField}
                                />
                                <h3>Prenume</h3>
                                <input
                                    type="text"
                                    name="prenume"
                                    value={userRegisterData.prenume}
                                    onChange={handleRegisterChange}
                                    className={style.inputField}
                                />
                                <h3>Numar de telefon</h3>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userRegisterData.phone}
                                    onChange={handleRegisterChange}
                                    className={style.inputField}
                                />

                                <h3>Email</h3>
                                <input
                                    type="text"
                                    name="email"
                                    value={userRegisterData.email}
                                    onChange={handleRegisterChange}
                                    className={style.inputField}
                                />

                                <h3>Parola</h3>
                                <input
                                    type="password"
                                    name="password"
                                    value={userRegisterData.password}
                                    onChange={handleRegisterChange}
                                    className={style.inputField}
                                />
                              </>) : (
                                  <div className={style.succesfullRegister}>
                                    <h2>INREGISTRARE REUSITA !</h2>
                                    <img src="/succes.svg" alt=""/>
                                  </div>
                              )
                            }

                          </>
                      ) : (
                          <>

                            {/* Login  */}

                            {
                              !isLoggedOrRegistered ? (
                                  <>
                                    <h3>Email</h3>
                                    <input
                                        type="text"
                                        name="email"
                                        value={userLoginData.email}
                                        onChange={handleLoginChange}
                                        className={style.inputField}
                                    />
                                    <h3>Parola</h3>
                                    <input
                                        type="password"
                                        name="password"
                                        value={userLoginData.password}
                                        onChange={handleLoginChange}
                                        className={style.inputField}
                                    />
                                  </>
                              ) : (
                                  <div className={style.succesfullRegister}>
                                    <h2>AUTENTIFICARE REUSITA !</h2>
                                    <img src="/succes.svg" alt=""/>
                                  </div>
                              )
                            }

                          </>
                      )}
                    </div>



                    <div className={style.buttons}>

                      {
                        isChecked ? ( <button
                            className={isLoggedOrRegistered ? style.loginRegisterBtnNone : style.loginRegisterBtn}
                            onClick={loginUserFunction}>Autentificare
                        </button>) : (
                            <button
                                className={isLoggedOrRegistered ? style.loginRegisterBtnNone : style.loginRegisterBtn}
                                onClick={registerUserFunction}>Inregistrare
                            </button>
                        )
                      }

                      <button
                          className={ isLoggedOrRegistered ? style.actionBtn : style.actionBtnNone}
                          onClick={moveForward}
                          // disabled={!isLoggedOrRegistered}
                      >
                        Urmatorul Pas
                        <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                      </button>

                    </div>
                  </>
          ) : (
              <>

                {/*  Adding Question Text and Question Files   */}

                <h2>Textul intrebarii</h2>

                <textarea
                    name="questionText"
                    value={questionText}
                    onChange={handleQuestionChange}
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
                    <button onClick={handleUpload}>Incarcati</button>
                  </div>

                  <div id={style["uploadedFiles"]}>
                    {selectedFilesObj ? (
                        selectedFilesObj.map((file, index) => (
                            <div className={style.fileRepresentation} key={index}>
                              <img src={file.image.src} alt="" />
                              <p>{file.name}</p>
                              <h4>{file.size} MB</h4>
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
          )}



        </div>
      </form>
    </div>
  );
}

export default Form;

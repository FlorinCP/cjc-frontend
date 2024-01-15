import style from "../Login/Login.module.css";
import React, { useEffect } from "react";
import CircularLoadingAnimation from "../../components/LoadingAnimations/CircularLoadingAnimation";
import { useLocation } from "react-router-dom";
import { updatedTransferAccept} from "../../services/user_api";
import useTokenParser from "../../hooks/useTokenParser";

export default function LandingPage() {
  const [response, setResponse] = React.useState(null);
  const parser = useTokenParser()

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("transferToken");

  async function authorizeTransfer(token) {
    const response = await updatedTransferAccept(token);
    parser(response.token)
    window.location.href = "/questions/status/accepted";
    if (response.error){
      setResponse(response.error);
    }
  }

  useEffect(() => {
    if (response && response.error){
      window.location.href = "http://localhost:3000/login";
    }
  }, [response]);

  useEffect(() => {
    authorizeTransfer(token);
  }, []);

  return (
    <div className={style.center}>
      {response ? (
        <p>{response}</p>
      ) : (
          <CircularLoadingAnimation color={"white"} />
      )}
    </div>
  );
}

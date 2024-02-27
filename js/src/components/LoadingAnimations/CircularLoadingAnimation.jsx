import style from "./LoadingAnimations.module.css"
import React from "react";

function CircularLoadingAnimation({height,borderWidth,color}){


    const styleLoader = {
        height: height || "100px",
        border: borderWidth || "10px solid" ,
        borderColor: `${color} transparent` || `#225098 transparent`
    }

    return(
        <div className={style.loader} style={styleLoader}></div>
    )
}

export default CircularLoadingAnimation;

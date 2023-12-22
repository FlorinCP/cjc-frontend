import style from "./MakeAppointment.module.css";
import React from "react";

function Cell({slot, index, sendSelectedSlot, isSelected}) {



    return (
        <div className={style.cell} onClick={() => sendSelectedSlot(slot)}>
            <p>{slot}</p>
        </div>
    )
}

export default Cell

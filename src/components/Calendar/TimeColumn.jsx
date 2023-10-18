import React, {useMemo} from 'react';
import style from "./Calendar.module.css";
import {useFillTime} from "../../hooks/useFillTime";

function TimeColumn(props) {

    const { timeList} = useFillTime();


    function fillTimeColumn() {
        return (
            <div>
                {timeList.map((value, index) => (
                    <div className={style.timeSlot} key={index}>
                        {value}
                    </div>
                ))}
            </div>
        );
    }

    const timeColumn = useMemo(() => {
        return fillTimeColumn();
    }, [timeList]);

    return (
        <div>{timeColumn}</div>
    );
}

export default TimeColumn;
import React from "react";

export default function Status({updatedStatus,question}){


    function getColor(status) {
        switch (status) {
        }
        if (status === "ACCEPTED") {
            return "#18c52f";
        } else if (status === "REJECTED") {
            return "rgb(238, 49, 88)";
        } else {
            return "black";
        }
    }
    function getICon(status) {
        if (status === "ACCEPTED") {
            return <span className="material-symbols-outlined">check</span>;
        } else if (status === "REJECTED") {
            return <span className="material-symbols-outlined">close</span>;
        } else {
            return <span className="material-symbols-outlined">hourglass_top</span>;
        }
    }

    return (
        <div
            style={{
                backgroundColor: getColor(updatedStatus ? updatedStatus : question.status),
                width:"fit-content",
                padding:"5px 10px",
                borderRadius:"15px",
                display:"flex",
                alignItems:"center",
                justifyContent:"flex-start",
                color:"white",
            }}
        >
            {getICon(updatedStatus ? updatedStatus : question.status)}
            <h4 style={{margin:"5px"}}>{updatedStatus ? updatedStatus : question.status}</h4>
        </div>
    );

}

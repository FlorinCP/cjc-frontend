import React, {useEffect, useRef, useState} from 'react';
import "./CodeInput.css"

function CodeInput({
                       sendDataToParent,
                       isDisabled ,
                       // sendMoreDataToParent
}) {

    const inputs = useRef()

    const [inputValue, setInputValue] = useState(null)

    useEffect(() => {
        if (inputValue && inputValue.length === 4){
            sendDataToParent(inputValue)
            // sendMoreDataToParent(inputValue)
        }
    }, [inputValue]);

    function triggerSmth(e) {
        const target = e.target;
        const val = target.value;

        if (isNaN(val)) {
            target.value = "0";
            return;
        }

        if (val !== "") {
            setInputValue(prevVal => prevVal ? prevVal + val : val)
            const next = target.nextElementSibling;
            if (next) {
                next.focus();
            }
        }
    }

    function triggerSmthElse(e) {
        const target = e.target;
        const key = e.key.toLowerCase();
        const val = target.value

        if (key === "backspace" || key === "delete") {
            target.value = "";
            setInputValue(prevVal => inputValue.slice(0, inputValue.length - 1))

            const prev = target.previousElementSibling;
            if (prev) {
                prev.focus();
            }
        }
    }

    return (
        <div className="i-container" >
            <div id="inputs" className={ isDisabled ? "inputs-disabled" : "inputs" } ref={inputs} onInput={triggerSmth} onKeyUp={triggerSmthElse} >
                <input className="input" type="text"
                       autoFocus={!isDisabled}
                       inputMode="numeric" maxLength="1"
                       disabled={isDisabled}
                />
                <input className="input" type="text"
                       inputMode="numeric" maxLength="1"
                       disabled={isDisabled}
                />
                <input className="input" type="text"
                       inputMode="numeric" maxLength="1"
                       disabled={isDisabled}
                />
                <input className="input" type="text"
                       inputMode="numeric" maxLength="1"
                       disabled={isDisabled}
                />
            </div>
        </div>
    );
}

export default CodeInput;
import style from "./CustomDropdown.module.css";
import {useEffect, useRef, useState} from "react";

function CustomDropdown({ options, placeholder ,value ,sendSelectedOption}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(prevState => !prevState);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    sendSelectedOption(option);
  };

  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});


  // useEffect(() => {
  //   if (isOpen && dropdownRef.current) {
  //     const { top ,bottom, height } = dropdownRef.current.getBoundingClientRect();
  //     console.log(top ,bottom, height, window.innerHeight)
  //     if (bottom < window.innerHeight) {
  //       setDropdownStyle({ top: "100%" ,bottom: "auto"});
  //     } else {
  //       setDropdownStyle({});
  //     }
  //   }
  // }, [isOpen]);


  return (
    <div className={style.select}>
      <div className={style.trigger} onClick={toggleDropdown}>
        { value ? options.find((option) => option.value === value).label :  (selectedOption ? selectedOption.label : placeholder)} &nbsp;
        <span className="material-symbols-outlined">expand_more</span>
      </div>
      {isOpen && (
        <div className={style.options} ref={dropdownRef}>
          {options.map((option) => (
            <div
              key={option.value}
              className={style.option}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;

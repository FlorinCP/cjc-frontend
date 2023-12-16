import React, { useState } from 'react';
import { MenuItems } from '../../components/Miscellaneous/MenuItems';
import style from './Dropdown.module.css'
import { Link } from 'react-router-dom';

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? style.dropdownMenuClicked : style.dropdownMenu}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={style.dropdownLink}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;

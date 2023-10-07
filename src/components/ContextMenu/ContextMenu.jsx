import React, {useEffect, useState} from 'react';
import style from './ContextMenu.module.css'

function ContextMenu({ menuItems, clickedMenu }) {

    const [position, setPosition] = useState({
        top: 0,
        left :0
    });

    useEffect(() => {
        const registerRightClick = (e) => {
            e.preventDefault();
            setPosition({ top: e.clientY, left: e.clientX });
        };
        const clickAnywhere = () => {
            setPosition(undefined);
        };
        document.addEventListener("contextmenu", registerRightClick);
        document.addEventListener("click", clickAnywhere);
        return () => {
            document.removeEventListener("contextmenu", registerRightClick);
            document.removeEventListener("click", clickAnywhere);
        };
    }, []);

    return (
        <>
            {position && (
                <ul
                    className={style.contentMenu}
                    style={{
                        left: `${position.left}px`,
                        top: `${position.top}px`
                    }}
                >
                    {menuItems.map((menuItem) => {
                        return (
                            <li onClick={() => clickedMenu(menuItem)} key={menuItem}>
                                {menuItem}
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}

export default ContextMenu;
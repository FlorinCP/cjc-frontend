import style from "./ContextMenu.module.css";
import React from "react";

/**
 * context menu functional component
 *
 * @param items
 * @param top
 * @param left
 * @return {Element}
 * @constructor
 */
function ContextMenu({ items, top, left }) {
    return (
        <div
            style={{
                position: "absolute",
                top: `${top}px`,
                left: `${left}px`,
            }}
            className={style.contextMenu}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={item.onClick}
                    className={style.contextMenuItem}
                >
                    {item.icon && <span className="material-symbols-outlined">{item.icon}</span>}
                    {item.label}
                </div>
            ))}
        </div>
    );
}

export default ContextMenu;

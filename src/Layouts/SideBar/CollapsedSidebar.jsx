import style from "./SideBar.module.css";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setSidebarStatus} from "../../features/sidebarSlice";

function CollapsedSidebar(){

    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    function changeSidebarState(){
        setIsExpanded(prevState => !prevState);
    }

    useEffect(() => {
        dispatch(setSidebarStatus(isExpanded));
    }, [isExpanded]);

    return(
        <div className={style.collapedSidebar}>
            <div className={style.hamburger}
                 onClick={() => {
                     changeSidebarState();
                 }}
            >
                <span className="material-symbols-outlined">menu</span>
            </div>
        </div>
    )
}

export default CollapsedSidebar;

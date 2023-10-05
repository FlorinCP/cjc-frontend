import React, {useEffect, useState} from 'react';
import SideBar from "../../components/SideBar/SideBar";
import style from './SideBarLayout.module.css'
import {useHistory, useLocation} from "react-router-dom";
function SideBarLayout({ children }) {

    const location = useLocation();
    const history = useHistory();
    const [currentUrl,setCurrentUrl] = useState(location.pathname)

    useEffect(() => {
        const unlisten = history.listen((location) => {
            const currentUrl = location.pathname;
            setCurrentUrl(currentUrl)
        });

        return () => {
            unlisten();
        };
    }, [history]);

  return <div className={style.wrapper}>
      <SideBar currentUrl={currentUrl}/>
      <div>
          {children}
      </div>
  </div>;
}

export default SideBarLayout;
// import React, {useContext} from "react";
// import "./mobileVideoPlayer.css";
// import {SocketContext} from "../SocketContext";
//
// const MobileVideoPlayer = ({children}) => {
//     const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} =
//         useContext(SocketContext);
//
//     return (
//         <div id="wrapper-m">
//
//             {children}
//             <div id="layout-m">
//
//                 <div id="remote-video-m">
//                     <video playsInline ref={userVideo} autoPlay/>
//                     <div className="user-info-m">
//                         <p>{call.name || "Name"}</p>
//                     </div>
//                 </div>
//
//
//
//
//                     <video id="own-video-m" playsInline muted ref={myVideo} autoPlay/>
//                     <div id="own-info-m">
//                         <p>{name || "Name"}</p>
//                     </div>
//
//
//             </div>
//         </div>
//     );
// };
//
// export default MobileVideoPlayer;

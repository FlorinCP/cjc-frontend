// import React, { useContext } from "react";
// import "./webComponents.css";
// import { SocketContext } from "../SocketContext";
//
// const VideoPlayer = ({children}) => {
//   const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
//     useContext(SocketContext);
//
//   return (
//     <div className="layout">
//       {callAccepted && !callEnded && (
//         <div id="remote-video">
//           <video playsInline ref={userVideo} autoPlay />
//           <div className="user-info">
//             <p>{call.name || "Name"}</p>
//           </div>
//         </div>
//       )}
//
//       <div id="call-info">
//         <div id="own-video">
//           <video playsInline muted ref={myVideo} autoPlay />
//           <div className="user-info">
//             <p>{name || "Name"}</p>
//           </div>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };
//
// export default VideoPlayer;

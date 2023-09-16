// import React, { useContext, useState } from "react";
// import "./webComponents.css";
// import { SocketContext } from "../SocketContext";
//
// const Options = ({ children }) => {
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
//     useContext(SocketContext);
//   const [idToCall, setIdToCall] = useState("");
//
//   return (
//     <div>
//       <div className="options-wrapper">
//
//         <div className="options-container">
//           <p>Account Info</p>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name"
//           />
//           <label htmlFor="my-id">Your own id</label>
//           <input type="text" value={me} id="my-id" readOnly/>
//         </div>
//
//         <div className="options-container">
//           <p>Make a Call</p>
//           <input
//             type="text"
//             value={idToCall}
//             onChange={(e) => setIdToCall(e.target.value)}
//             placeholder="ID to call"
//           />
//
//           {callAccepted && !callEnded ? (
//             <button onClick={leaveCall}>Hang up</button>
//           ) : (
//             <button onClick={() => callUser(idToCall)}>Call</button>
//           )}
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };
//
// export default Options;

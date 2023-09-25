// import { useState, useRef } from "react";
// import SockJS from "sockjs-client";
// import { Stomp } from "@stomp/stompjs";
// import "./WebVideoCall.css";
//
// const NewVideo = ({ children }) => {
//     const localVideo = useRef();
//     const remoteVideo = useRef();
//     const localIdInp = useRef();
//     const remoteIdInp = useRef();
//
//     const [showVideo,setShowVideo] = useState(false)
//
//     let localStream;
//     let remoteStream;
//     let localPeer;
//     let remoteID;
//     let localID;
//     let stompClient;
//
// // ICE Server Configurations
// const iceServers = {
//     iceServer: {
//       urls: "stun:stun.l.google.com:19302",
//     },
//     };
//
//     localPeer = new RTCPeerConnection(iceServers);
//
//   const constrains = {
//     audio: true,
//     video: {
//       width: { min: 640, ideal: 1280, max: 1920 },
//       height: { min: 400, ideal: 720, max: 1080 },
//       cursor: "always" | "motion" | "never",
//       displaySurface: "application" | "browser" | "monitor" | "window",
//       frameRate: { min: 15, ideal: 30, max: 60 },
//     },
//     };
//
//
//
//   navigator.mediaDevices
//   .getUserMedia(constrains)
//   .then((stream) => {
//     localStream = stream;
//
//     //   console.log(stream.getTracks()[0])
//     //   console.log(stream.getTracks()[1])
//     //   console.log(localStream.getTracks()[0])
//     //   console.log(localStream.getTracks()[1])
//     console.log(
//       "constrains",
//       navigator.mediaDevices.getSupportedConstraints()
//     );
//     localVideo.current.srcObject = stream;
//     // access granted, stream is the webcam stream
//   })
//   .catch((error) => {
//     // access denied or error occurred
//     console.log(error);
//   });
//
//
//   function connect() {
//     // Connect to Websocket Server
//     var socket = new SockJS(
//       "https://spring-boot-server-web-rtc.lm.r.appspot.com/websocket",
//       {
//         debug: false,
//       }
//     );
//     stompClient = Stomp.over(socket);
//     localID = localIdInp.current.value;
//     console.log("My ID: " + localID);
//     stompClient.connect({}, (frame) => {
//       console.log(frame);
//
//       // Subscribe to testing URL not very important
//       stompClient.subscribe("/topic/testServer", function (test) {
//         console.log("Received: " + test.body);
//       });
//
//       stompClient.subscribe(
//         "/user/" + localIdInp.current.value + "/topic/call",
//         (call) => {
//           console.log("Call From: " + call.body);
//           remoteID = call.body;
//           console.log("Remote ID: " + call.body);
//
//           localPeer.ontrack = (event) => {
//             // Setting Remote stream in remote video element
//             remoteVideo.current.srcObject = event.streams[0];
//           };
//
//           localPeer.onicecandidate = (event) => {
//             if (event.candidate) {
//               var candidate = {
//                 type: "candidate",
//                 lable: event.candidate.sdpMLineIndex,
//                 id: event.candidate.candidate,
//               };
//               console.log("Sending Candidate");
//               console.log(candidate);
//               stompClient.send(
//                 "/app/candidate",
//                 {},
//                 JSON.stringify({
//                   toUser: call.body,
//                   fromUser: localID,
//                   candidate: candidate,
//                 })
//               );
//             }
//           };
//
//           // Adding Audio and Video Local Peer
//           localStream.getTracks().forEach((track) => {
//             localPeer.addTrack(track, localStream);
//           });
//
//           localPeer.createOffer().then((description) => {
//             localPeer.setLocalDescription(description);
//             console.log("Setting Description" + description);
//             stompClient.send(
//               "/app/offer",
//               {},
//               JSON.stringify({
//                 toUser: call.body,
//                 fromUser: localID,
//                 offer: description,
//               })
//             );
//           });
//         }
//       );
//
//       stompClient.subscribe(
//         "/user/" + localIdInp.current.value + "/topic/offer",
//         (offer) => {
//           console.log("Offer came");
//           var o = JSON.parse(offer.body)["offer"];
//           console.log(offer.body);
//           console.log(new RTCSessionDescription(o));
//           console.log(typeof new RTCSessionDescription(o));
//
//           localPeer.ontrack = (event) => {
//               remoteStream = event.streams[0];
//               setShowVideo(prevVal => !prevVal)
//             remoteVideo.current.srcObject = remoteStream;
//           };
//           localPeer.onicecandidate = (event) => {
//             if (event.candidate) {
//               var candidate = {
//                 type: "candidate",
//                 lable: event.candidate.sdpMLineIndex,
//                 id: event.candidate.candidate,
//               };
//               console.log("Sending Candidate");
//               console.log(candidate);
//               stompClient.send(
//                 "/app/candidate",
//                 {},
//                 JSON.stringify({
//                   toUser: remoteID,
//                   fromUser: localID,
//                   candidate: candidate,
//                 })
//               );
//             }
//           };
//
//           // Adding Audio and Video Local Peer
//           localStream.getTracks().forEach((track) => {
//             localPeer.addTrack(track, localStream);
//           });
//
//           localPeer.setRemoteDescription(new RTCSessionDescription(o));
//           localPeer.createAnswer().then((description) => {
//             localPeer.setLocalDescription(description);
//             console.log("Setting Local Description");
//             console.log(description);
//             stompClient.send(
//               "/app/answer",
//               {},
//               JSON.stringify({
//                 toUser: remoteID,
//                 fromUser: localID,
//                 answer: description,
//               })
//             );
//           });
//         }
//       );
//
//       stompClient.subscribe(
//         "/user/" + localIdInp.current.value + "/topic/answer",
//         (answer) => {
//           console.log("Answer Came");
//           var o = JSON.parse(answer.body)["answer"];
//           console.log(o);
//           localPeer.setRemoteDescription(new RTCSessionDescription(o));
//         }
//       );
//
//       stompClient.subscribe(
//         "/user/" + localIdInp.current.value + "/topic/candidate",
//         (answer) => {
//           console.log("Candidate Came");
//           var o = JSON.parse(answer.body)["candidate"];
//           console.log(o);
//           console.log(o["lable"]);
//           console.log(o["id"]);
//           var iceCandidate = new RTCIceCandidate({
//             sdpMLineIndex: o["lable"],
//             candidate: o["id"],
//           });
//           localPeer.addIceCandidate(iceCandidate);
//         }
//       );
//
//       stompClient.send("/app/addUser", {}, localIdInp.current.value);
//     });
//   }
//
//
//   function call() {
//     remoteID = remoteIdInp.current.value;
//     stompClient.send(
//       "/app/call",
//       {},
//       JSON.stringify({
//         callTo: remoteIdInp.current.value,
//         callFrom: localIdInp.current.value,
//       })
//     );
//   }
//
//   function test() {
//     stompClient.send("/app/testServer", {}, "Test Server");
//   }
//
//   return (
//     <div id="wrapper">
//       <h1 id="title">WebRTC Test</h1>
//
//       <div id="video-component">
//         <div id="videos">
//           <div id="localVideoContainer">
//             <video
//               id="localVideo"
//               playsInline
//               ref={localVideo}
//               autoPlay
//               muted
//             ></video>
//           </div>
//           <div id="remoteVideoContainer">
//             <video
//               id="remoteVideo"
//               playsInline
//               ref={remoteVideo}
//               autoPlay
//             ></video>
//           </div>
//         </div>
//
//         <div id="controls">
//           <div className="controls-input">
//             <input
//               type="text"
//               name="localId"
//               id="localId"
//               placeholder="Enter Your ID"
//               ref={localIdInp}
//             ></input>
//             <button id="connectBtn" onClick={connect}>
//               Connect
//             </button>
//           </div>
//
//           <div className="controls-input">
//             <input
//               type="text"
//               name="remoteId"
//               id="remoteId"
//               placeholder="Enter Remote ID"
//               ref={remoteIdInp}
//             ></input>
//             <button id="callBtn" onClick={call}>
//               call
//             </button>
//           </div>
//           <div className="controls-input">
//             <button id="testConnection" onClick={test}>
//               Test Connection
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default NewVideo;

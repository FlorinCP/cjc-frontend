import React from 'react';
import {useState, useRef, useEffect} from "react";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import "./WebVideoCall.css";


function WebVideoCall(props) {

    const localVideo = useRef();
    const remoteVideo = useRef();
    const localIdInp = useRef();
    const remoteIdInp = useRef();
    const remotePlaceholder = useRef(null)

    const [latency, setLatency] = useState(null)
    const [showVideo, setShowVideo] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [showCamera, setShowCamera] = useState(true)
    const [muteMic, setMuteMic] = useState(false)
    const [isCallOn, setCallOn] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [persistentStompClient, setPersistentStompClient] = useState(null)
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null)
    const [localAspectRatio, setLocalAspectRatio] = useState(16 / 9)
    const [remoteAspectRatio, setRemoteAspectRatio] = useState(16 / 9)
    const [isCallClosed, setIsCallClosed] = useState(false)
    const [minutes, setMinutes] = useState(null)

    let localPeer;
    let remoteID;


    const [time, setTime] = useState(null)
    const intervalRef = useRef(null)
    const increaseTime = () => setTime(prevState => prevState + 1)


    // de adaugat un if care verifica daca userul a apasat sa inchida sau nu
    // daca el a vrut sa se inchida sa se inchida intro parte un stream si in alta alt stream
    useEffect(() => {
        if (isCallClosed) {
            console.log("se inchide")
            // localStream.getTracks().forEach(track => track.stop())
            if (remoteStream) {
                remoteStream.getTracks().forEach(track => track.stop())
            }
            console.log(remoteStream)
            // setLocalStream(null)
            persistentStompClient.disconnect();
            localPeer.close()
            localPeer = null
            setRemoteStream(null)
            // window.location.reload()
        }
    }, [isCallClosed]);


    useEffect(() => {
        if (isCallOn) {
            intervalRef.current = setInterval(increaseTime, 1000)
            // console.log(intervalRef.current)
            if (time > 59) {
                setTime(0)
                setMinutes(prevVal => prevVal + 1)
            }
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [time, isCallOn]);


    function setAspectRatio(localStreamHeight, localStreamWidth) {
        if (localStreamWidth / localStreamHeight > 1.5) {
            setLocalAspectRatio(16 / 9)
        } else {
            setLocalAspectRatio(4 / 3)
        }
    }


    function toggleVideo() {
        setShowVideo(prevState => !prevState)
    }

    function toggleSound() {
        setIsMuted(prevState => !prevState)
        remoteVideo.current.muted = !remoteVideo.current.muted;
    }

    function toggleCamera() {
        setShowCamera(prevState => !prevState)
        localStream.getTracks()[1].enabled = !(localStream.getTracks()[1].enabled)
    }

    function toggleMic() {
        setMuteMic(prevState => !prevState)
        localStream.getAudioTracks()[0].enabled = !(localStream.getAudioTracks()[0].enabled)
        console.log(localStream.getAudioTracks())

    }

    const iceServers = {
        iceServer: {
            urls: "stun:stun.l.google.com:19302",
        },
    };
    localPeer = new RTCPeerConnection(iceServers);

    const constrains = {
        audio: true, video: {
            width: {ideal: 1280, max: 1920},
            height: {ideal: 720, max: 1080},
            cursor: "always" | "motion" | "never",
            displaySurface: "application" | "browser" | "monitor" | "window",
            frameRate: {min: 15, ideal: 30, max: 60},
        },
    };

    // useEffect for allowing webcam permissions
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia(constrains)
            .then((stream) => {

                setAspectRatio(stream.getVideoTracks()[0].getSettings().height, stream.getVideoTracks()[0].getSettings().width)
                setLocalStream(stream)

                console.log("constrains", navigator.mediaDevices.getSupportedConstraints());

            })
            .catch((error) => {
                // access denied or error occurred
                console.log(error);
            });
    }, []);


    useEffect(() => {
        localVideo.current.srcObject = localStream;
    }, [localStream]);

    useEffect(() => {
        console.log("e bai")
        if (remoteStream) {
            remoteVideo.current.srcObject = remoteStream;
            console.log("remote stream settings ", remoteStream.getVideoTracks()[0])
        }
    }, [remoteStream]);


    function openConnection() {
        let socket = new SockJS("https://spring-boot-server-web-rtc.lm.r.appspot.com/websocket", {
            debug: false,
        });
        let client = Stomp.over(socket);

        client.connect({}, () => {
            setPersistentStompClient(client)
            setIsConnected(true)
        })
    }

    useEffect(() => {
        console.log(isConnected)
    }, [isConnected]);

    useEffect(() => {

        // this should only work when localId exists
        if (persistentStompClient) {

            persistentStompClient.subscribe("/topic/testServer", function (test) {
                console.log("Received: " + test.body);
                // setIsConnected(test.body)
            });

            persistentStompClient.subscribe("/topic/closeCall", function (test) {
                console.log("is Call closed ? : " + test.body);
                setIsCallClosed(test.body)
            });

            persistentStompClient.subscribe("/user/" + localIdInp.current.value + "/topic/call", (call) => {
                console.log("Sunt sunat de ", call.body)

                // console.log("Call From: " + call.body);
                // console.log("Remote ID: " + call.body);

                remoteID = call.body;
                console.log(" REMOTE ID ", remoteID)
                console.log("OWN ID ", localIdInp.current.value)


                localPeer.ontrack = (event) => {
                    // Setting Remote stream in remote video element
                    remoteVideo.current.srcObject = event.streams[0];
                };

                localPeer.onicecandidate = (event) => {
                    if (event.candidate) {
                        var candidate = {
                            type: "candidate", lable: event.candidate.sdpMLineIndex, id: event.candidate.candidate,
                        };
                        // console.log("Sending Candidate");
                        // console.log(candidate);


                        console.log("aici e primul toUser", call.body, "  fromUser " , localIdInp.current.value)


                        persistentStompClient.send("/app/candidate", {}, JSON.stringify({
                            toUser: call.body, fromUser: localIdInp.current.value, candidate: candidate,
                        }));
                    }
                };

                // Adding Audio and Video Local Peer
                localStream.getTracks().forEach((track) => {
                    localPeer.addTrack(track, localStream);
                });

                localPeer.createOffer().then((description) => {
                    localPeer.setLocalDescription(description);
                    // console.log("Setting Description" + description);

                    console.log("aici e AL DOILEA toUser", call.body , " fromUser " ,localIdInp.current.value)

                    persistentStompClient.send("/app/offer", {}, JSON.stringify({
                        toUser: call.body, fromUser: localIdInp.current.value, offer: description,
                    }));
                });


            });

            persistentStompClient.subscribe("/user/" + localIdInp.current.value + "/topic/offer", (offer) => {
                console.log("Am OFerit")
                // setShowVideo(prevState => !prevState)
                // console.log("Offer came");
                var o = JSON.parse(offer.body)["offer"];
                // console.log(offer.body);
                // console.log(new RTCSessionDescription(o));
                // console.log(typeof new RTCSessionDescription(o));

                localPeer.ontrack = (event) => {
                    setRemoteStream(event.streams[0])
                    // setShowVideo(prevVal => !prevVal)
                };

                localPeer.onicecandidate = (event) => {
                    if (event.candidate) {
                        var candidate = {
                            type: "candidate", lable: event.candidate.sdpMLineIndex, id: event.candidate.candidate,
                        };
                        // console.log("Sending Candidate");
                        // console.log(candidate);


                        console.log(" al 3 lea toUser ",remoteID , " from USer " , localIdInp.current.value)
                        persistentStompClient.send("/app/candidate", {}, JSON.stringify({
                            toUser: remoteID, fromUser: localIdInp.current.value, candidate: candidate,
                        }));
                    }
                };

                // Adding Audio and Video Local Peer
                localStream.getTracks().forEach((track) => {
                    localPeer.addTrack(track, localStream);
                });

                localPeer.setRemoteDescription(new RTCSessionDescription(o));
                localPeer.createAnswer().then((description) => {
                    localPeer.setLocalDescription(description);
                    // console.log("Setting Local Description");
                    // console.log(description);


                    console.log(" al 4 lea toUSer " , remoteID , " from User ", localIdInp.current.value)
                    persistentStompClient.send("/app/answer", {}, JSON.stringify({
                        toUser: remoteID, fromUser: localIdInp.current.value, answer: description,
                    }));
                });
                setCallOn(true)
            });

            persistentStompClient.subscribe("/user/" + localIdInp.current.value + "/topic/answer", (answer) => {
                console.log("am primit / answear")
                // setShowVideo(prevState => !prevState)
                // console.log("Answer Came");
                let o = JSON.parse(answer.body)["answer"];
                // console.log(o);
                localPeer.setRemoteDescription(new RTCSessionDescription(o));
                setCallOn(true)
            });

            persistentStompClient.subscribe("/user/" + localIdInp.current.value + "/topic/candidate", (answer) => {
                console.log("candidate , cplm e asta")
                // setShowVideo(prevState => !prevState)
                // console.log("Candidate Came");
                let o = JSON.parse(answer.body)["candidate"];
                // console.log(o);
                // console.log(o["lable"]);
                // console.log(o["id"]);
                let iceCandidate = new RTCIceCandidate({
                    sdpMLineIndex: o["lable"], candidate: o["id"],
                });
                localPeer.addIceCandidate(iceCandidate);
            });

            //  (void) send(destination, headers = {}, body = '')
            persistentStompClient.send("/app/addUser", {}, localIdInp.current.value);

        }

    }, [persistentStompClient]);


    function newTest() {
        let start = Date.now();
        persistentStompClient.send("/app/testServer", {}, true);
        let delta = Date.now() - start;
        console.log("latency", delta)
        setLatency(delta)
    }

    function closeCall() {
        persistentStompClient.send("/app/closeCall", {}, true);
    }

    function call() {
        remoteID = remoteIdInp.current.value;
        setShowVideo(prevState => !prevState)
        persistentStompClient.send("/app/call", {}, JSON.stringify({
            callTo: remoteIdInp.current.value, callFrom: localIdInp.current.value,
        }));
    }

    function answerCall() {
        setCallOn(true)
    }


    return (
        <div id="wrapper">
            <div id="video-component">
                <div id="videos">
                    {/*<div id="localVideoContainer">*/}
                    {/*    <video*/}
                    {/*        id="localVideo"*/}
                    {/*        playsInline*/}
                    {/*        ref={localVideo}*/}
                    {/*        autoPlay*/}
                    {/*        muted*/}
                    {/*    ></video>*/}

                    {/*</div>*/}
                    <div id="remoteVideoContainer">
                        <video
                            style={{boxShadow: showVideo ? '' : "none"}}
                            id="remoteVideo"
                            playsInline
                            ref={remoteVideo}
                            autoPlay
                        ></video>

                        {/*{*/}
                        {/*    showVideo ? (*/}
                        {/*        <video*/}
                        {/*            style={{boxShadow: showVideo ? '' : "none"}}*/}
                        {/*            id="remoteVideo"*/}
                        {/*            playsInline*/}
                        {/*            ref={remoteVideo}*/}
                        {/*            autoPlay*/}
                        {/*        ></video>*/}

                        {/*    ) : (<div className="loader">*/}

                        {/*    </div>)*/}
                        {/*}*/}
                    </div>
                    <div className="video-controls">
                        <div id="mic-control" onClick={toggleMic}>
                            {
                                muteMic ? (
                                    <button className="control-button">
                                        <span className="material-symbols-outlined">mic_off</span>
                                    </button>
                                ) : (
                                    <button className="control-button">
                                        <span className="material-symbols-outlined">mic</span>
                                    </button>
                                )
                            }
                        </div>
                        <div id="video-control" onClick={toggleCamera}>

                            {showCamera ? (

                                <button className="control-button">
                                    <span className="material-symbols-outlined">videocam</span>
                                </button>) : (

                                <button className="control-button">
                                    <span className="material-symbols-outlined">videocam_off</span>
                                </button>)}
                        </div>
                        <div id="sound-control" onClick={toggleSound}>
                            {isMuted ? (<button className="control-button">
                                <span className="material-symbols-outlined">no_sound</span>
                            </button>) : (

                                <button className="control-button">
                                    <span className="material-symbols-outlined">volume_up</span>
                                </button>)}
                        </div>
                        <div id="call-control" onClick={closeCall}>
                            <button className="control-button" id="close-call">
                                <span className="material-symbols-outlined">call_end</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="controls">


                    <div id="connection-controls">
                        <div className="controls-input">
                            <div className="container">
                                <input
                                    type="text"
                                    name="localId"
                                    id="localId"
                                    maxLength="4"
                                    ref={localIdInp}
                                ></input>
                                {/*<p className="placeholder">OWN ID</p>*/}
                            </div>
                            {
                                isConnected ? (
                                    <button id="connectBtn" onClick={openConnection}>
                                        Connected !
                                    </button>
                                ) : (
                                    <button id="connectBtn" onClick={openConnection}>
                                        Connect
                                    </button>
                                )
                            }


                        </div>
                        <div className="controls-input">
                            <div className="container">

                                <input
                                    type="text"
                                    name="remoteId"
                                    id="remoteId"
                                    ref={remoteIdInp}
                                ></input>
                                {/*<p className="placeholder" ref={remotePlaceholder} >REMOTE ID</p>*/}
                            </div>

                            {
                                isCallOn ? (
                                    <button id="callBtn" onClick={call}>
                                        ongoing call
                                    </button>
                                ) : (
                                    <button id="callBtn" onClick={call}>
                                        call
                                    </button>
                                )
                            }

                            <button onClick={toggleVideo}>Test</button>
                        </div>
                        <div className="controls-input">
                            <button id="testConnection" onClick={newTest}>
                                Test Connection
                            </button>
                            <button onClick={answerCall}>
                                Raspunde ba
                            </button>
                            <div>
                                UP TIME :
                            </div>
                            <div>
                                {minutes} : {time} {latency}
                            </div>
                        </div>
                    </div>

                    <div id="local-video-control">
                        <video
                            id="localVideo"
                            playsInline
                            ref={localVideo}
                            autoPlay
                            muted
                            style={{aspectRatio: localAspectRatio}}
                        ></video>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default WebVideoCall;
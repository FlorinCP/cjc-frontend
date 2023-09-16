import React, {useEffect} from 'react';
import {useState, useRef} from "react";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import "./MobileVideoCall.css";
import CodeInput from "../CodeInput/CodeInput";

function MobileVideoCall(props) {

    const localVideo = useRef();
    const remoteVideo = useRef();

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
    const [isCallClosed, setIsCallClosed] = useState(false)
    const [minutes, setMinutes] = useState(null)
    const endDiv = useRef()
    const [isCallAccepted, setIsCallAccepted] = useState(false)
    const [callAccepted, setAcceptedCall] = useState(false)
    const [isReceiving, setIsReceiving] = useState(false)
    const [wasCallAccepted, setWasCallAccepted] = useState(false)
    const [localUserName, setLocalUserName] = useState(null)
    const [remoteUserName, setRemoteUserName] = useState(null)

    const [ringtone, setRingtone] = useState(new Audio("./answer-phone.mp3"))

    const scrollToBottom = () => {
        // endDiv.current.scrollIntoView({behavior: "smooth"});
        window.scrollTo(0, document.body.scrollHeight);
    };

    useEffect(() => {
        if (isCallOn) {
            setTimeout(scrollToBottom, 500)
        }
    }, [isCallOn]);

    let localPeer;
    let remoteID;


    const [time, setTime] = useState(null)
    const intervalRef = useRef(null)
    const increaseTime = () => setTime(prevState => prevState + 1)


    // de adaugat un if care verifica daca userul a apasat sa inchida sau nu
    // daca el a vrut sa se inchida sa se inchida intro parte un stream si in alta alt stream

    useEffect(() => {
        if (isCallClosed) {

            localStream.getTracks().forEach(track => track.stop())
            if (remoteStream) {
                remoteStream.getTracks().forEach(track => track.stop())
            }
            setLocalStream(null)
            setRemoteStream(null)

            setTimeout(() => {
                persistentStompClient.disconnect();
                localPeer.close()
                localPeer = null
                setIsConnected(false)
                window.location.reload()
            }, 1000)
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
    }

    localPeer = new RTCPeerConnection({
        iceServers: [
            {
                urls: ["stun:stun.l.google.com:19302"]
            },
            // {
            //     urls : ["stun:stun1.l.google.com:19302"]
            // },
            // {
            //     urls : ["stun:stun2.l.google.com:19302"]
            // },
            // {
            //     urls : ["stun:stun3.l.google.com:19302"]
            // },
            // {
            //     urls : ["stun:stun4.l.google.com:19302"]
            // }
        ]
    });

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

        if (isConnected) {
            navigator.mediaDevices
                .getUserMedia(constrains)
                .then((stream) => {
                    setLocalStream(stream)
                })
                .catch((error) => {
                    // access denied or error occurred
                    console.log(error);
                });

        }

    }, [isConnected]);


    useEffect(() => {
        if (localStream) {
            localVideo.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteStream) {
            setWasCallAccepted(true)
            remoteVideo.current.srcObject = remoteStream;
        }
    }, [remoteStream]);


    // function openConnection() {
    //
    //     // To do error handling
    //
    //     if (localId.current.value) {
    //         let socket = new SockJS("https://spring-boot-server-web-rtc.lm.r.appspot.com/websocket ", {
    //             debug: false,
    //         });
    //         let client = Stomp.over(socket);
    //         // client.debug = () => {};
    //
    //         client.connect({}, () => {
    //             setPersistentStompClient(client)
    //             setIsConnected(true)
    //         })
    //     } else {
    //         console.log("Empty Local Id ", localId.current.value)
    //     }
    //
    // }

    //  nu merge cu conditie din ceva motiv

    const [connectAnimation, setConnectAnimation] = useState(false)


    function openConnection() {
        // let socket = new SockJS("https://spring-boot-server-web-rtc.lm.r.appspot.com/websocket", {
        //     debug: false,
        // });

        setConnectAnimation(true)

        let socket = new SockJS("http://localhost:8080/websocket", {
            debug: false,
        });

        let client = Stomp.over(socket);

        client.connect({}, () => {
            setPersistentStompClient(client)
            setIsConnected(true)
            setConnectAnimation(false)
        })
    }


    const isCallAcceptedRef = useRef(isCallAccepted);

    function waitToAnswer() {
        return new Promise((resolve, reject) => {

            const interval = setInterval(() => {

                if (isCallAcceptedRef.current === true) {
                    clearInterval(interval);
                    resolve();
                }

            }, 1000);


            setTimeout(() => {
                clearInterval(interval);
                reject(new Error('Answer time expired'));
            }, 130000);
        });
    }

    useEffect(() => {
        isCallAcceptedRef.current = isCallAccepted
    }, [isCallAccepted]);

    const [playRingtone, setPlayRingtone] = useState(false)

    useEffect(() => {
        if (playRingtone === true) {
            setTimeout(() => {
                ringtone.play()
            }, 500)
        } else {
            ringtone.pause()
            ringtone.currentTime = 0
        }
    }, [playRingtone]);

    useEffect(() => {

        // this should only work when localId exists
        if (persistentStompClient && localStream) {

            persistentStompClient.subscribe("/topic/testServer", function (test) {
                console.log("Received: " + test.body);
                // setIsConnected(test.body)
            });

            persistentStompClient.subscribe("/topic/closeCall", function (test) {
                console.log("is Call closed ? : " + test.body);
                setIsCallClosed(test.body)
            });

            persistentStompClient.subscribe("/user/" + localId.current.value + "/topic/call", (call) => {

                remoteID = call.body;

                setRemoteUserName(call.body)

                localPeer.ontrack = (event) => {
                    remoteVideo.current.srcObject = event.streams[0];
                };

                localPeer.onicecandidate = (event) => {
                    if (event.candidate) {
                        var candidate = {
                            type: "candidate", lable: event.candidate.sdpMLineIndex, id: event.candidate.candidate,
                        };

                        persistentStompClient.send("/app/candidate", {}, JSON.stringify({
                            toUser: call.body, fromUser: localId.current.value, candidate: candidate,
                        }));
                    }
                };

                // Adding Audio and Video Local Peer
                localStream.getTracks().forEach((track) => {
                    localPeer.addTrack(track, localStream);
                });

                localPeer.createOffer().then((description) => {
                    localPeer.setLocalDescription(description).then(r => {
                        persistentStompClient.send("/app/offer", {}, JSON.stringify({
                            toUser: call.body, fromUser: localId.current.value, offer: description,
                        }));
                    })

                });


            });

            persistentStompClient.subscribe("/user/" + localId.current.value + "/topic/offer", (offer) => {
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

                        persistentStompClient.send("/app/candidate", {}, JSON.stringify({
                            toUser: remoteID, fromUser: localId.current.value, candidate: candidate,
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

                    persistentStompClient.send("/app/answer", {}, JSON.stringify({
                        toUser: remoteID, fromUser: localId.current.value, answer: description,
                    }));
                });

                setCallOn(true)
            });

            persistentStompClient.subscribe("/user/" + localId.current.value + "/topic/answer", (answer) => {

                setCallOn(true)
                setIsReceiving(true)
                setPlayRingtone(true)

                async function answerToCall() {
                    try {

                        await waitToAnswer()
                        let o = JSON.parse(answer.body)["answer"];
                        await localPeer.setRemoteDescription(new RTCSessionDescription(o))

                    } catch (err) {
                        console.log(err)
                    }
                }

                answerToCall().then(r => {
                    setAcceptedCall(true)
                    setPlayRingtone(false)
                })

            });

            persistentStompClient.subscribe("/user/" + localId.current.value + "/topic/candidate", (answer) => {

                let o = JSON.parse(answer.body)["candidate"];
                let iceCandidate = new RTCIceCandidate({
                    sdpMLineIndex: o["lable"], candidate: o["id"],
                });
                localPeer.addIceCandidate(iceCandidate).catch((err) => {

                })

            });

            //  (void) send(destination, headers = {}, body = '')
            persistentStompClient.send("/app/addUser", {}, localId.current.value);

        }

    }, [persistentStompClient, localStream]);


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

    function answerCall() {
        setIsCallAccepted(true)
    }

    function call() {

        if (remoteId.current.value) {
            remoteID = remoteId.current.value;
            setShowVideo(prevState => !prevState)
            persistentStompClient.send("/app/call", {}, JSON.stringify({
                callTo: remoteId.current.value, callFrom: localId.current.value,
            }));
        } else {
            console.log(" Empty remote Id", remoteId.current.value)
        }
    }


    const localId = useRef({value: null});
    const remoteId = useRef({value: null});


    function handleOwnIdData(data) {
        localId.current.value = data

    }

    // function getUserName(data) {
    //     setLocalUserName(data)
    // }
    //
    // function getRemoteId(data) {
    //     setRemoteUserName(data)
    // }

    // useEffect(() => {
    //     if (localUserName) {
    //         connectBtn.current.focus()
    //     }
    // }, [localUserName]);

    function handleRemoteIdData(data) {
        remoteId.current.value = data
    }

    // useEffect(() => {
    //     if (remoteUserName) {
    //         callBtn.current.focus()
    //     }
    // }, [remoteUserName]);

    const connectBtn = useRef(null)
    const callBtn = useRef(null)

    return (
        <div id="m-wrapper">
            <img src="/pigion.png" alt="check-email" id="check-email-img"/>
            <p className="info">
                Enter the credentials received in the email
            </p>
            <div id={isConnected ? "m-controls-big" : "m-controls"}>

                <div className="m-controls-input">
                    <p className="info-p">Your ID</p>
                    <CodeInput sendDataToParent={handleOwnIdData}
                               // sendMoreDataToParent={getUserName}
                               isDisabled={false}/>
                    {
                        isConnected ? (
                            <button className="activeBtn"
                                    disabled={isConnected}
                            >
                                Connected
                            </button>
                        ) : (
                            <button className="actionBtn" onClick={openConnection}
                                    // disabled={!localUserName}
                                    ref={connectBtn}
                            >
                                {
                                    connectAnimation ? (<div className="btn-loader">

                                    </div>) : (<>Connect</>)
                                }

                            </button>
                        )
                    }
                </div>

                {
                    isConnected ? (

                        <div className="m-controls-input">
                            <p className="info-p">Partner ID</p>
                            <CodeInput sendDataToParent={handleRemoteIdData}
                                       // sendMoreDataToParent={getRemoteId}
                                       isDisabled={!isConnected}/>

                            {
                                isCallOn ? (
                                    <button className="activeBtn">
                                        ongoing call
                                    </button>
                                ) : (
                                    <button className="actionBtn" onClick={call}
                                        // disabled={!remoteUserName}
                                            ref={callBtn}>
                                        call
                                    </button>
                                )
                            }
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>

            {
                isConnected ? (
                    <div id="m-video-component">

                        <div id="m-videos">
                            <div id="m-remote-video-container">
                                <video
                                    style={{boxShadow: showVideo ? '' : "none"}}
                                    id="m-remoteVideo"
                                    playsInline
                                    ref={remoteVideo}
                                    autoPlay
                                ></video>

                                {
                                    callAccepted ? (
                                        <>
                                            {/* daca da , nu afisam nimic , merge video ul */}
                                        </>
                                    ) : (
                                        <>
                                            {
                                                isReceiving ? (

                                                    <div className="loader-wrapper">
                                                        <button id="answerCall" onClick={answerCall}>
                                                        <span className="material-symbols-outlined"
                                                              id="answerPhone-icon">call
                                                        </span>
                                                        </button>
                                                    </div>

                                                ) : (
                                                    <>
                                                    </>

                                                )
                                            }


                                        </>
                                    )
                                }


                            </div>


                            <div id="m-local-video-container">
                                <video
                                    id="m-localVideo"
                                    playsInline
                                    ref={localVideo}
                                    autoPlay
                                    muted
                                ></video>
                            </div>

                        </div>

                        <div className="m-video-controls">

                            {
                                callAccepted || wasCallAccepted ? (
                                    <>
                                        <div id="m-mic-control" onClick={toggleMic}>
                                            {
                                                muteMic ? (
                                                    <button className="m-control-button">
                                                        <span className="material-symbols-outlined">mic_off</span>
                                                    </button>
                                                ) : (
                                                    <button className="m-control-button">
                                                        <span className="material-symbols-outlined">mic</span>
                                                    </button>
                                                )
                                            }
                                        </div>
                                        <div id="m-video-control" onClick={toggleCamera}>

                                            {showCamera ? (

                                                <button className="m-control-button">
                                                    <span className="material-symbols-outlined">videocam</span>
                                                </button>) : (

                                                <button className="m-control-button">
                                                    <span className="material-symbols-outlined">videocam_off</span>
                                                </button>)}
                                        </div>
                                        <div id="m-sound-control" onClick={toggleSound}>
                                            {isMuted ? (<button className="m-control-button">
                                                <span className="material-symbols-outlined">no_sound</span>
                                            </button>) : (

                                                <button className="m-control-button">
                                                    <span className="material-symbols-outlined">volume_up</span>
                                                </button>)}
                                        </div>
                                        <div id="m-call-control" onClick={closeCall}>
                                            <button className="m-control-button" id="m-close-call">
                                                <span className="material-symbols-outlined">call_end</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (<></>)
                            }

                        </div>
                    </div>
                ) : (<></>)
            }
            <div
                ref={endDiv}
            ></div>
        </div>
    );
}

export default MobileVideoCall;
import React from 'react';
import useScreenSize from "../hooks/useScreenSize";
import WebVideoCall from "../components/WebVideoCall/WebVideoCall";
import MobileVideoCall from "../components/MobileVideoCall/MobileVideoCall";



function VideoCall(props) {
    return (
        useScreenSize().width > 450 ? (
            <WebVideoCall/>
        ) : (
            <MobileVideoCall/>
        )
    );
}

export default VideoCall;
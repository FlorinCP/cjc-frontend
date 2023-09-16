import WebVideoCall from "./components/WebVideoCall/WebVideoCall";
import useScreenSize from "./hooks/useScreenSize";
import MobileVideoCall from "./components/MobileVideoCall/MobileVideoCall";
import Navbar from "./components/Navbar/Navbar";

function App() {

    return (
        <>
            <Navbar/>
            {
                useScreenSize().width > 450 ? (
                    <WebVideoCall/>
                ) : (
                    <MobileVideoCall/>
                )
            }
        </>
    );
}

export default App;

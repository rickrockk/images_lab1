import "./Main.css";
import {Canvas} from "./Canvas/Canvas";

function Main({selectedFile, setPixelData, setCursorPosition}) {
    return (
            <main className='main'>
                <Canvas
                    selectedFile={selectedFile}
                    setCursorPosition={setCursorPosition}
                    setPixelData={setPixelData}
                ></Canvas>
            </main>
        )
    }
    export default Main;
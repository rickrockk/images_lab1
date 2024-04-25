import React, {useState} from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import './App.css';
import 'normalize.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pixelData, setPixelData] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0});
  return (
    <div className='app'>
        <Header setSelectedFile={setSelectedFile}/>
        <Main selectedFile={selectedFile} setPixelData={setPixelData} setCursorPosition={setCursorPosition}/>
        <Footer pixelData={pixelData} selectedFile={selectedFile} cursorPosition={cursorPosition}/>
    </div>
  );
}

export default App;

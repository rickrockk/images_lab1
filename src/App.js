import React, { useRef, useState, useEffect } from 'react';
import { CanvasContext } from "./context/CanvasContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Workspace from "./components/Workspace/Workspace";
import { Modal } from "./components/Modal/Modal";
import ImageChangeForm from "./components/Modal/ImageChangeForm/ImageChangeForm";
import './App.css';
import 'normalize.css';

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageDimensions, setImageDimensions] = useState(null);
    const [pixelData, setPixelData] = useState(null);
    const [context, setContext] = useState(null);
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (selectedImage) {
            setImageDimensions({ width: selectedImage.width, height: selectedImage.height });
        }
    }, [selectedImage]);

    useEffect(() => {
        if (canvasRef.current) {
            const renderCtx = canvasRef.current.getContext('2d');
            if (renderCtx) {
                setContext(renderCtx);
            }
        }
    }, [canvasRef]);

    return (
        <CanvasContext.Provider value={{ context, canvasRef }}>
            <div className='app'>
                <Modal isActive={isActive} setIsActive={setIsActive}>
                    {
                        selectedImage && <ImageChangeForm selectedImage={selectedImage} setIsActive={setIsActive} setImageDimensions={setImageDimensions} />
                    }
                </Modal>
                <Header setSelectedImage={setSelectedImage} selectedImage={selectedImage} setIsActive={setIsActive} />
                <Workspace
                    selectedImage={selectedImage}
                    setPixelData={setPixelData}
                    scale={scale}
                    setImageDimensions={setImageDimensions}
                    setScale={setScale}
                    setContext={setContext}
                    imageDimensions={imageDimensions}
                />
                {
                    selectedImage && imageDimensions && <Footer scale={scale} imageDimensions={imageDimensions} pixelData={pixelData} selectedImage={selectedImage} setScale={setScale} />
                }
            </div>
        </CanvasContext.Provider>
    );
}

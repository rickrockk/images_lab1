import React, {useContext, useEffect} from "react";
import "./Header.css";
import OpenButton from "./OpenButton/OpenButton";
import {ImageURLInput} from "./ImageURLInput/ImageURLInput";
import {ClearButton} from "./ClearButton/ClearButton";
import {EditButton} from "./EditButton/EditButton";
import {CanvasContext} from "../../context/CanvasContext";

function Header({setSelectedImage, setIsActive, selectedImage}) {
    const [clear, setClear] = React.useState(false);
    const [showEditButton, setShowEditButton] = React.useState(false);

    const {canvasRef} = useContext(CanvasContext)

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'canvas_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    useEffect(() => {
        if (selectedImage) {
            setShowEditButton(true);
        } else {
            setShowEditButton(false);
        }
    }, [selectedImage]);

    useEffect(() => {
        if (clear) {
            setClear(false);
        }
    }, [clear])
    return (
        <header className="header">
            <div className="header__container">
                <ul className="header__controls">
                    <li className="header__control">
                        <OpenButton className='open__file' setSelectedImage={setSelectedImage}/>
                    </li>
                    <li className="header__control">
                        <ImageURLInput className='open__link'  setSelectedImage={setSelectedImage} clear={clear}/>
                    </li>
                    <li className="header__control">
                        <ClearButton  setSelectedImage={setSelectedImage} setClear={setClear}/>
                    </li>
                </ul>
                {
                    showEditButton && <div className="buttons">
                        <button onClick={handleDownload}>Скачать изображение</button>
                        <EditButton setIsActive={setIsActive} show={showEditButton}></EditButton>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header;
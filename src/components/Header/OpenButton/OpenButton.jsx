import React, { useRef } from 'react';
import './OpenButton.css';

function OpenButton({setSelectedImage}) {
    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const image = new Image();
        image.src = URL.createObjectURL(file)
        image.onload = () => {
            setSelectedImage(image)
        }
    }

    return (
        <div>
            <input className="input"
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <button className="button" onClick={handleClick}>Выбрать фото</button>
        </div>
    )
}

export default OpenButton;
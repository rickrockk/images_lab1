import React, { useRef } from 'react';
import './OpenButton.css';

function OpenButton({ setSelectedFile }) {
    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    return (
        <div>
            <input className="input"
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <button className="button" onClick={handleClick}>Загрузить изображение </button>
        </div>
    )
}

export default OpenButton;
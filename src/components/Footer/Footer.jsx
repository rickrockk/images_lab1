import React, {useEffect, useState} from 'react';
import './Footer.css';

function Footer({pixelData, selectedFile, cursorPosition}) {
    const [color, setColor] = useState({red: 0, green: 0, blue: 0, alpha: 0})
    const [image, setImage] = useState({width: 0, height: 0});
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        if (!selectedFile) return;
        const image = new Image();
        image.src = URL.createObjectURL(selectedFile);
        image.onload = () => {
            setImage({width: image.width, height: image.height});
        }
    }, [selectedFile]);

    useEffect(() => {
        if (!pixelData) return;
        const [red, green, blue, alpha] = pixelData;
        const {x, y} = cursorPosition;
        setPosition({x, y})
        setColor({red, green, blue, alpha});
    }, [pixelData, cursorPosition]);


    return (
        <footer className="footer">
            <div className="footer__container">
                <div className='footer__resolution'>
                    <span>Разрешение: {image.width}x{image.height}</span>
                </div>
                <div className='footer__color-data'>
                    <p>Цвет:</p>
                    <div className='color-date__color-preview' style={
                        {backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`}
                    }></div>
                    <span>r: {color.red}</span>
                    <span>g: {color.green}</span>
                    <span>b: {color.blue}</span>
                    <span>a: {color.alpha}</span>
                </div>

                <div className='footer__cursor-position'>
                    <p>Координаты: </p>
                    <span>x: {position.x} </span>
                    <span>y: {position.y}</span>
                </div>
                <p className="footer__text">Королёв Кирилл, 211-323</p>
            </div>
        </footer>
    )
}

export default Footer;
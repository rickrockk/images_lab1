import React, {useEffect, useState} from "react";
import './Canvas.css';
function getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.ceil((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
    const y = Math.ceil((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    if (x < 0 || y < 0) return {x: 0, y: 0};
    return {x, y};
}

function getPixelData(ctx, x, y) {
    return ctx.getImageData(x, y, 1, 1).data;
}
export function Canvas({selectedFile, setPixelData, setCursorPosition}) {
    const canvasRef = React.createRef();
    const [ width, setWidth ] = useState(0);
    const [ height, setHeight ] = useState(0);
    useEffect(() => {
        if (!selectedFile) return;

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        const image = new Image();
        image.src = URL.createObjectURL(selectedFile);
        image.onload = () => {
            setWidth(image.width);
            setHeight(image.height);
            ctx.drawImage(image, 0, 0);
        }
        canvasRef.current = canvas;
    }, [selectedFile, canvasRef]);

    const pick = (e) => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        const {x, y} = getMousePos(canvas, e);
        const pixelData = getPixelData(ctx, x, y);
        setPixelData(pixelData);
        setCursorPosition({x, y});
    }
    return (
        <div className="canvas__container">
            <canvas className='canvas'
                    id='canvas'
                    ref={canvasRef}
                    width={width}
                    height={height}
                    onMouseMove={pick}
            >
            </canvas>
        </div>
    )
}
import { useContext, useEffect, useRef } from "react";
import './Canvas.css';
import { CanvasContext } from "../../../context/CanvasContext";
import { pick, getWidthAndHeightByScale, drawImageWithResizing, calculateImageScale } from "./utils/utils";

export function Canvas({ selectedImage, setPixelData, scale, setScale, setContext, imageDimensions }) {
    const { canvasRef, context } = useContext(CanvasContext);
    const imageRef = useRef(selectedImage);
    const dimensionsRef = useRef(imageDimensions);

    useEffect(() => {
        imageRef.current = selectedImage;
    }, [selectedImage]);

    useEffect(() => {
        dimensionsRef.current = imageDimensions;
    }, [imageDimensions]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        setContext(context);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (imageRef.current) {
                const newScale = calculateImageScale(imageRef.current, canvas.width, canvas.height);
                setScale(newScale);
                const [width, height] = getWidthAndHeightByScale(imageRef.current, newScale);
                drawImageWithResizing(imageRef.current, width, height, canvas, context);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setScale, setContext]);

    useEffect(() => {
        if (!imageRef.current || !dimensionsRef.current) return;
        const [width, height] = getWidthAndHeightByScale(dimensionsRef.current, scale);
        drawImageWithResizing(imageRef.current, width, height, canvasRef.current, context);
    }, [scale, context]);

    useEffect(() => {
        if (imageDimensions && imageDimensions.width && imageDimensions.height && imageRef.current) {
            drawImageWithResizing(imageRef.current, imageDimensions.width, imageDimensions.height, canvasRef.current, context);
        }
    }, [imageDimensions, context]);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const pixelData = pick(e, canvasRef.current, context);
        setPixelData(pixelData);
    };

    return (
        <div className="canvas__container">
            <canvas
                className='canvas'
                id='canvas'
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setPixelData({ color: null, position: null })}
            >
            </canvas>
        </div>
    );
}

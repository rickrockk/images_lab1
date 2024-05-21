import React from 'react';
import { Canvas } from './Canvas/Canvas';
import './Workspace.css';

export default function Workspace({ selectedImage, imageDimensions, setPixelData, scale, setScale, setContext }) {
    return (
        <div className="workspace">
            <Canvas
                selectedImage={selectedImage}
                imageDimensions={imageDimensions}
                setPixelData={setPixelData}
                scale={scale}
                setScale={setScale}
                setContext={setContext}
            />
        </div>
    );
}

import React, { useState, useEffect, useContext } from 'react';
import { updateImageSize, updateImageSizeByPercent } from './utils';
import './ImageChangeForm.css';
import { CanvasContext } from "../../../context/CanvasContext";

const ImageChangeForm = ({ selectedImage, setImageDimensions, setIsActive }) => {
    const [width, setWidth] = useState(selectedImage.width);
    const [height, setHeight] = useState(selectedImage.height);
    const [widthInPercent, setWidthInPercent] = useState(100);
    const [heightInPercent, setHeightInPercent] = useState(100);
    const [isPercent, setIsPercent] = useState(false);
    const { context } = useContext(CanvasContext);
    const [keepAspectRatio, setKeepAspectRatio] = useState(true);
    const [interpolation, setInterpolation] = useState('nearest-neighbor');

    const handleWidthChange = (e) => {
        const value = e.target.value;
        if (isPercent) {
            setWidthInPercent(value);
            const newWidth = (value / 100) * selectedImage.width;
            setWidth(newWidth);
            if (keepAspectRatio) {
                const newHeight = (newWidth / selectedImage.width) * selectedImage.height;
                setHeight(newHeight);
                setHeightInPercent((newHeight / selectedImage.height) * 100);
            }
        } else {
            setWidth(value);
            if (keepAspectRatio) {
                const newHeight = (value / selectedImage.width) * selectedImage.height;
                setHeight(newHeight);
            }
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value;
        if (isPercent) {
            setHeightInPercent(value);
            const newHeight = (value / 100) * selectedImage.height;
            setHeight(newHeight);
            if (keepAspectRatio) {
                const newWidth = (newHeight / selectedImage.height) * selectedImage.width;
                setWidth(newWidth);
                setWidthInPercent((newWidth / selectedImage.width) * 100);
            }
        } else {
            setHeight(value);
            if (keepAspectRatio) {
                const newWidth = (value / selectedImage.height) * selectedImage.width;
                setWidth(newWidth);
            }
        }
    };

    const handleAspectRatioChange = (e) => {
        setKeepAspectRatio(e.target.checked);
    };

    const handleInterpolationChange = (e) => {
        setInterpolation(e.target.value);
    };

    const handleClick = () => {
        if (isPercent) {
            if (selectedImage && widthInPercent && heightInPercent) {
                updateImageSizeByPercent(selectedImage, widthInPercent, heightInPercent, context);
            }
        } else {
            if (selectedImage && width && height) {
                updateImageSize(selectedImage, width, height, context);
            }
        }
        setImageDimensions({ width, height });
        setIsActive(false);
    };

    useEffect(() => {
        if (selectedImage) {
            setWidth(selectedImage.width);
            setHeight(selectedImage.height);
        }
    }, [selectedImage]);

    return (
        <div className="image-change__form">
            <div className="form__content">
                <h2>Изменение размера изображения</h2>
                <div className="image__size-info">
                    <p>Текущее количество пикселей: {(width * height) / 1000000} мегапикселей</p>
                    <p>Новое количество пикселей: {(width * height) / 1000000} мегапикселей</p>
                </div>
                <div className="form__inputs">
                    <label htmlFor="resizeAlgorythm">
                        Выберите алгоритм:
                        <select id="resizeAlgorythm" onChange={handleInterpolationChange} value={interpolation}>
                            <option value="nearest-neighbor">Ближайший сосед</option>
                        </select>
                    </label>
                    <label htmlFor="units">
                        Единицы измерения:
                        <select id="units" onChange={(e) => setIsPercent(e.target.value === 'percent')}>
                            <option value="pixels">Пиксели</option>
                            <option value="percent">Проценты</option>
                        </select>
                    </label>
                    <label htmlFor="proportions">
                        Сохранить пропорции
                        <input type="checkbox" id='proportions' checked={keepAspectRatio} onChange={handleAspectRatioChange} />
                    </label>
                    <label htmlFor="width">
                        Ширина:
                        <input
                            id="width"
                            type="number"
                            value={isPercent ? widthInPercent : width}
                            onChange={handleWidthChange}
                        />
                    </label>
                    <label htmlFor="height">
                        Высота:
                        <input
                            id="height"
                            type="number"
                            value={isPercent ? heightInPercent : height}
                            onChange={handleHeightChange}
                        />
                    </label>
                </div>
                <button onClick={handleClick}>Применить</button>
            </div>
        </div>
    );
};

export default ImageChangeForm;

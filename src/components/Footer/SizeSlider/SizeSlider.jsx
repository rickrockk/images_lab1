import { useEffect, useState } from "react";
import './SizeSlider.css';

export function SizeSlider({ show, setScale, scale }) {
    const [value, setValue] = useState(100);

    useEffect(() => {
        if (!show) {
            setValue(scale * 100);
        }
    }, [show, scale]);

    useEffect(() => {
        setScale(value / 100);
    }, [value, setScale]);

    const handleSizeChange = (e) => {
        setValue(e.target.value);
    };

    if (show) {
        return (
            <div className='size-slider'>
                <label htmlFor="size-slider__input">{value}%</label>
                <input
                    type="range"
                    min="12"
                    max="300"
                    value={value}
                    className="size-slider__input"
                    onChange={handleSizeChange}
                />
            </div>
        );
    } else {
        return null;
    }
}

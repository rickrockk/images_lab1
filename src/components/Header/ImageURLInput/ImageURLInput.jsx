import {useEffect} from "react";
import {clearInput, getInputValue} from "../../../utils/utils";
import {fetchImage} from "./utils/utils";

export function ImageURLInput(props) {
    const handleLoad = async () => {
        const url = `https://justcors.com/tl_7a69c2d/${getInputValue('.image-url-input__input')}`;
        const image = await fetchImage(url);
        props.setSelectedImage(image);
    }

    useEffect(() => {
        if (props.clear) {
            clearInput('.image-url-input__input')
        }
    },[props.clear])

    return (
        <div className='image-url-input'>
            <input
                type="text"
                className="image-url-input__input"
                placeholder="Ссылка на фото"
            />
            <button
                className="image-url-input__button"
                onClick={handleLoad}
            >
                Загрузить
            </button>
        </div>
    )
}
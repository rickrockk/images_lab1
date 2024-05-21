import React from "react";

export function SizeData({imageDimensions}) {
        return (
            <div className='size-data'>
                <span className='footer__resolution'>Размер: {imageDimensions.width} x {imageDimensions.height} пикселей</span>
            </div>
        )
}
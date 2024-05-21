export function pick(e, canvas, ctx) {
    const position = getMousePos(canvas, e);
    const pixelData = getPixelData(ctx, position.x, position.y);
    return {
        color: {red: pixelData[0], green: pixelData[1], blue: pixelData[2]},
        position: {x: position.x, y: position.y}
    }
}

export function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// export function calculateImageScale(image, canvas) {
//     if (image.width < canvas.width && image.height < canvas.height) {
//         return {width: image.width, height: image.height }
//     }
//
//     let aspectRatioImage = image.width / image.height;
//
//
// }

export function calculateImageScale(image, canvasWidth, canvasHeight) {
    let scaleWidth = canvasWidth / image.width;
    let scaleHeight = canvasHeight / image.height;
    let scale = Math.min(scaleWidth, scaleHeight);
    return scale;
}

export function drawImageWithResizing(image, dWidth, dHeight, canvas, context) {
    let sx, sy, sWidth, sHeight, dx, dy;
    sWidth = image.width;
    sHeight = image.height;

    sx = 0;
    sy = 0;


    dx = (canvas.width - dWidth) / 2;
    dy = (canvas.height - dHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, sy, sx, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

export function getWidthAndHeightByScale(image, scale) {
    return [image.width * scale, image.height * scale]
}

export function getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    let x =  Math.ceil((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
    let y = Math.ceil((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    if (y < 0) y = 0
    if (x < 0) x = 0
    return {x, y}
}

export function getPixelData(ctx, x, y) {
    return ctx.getImageData(x, y, 1, 1).data;
}

export function loadImage(image) {
    const canvas = new OffscreenCanvas(image.width, image.height);
;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    return canvas

}

export function resizeByScale(image, canvas, scale) {
    const newWidth = image.width * scale;
    const newHeight = image.height * scale;
    const newImage = resize(image, newWidth, newHeight);
    return newImage
}

function resize(image, newWidth, newHeight) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Создаем временный canvas для хранения оригинального изображения
    const tempCanvas = document.createElement('canvas');
    const tCtx = tempCanvas.getContext('2d');
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    tCtx.drawImage(image, 0, 0, image.width, image.height);

    // Получаем данные оригинального изображения
    const imageData = tCtx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;

    // Создаем новое изображение с измененными размерами
    for (let y = 0; y < newHeight; y++) {
        for (let x = 0; x < newWidth; x++) {
            const srcX = Math.floor(x / newWidth * image.width);
            const srcY = Math.floor(y / newHeight * image.height);
            const srcPos = (srcY * image.width + srcX) * 4;
            const destPos = (y * newWidth + x) * 4;
            ctx.putImageData(new ImageData(new Uint8ClampedArray(data.slice(srcPos, srcPos + 4)), 1, 1), x, y);
        }
    }

    return canvas;
}
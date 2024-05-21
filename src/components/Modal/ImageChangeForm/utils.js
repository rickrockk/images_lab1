/**
 * Изменяет размер изображения с использованием метода интерполяции по ближайшему соседу.
 * @param {HTMLImageElement} image - Исходное изображение.
 * @param {number} newWidth - Новая ширина изображения.
 * @param {number} newHeight - Новая высота изображения.
 * @param {number} widthPercent - Процент от исходной ширины изображения.
 * @param {number} heightPercent - Процент от исходной высоты изображения.
 * @param {CanvasRenderingContext2D} context - Контекст холста, на котором будет отображаться изображение.
 */

export function updateImageSize(image, newWidth, newHeight, context) {
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');

    // Устанавливаем размеры временного холста равными новым размерам изображения
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;

    // Выполняем интерполяцию по ближайшему соседу
    tempContext.imageSmoothingEnabled = false; // Отключаем сглаживание
    tempContext.drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight);

    // Очищаем основной холст и рисуем на нем измененное изображение
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(tempCanvas, (context.canvas.width - newWidth) / 2, (context.canvas.height - newHeight) / 2);
}

export function updateImageSizeByPercent(image, widthPercent, heightPercent, context) {
    // Рассчитываем новые размеры изображения
    const newWidth = image.width * (widthPercent / 100);
    const newHeight = image.height * (heightPercent / 100);

    // Создаем временный холст для изменения размера изображения
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;

    // Выполняем интерполяцию по ближайшему соседу
    tempContext.imageSmoothingEnabled = false;
    tempContext.drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight);

    // Очищаем основной холст и рисуем измененное изображение по центру
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(tempCanvas, (context.canvas.width - newWidth) / 2, (context.canvas.height - newHeight) / 2);
}

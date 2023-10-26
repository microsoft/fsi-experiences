import { IMAGE_SRC } from '../../../constants/ImageSrc';
import { ErrorImageSize } from './ErrorState.interface';

export const sizeToIcon = (size: ErrorImageSize) => {
    const sizeToIconMap = {
        48: IMAGE_SRC.error48,
        100: IMAGE_SRC.error100,
        200: IMAGE_SRC.error,
    };
    return sizeToIconMap[size];
};

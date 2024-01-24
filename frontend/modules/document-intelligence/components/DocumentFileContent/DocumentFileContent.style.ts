import { IImageStyles } from '@fluentui/react/lib/components/Image/Image.types';
import { mergeStyles } from '@fluentui/react/lib/Styling';

export const documentIframeContainerStyle = mergeStyles({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
});

export const documentFrameStyle = mergeStyles({
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
    img: {
        margin: 'auto',
    },
});

export const imageStyles: IImageStyles = {
    root: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
    },
    image: {},
};

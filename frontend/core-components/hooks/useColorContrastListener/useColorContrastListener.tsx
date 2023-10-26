import useMediaQueryListener from '../useMediaQueryListener/useMediaQueryListener';

export function useColorContrastListener() {
    return useMediaQueryListener('screen and (forced-colors: active), screen and (-ms-high-contrast: active)');
}

export default useColorContrastListener;

import { useEffect, useState } from 'react';

export function useMediaQueryListener(query: string, customWindow?: Window) {
    const [isQueryApplied, setIsQueryApplied] = useState(false);

    useEffect(() => {
        if (!query) {
            return;
        }

        function onChangeHandler(e) {
            setIsQueryApplied(e.matches);
        }

        const mediaQuery = (customWindow || window).matchMedia(query);

        mediaQuery.addEventListener('change', onChangeHandler);

        // run once at the load of the page
        onChangeHandler(mediaQuery);

        return () => {
            mediaQuery.removeEventListener('change', onChangeHandler);
        };
    }, [query]);

    return isQueryApplied;
}

export default useMediaQueryListener;

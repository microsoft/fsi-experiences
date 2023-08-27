/* istanbul ignore file */
import { useState, useEffect } from 'react';

const initialState = {
    messages: [],
    error: null,
};

interface IUseBrowserCommunicationOutput {
    error: any;
    messages: any[];
    postMessage: (message) => void;
}

const useBrowserCommunication = (channel: string, postingWindow: Window = window): IUseBrowserCommunicationOutput => {
    if (!channel) {
        throw Error('You need to pass a channel name e.g. useBrowserCommunication("GreatChannel")');
    }

    const [{ error, messages }, setState] = useState(initialState);

    const postMessage = message => {
        if (message) {
            const msg = JSON.stringify({
                channel,
                data: {
                    message,
                    time: Date.now(),
                },
            });

            postingWindow.postMessage(msg, window.origin);
        }
    };

    const updateState = data => {
        setState(prevState => ({
            error: null,
            messages: prevState.messages.concat(data.message),
        }));
    };

    useEffect(() => {
        const onMessage = event => {
            const isString = typeof event.data === 'string';
            const hasSameOrigin = event.origin === window.origin;

            if (isString && hasSameOrigin) {
                const message = JSON.parse(event.data);

                if (message.channel === channel) {
                    updateState(message.data);
                }
            }
        };

        postingWindow.addEventListener('message', onMessage);

        return () => {
            postingWindow.removeEventListener('message', onMessage);
        };
    }, [channel]);

    return { error, messages, postMessage };
};

export default useBrowserCommunication;

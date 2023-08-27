import React, { FC, useContext, useEffect } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';
import { useMediaQueryListener } from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService';
import { MAIN_FORM_ID } from '../../../constants/LoanQueries.consts';
import { MEDIA_QUERY_BREAKPOINT_SMALL } from '../../../constants/StyleSelectors.consts';
import { LoanOnboardingContext } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import {
    LOAN_DATA_IFRAME_ID,
    OUTPUT_VISUALLY_HIDDEN_INLINE_STYLES,
    SMALL_SCREEN_ATTR,
    SR_TOAST_CONTENT_ID,
    SR_TOAST_ID,
    SR_TOAST_TITLE_ID,
} from './LoanEntityWidget.const';
import { LoanEntityWidgetStyles } from './LoanEntityWidget.style';

/* istanbul ignore next */
const getSrToastNotificationOutput = () => {
    /* NOTE: This output will be inside the IFrame and it's intended for a screen reader. 
       It will get the same message as a ToastNotification*/
    const output = document.createElement('output') as HTMLOutputElement;

    output.setAttribute('role', 'alert');
    output.setAttribute('aria-live', 'assertive');

    /*NOTE: For Windows Narrator instead of using `aria-label`*/
    output.setAttribute('aria-labelledby', SR_TOAST_CONTENT_ID);
    output.setAttribute('aria-describedby', SR_TOAST_TITLE_ID);

    /* style to hide this output visually but still make it visible for a screen reader */
    output.style.cssText = OUTPUT_VISUALLY_HIDDEN_INLINE_STYLES;
    output.id = SR_TOAST_ID;
    return output;
};

/* istanbul ignore next */
const getSrToastNotificationOutputContent = (text: string) => {
    const content = document.createElement('p');
    content.id = SR_TOAST_CONTENT_ID;
    content.textContent = text;
    return content;
};

/* istanbul ignore next */
const getSrToastNotificationOutputTitle = (text: string) => {
    const title = document.createElement('h2');
    title.id = SR_TOAST_TITLE_ID;
    title.textContent = text;
    return title;
};

export const LoanEntityWidget: FC = () => {
    const { selectedApplication } = useContext(LoanOnboardingContext);
    const { message } = useNotificationService();

    const applicationUrl = (window as any).Xrm?.Utility?.getGlobalContext?.().getCurrentAppUrl();

    const isSmallScreen = useMediaQueryListener(`screen and (max-width: ${MEDIA_QUERY_BREAKPOINT_SMALL})`);

    const { messages: loansListMessages } = useBrowserCommunication(`on-loanapp-form-load-outer-channel`);

    const translate = useTranslation();

    /* istanbul ignore next */
    useEffect(() => {
        const loanDataIframe = document.getElementById(LOAN_DATA_IFRAME_ID);
        const iframeBody = (loanDataIframe as HTMLIFrameElement)?.contentDocument?.body;

        if (!iframeBody) {
            return;
        }

        if (isSmallScreen) {
            iframeBody.setAttribute(SMALL_SCREEN_ATTR, 'true');
        } else {
            iframeBody.removeAttribute(SMALL_SCREEN_ATTR);
        }
    }, [isSmallScreen, loansListMessages]);

    /* istanbul ignore next */
    useEffect(() => {
        /* NOTE: This code will run every time `toastNotificationMessage` is changed */
        const loanDataIframe = document.getElementById(LOAN_DATA_IFRAME_ID);
        const iframeBody = (loanDataIframe as HTMLIFrameElement)?.contentDocument?.body;

        if (!iframeBody) {
            return;
        }

        const output = getSrToastNotificationOutput() as HTMLOutputElement;

        if (!output) return;

        output.innerHTML = '';

        if (!message) {
            const output = iframeBody.querySelector(`#${SR_TOAST_ID}`) as HTMLOutputElement;
            setTimeout(() => output?.remove(), 150);
            return;
        }

        const outputTitle = getSrToastNotificationOutputTitle(translate('NOTIFICATION'));
        output.appendChild(outputTitle);

        const outputContent = getSrToastNotificationOutputContent(message);
        output.appendChild(outputContent);

        /**NOTE: This hack is intended for Firefox to force screen reader to read notification in that browser**/
        setTimeout(() => {
            iframeBody?.append(output);
        }, 700);
    }, [message]);

    return selectedApplication ? (
        <iframe
            title={selectedApplication.name}
            src={`${applicationUrl}&navbar=off&pagetype=entityrecord&etn=msfsi_loanapplication&id=${selectedApplication.id}&formid=${MAIN_FORM_ID}`}
            className={LoanEntityWidgetStyles}
            id={LOAN_DATA_IFRAME_ID}
        ></iframe>
    ) : null;
};

export default LoanEntityWidget;

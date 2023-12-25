import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { ITaskVerificationSectionStyles } from './TaskVerificationSection.interface';

const taskVerificationSectionClassPrefix = 'tasks-verification-section';

export const getClassNames = (customStyles?: ITaskVerificationSectionStyles): ITaskVerificationSectionStyles => {
    return mergeStyleSets(
        {
            container: {
                displayName: taskVerificationSectionClassPrefix,
                '& > *': {
                    boxSizing: 'border-box',
                },
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                paddingInline: 24,
                paddingBlock: 15,
            },
        },
        customStyles
    );
};

export const taskStatusStyles = { root: { gap: 12 } };

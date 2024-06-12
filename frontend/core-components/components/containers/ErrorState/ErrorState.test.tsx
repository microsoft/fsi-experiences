import React from 'react';
import { render } from '@testing-library/react';
import ErrorState from './ErrorState';
import { IMAGE_SRC } from '../../../constants/ImageSrc';
import { IErrorStateProps } from './ErrorState.interface';
import commonStrings from '../../../assets/strings/common/common.1033.json';

const mockedEmptyState = jest.fn();

jest.mock('../../atoms/EmptyState/EmptyState', () => props => {
    mockedEmptyState(props);
    return <></>;
});
beforeEach(() => {
    mockedEmptyState.mockReset();
});

describe('ErrorState', () => {
    it('should render error state with default error texts and icon', () => {
        render(<ErrorState iconSize={100} />);
        expect(mockedEmptyState).toHaveBeenCalledWith({
            iconSize: 100,
            isErrorState: true,
            icon: IMAGE_SRC.error100,
            title: commonStrings.ERROR_STATE_TITLE,
            subtitle: commonStrings.ERROR_STATE_SUBTITLE,
        });
    });

    it('should render error state without error icon', () => {
        render(<ErrorState />);

        expect(mockedEmptyState).toHaveBeenCalledWith({
            isErrorState: true,
            title: commonStrings.ERROR_STATE_TITLE,
            subtitle: commonStrings.ERROR_STATE_SUBTITLE,
        });
    });

    it('should render empty state with the same props', () => {
        const props: IErrorStateProps = {
            title: 'title',
            subtitle: 'subtitle',
            isErrorState: true,
            styles: { container: { width: 1000 } },
        };
        render(<ErrorState {...props} />);
        expect(mockedEmptyState).toHaveBeenCalledWith(props);
    });
});

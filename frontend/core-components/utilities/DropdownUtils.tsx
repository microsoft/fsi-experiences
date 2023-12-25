import React, { ReactElement } from 'react';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';

export function renderEmphasizedOption(option?: IDropdownOption): ReactElement | null {
    const textParticles = option?.text?.split(' - ');
    if (!textParticles) {
        return null;
    }
    if (!textParticles[1]) {
        return <span>{textParticles[0]}</span>;
    }
    return (
        <span>
            <b>{textParticles[0]}</b> - {textParticles[1]}
        </span>
    );
}

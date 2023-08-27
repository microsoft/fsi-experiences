import React, { ReactElement } from 'react';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';

export function renderEmphasizedOption(option?: IDropdownOption): ReactElement | null {
    const textParticles = option?.text?.split(' - ');
    if (!textParticles) return null;
    return (
        <span>
            <b>{textParticles[0]}</b> - {textParticles[1]}
        </span>
    );
}

export function findByID<T extends { id: string }>(items: T[], idToFind: string) {
    return items.find((item: T) => {
        return item.id === idToFind;
    });
}

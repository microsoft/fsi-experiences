import { IFieldLayout } from '@fsi/core-components/dist/dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';

export const getSections = (xml: Document): NodeListOf<Element> => {
    return xml.querySelectorAll('section:not([visible="false"]');
};

export const getTabTitle = (xml: Document): string | undefined => {
    const mainTab = xml.getElementsByTagName('tab')[0];
    return getLabel(mainTab);
};

export const getSectionFields = (section: Element, max: number): IFieldLayout[] => {
    const fields: IFieldLayout[] = [];
    const rows = section.getElementsByTagName('row');
    for (let j = 0; j < rows.length && fields.length < max; j++) {
        const row = rows[j];
        const cell = row && row.getElementsByTagName('cell')[0];

        if (!cell) {
            continue;
        }
        const fieldName = cell.getElementsByTagName('control')[0]?.attributes?.['datafieldname']?.value;
        const label = getLabel(cell);

        if (!fieldName) {
            continue;
        }
        const visible = cell.attributes?.['visible']?.value !== 'false';
        const hideLabel = cell.attributes?.['showlabel']?.value === 'false';
        if (visible) {
            fields.push({
                hideLabel,
                name: fieldName,
                label,
            });
        }
    }
    return fields;
};

export const getLabel = (node?: Element): string | undefined => {
    return node?.getElementsByTagName('label')[0]?.attributes?.['description']?.value;
};

import { getClassNameStyleSets } from './GetClassNameStyleSets';

describe('GetClassNameStyleSets utility function', () => {
    const baseClassName = 'baseClass';
    const underlinedClass = 'underlinedClass';
    const customClassNames = 'customClassName';
    const styles = {
        '.myStyle': {
            position: 'absolute',
            color: 'red',
        },
    };

    it('Should have base class set', () => {
        const getClassNamesStyleSetsResult = getClassNameStyleSets({ baseClassName, styles, customClassNames, underlinedClass });
        expect(getClassNamesStyleSetsResult[baseClassName]).toEqual(expect.stringContaining(baseClassName));
    });

    it('Should have underlined class set', () => {
        const getClassNamesStyleSetsResult = getClassNameStyleSets({ baseClassName, styles, customClassNames, underlinedClass });
        expect(getClassNamesStyleSetsResult[baseClassName]).toEqual(expect.stringContaining(underlinedClass));
    });

    it('Should NOT have underlined class set', () => {
        const getClassNamesStyleSetsResult = getClassNameStyleSets({ baseClassName, styles, customClassNames });
        expect(getClassNamesStyleSetsResult[baseClassName]).not.toEqual(expect.stringContaining(underlinedClass));
    });

    it('Should have custom class name set', () => {
        const getClassNamesStyleSetsResult = getClassNameStyleSets({ baseClassName, styles, customClassNames, underlinedClass });
        expect(getClassNamesStyleSetsResult[baseClassName]).toEqual(expect.stringContaining(customClassNames));
    });

    it('Should NOT have custom class name set', () => {
        const getClassNamesStyleSetsResult = getClassNameStyleSets({ baseClassName, styles, underlinedClass });
        expect(getClassNamesStyleSetsResult[baseClassName]).not.toEqual(expect.stringContaining(customClassNames));
    });
});

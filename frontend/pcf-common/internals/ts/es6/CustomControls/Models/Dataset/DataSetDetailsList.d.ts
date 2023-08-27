import { DataSetUpdatePropertyNames } from "./CustomControlDataSetInterfaces";
export declare class DataSetDetailsList<TExpression> {
    private _list;
    private _makeComparer;
    private _onUpdated;
    constructor(makeComparer: (lhs: TExpression) => (rhs: TExpression) => boolean, propertyName: DataSetUpdatePropertyNames, onUpdated: (property: DataSetUpdatePropertyNames) => void);
    get(): TExpression[];
    add(expression: TExpression): void;
    private _addInternal;
    addRange(expressions: TExpression[] | undefined): void;
    remove(expression: TExpression): void;
    clear(): void;
    as<TInterface>(get: keyof TInterface, add: keyof TInterface, remove: keyof TInterface, clear: keyof TInterface): TInterface;
}

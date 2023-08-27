declare class CustomControlEntityReference {
    static EMPTY: CustomControlEntityReference;
    private _etn;
    private _id;
    private _name;
    private _Id;
    constructor(entityName: string, id?: string, name?: string);
    get entityName(): string;
    get entityType(): string;
    get logicalName(): string;
    get LogicalName(): string;
    get id(): string;
    get Id(): string | CrmFramework.Guid;
    get name(): string;
    get Name(): string;
    static toString(reference: CustomControlEntityReference): string;
    static equals(x: CustomControlEntityReference, y: CustomControlEntityReference): boolean;
}
export { CustomControlEntityReference };

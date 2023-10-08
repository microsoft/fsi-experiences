export interface IAccess {
    create: boolean;
    read: boolean;
    write: boolean;
    delete: boolean;
    append: boolean;
    appendTo: boolean;
}

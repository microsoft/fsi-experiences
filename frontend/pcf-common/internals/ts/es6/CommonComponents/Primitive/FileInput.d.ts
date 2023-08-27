import * as React from "react";
import { IPropsBase } from "./ComponentBase";
import { IViewStyle } from "./IViewStyle";
import * as ReactFela from "react-fela";
interface IFile {
    content: string;
    encoding: string;
    mimeType: string;
    name: string;
    size: number;
}
interface IFileInputProps extends IPropsBase {
    style?: IViewStyle;
    accept?: string[];
    fileSelected?(file: IFile): void;
    fileUnselected?(): void;
    onReaderError?(errorMessage: string): void;
    multipleFilesSelected?(): void;
}
declare const FileInput: React.ComponentType<Pick<any, string | number | symbol> & ReactFela.FelaWithStylesInjectedProps<Pick<any, string | number | symbol>, {
    rule: unknown;
}, any>>;
export { IFile, IFileInputProps, FileInput };

import { DataSetRecord } from "./Dataset/CustomControlDataSetInterfaces";
export declare type CreateCommandManager = (context: CommandingContext) => Promise<CommandManager>;
export interface CommandManager {
    getCommands(): Promise<ICommand[]>;
    dispose(): void;
}
interface ICommandContextBase {
    onExternalContextChange: () => void;
}
export interface IGridContext extends ICommandContextBase {
    type: "HomePageGrid";
    provider: IDatasetProvider;
}
export declare type CommandingContext = IGridContext;
export interface IDatasetProvider {
    getEntityName(): string;
    getSelectedRecordIds(): string[];
    getRecords(): Record<string, DataSetRecord>;
    getRecordCount(): number;
    refresh(): void;
}
interface CommandControlBase {
    controlType: "Button" | "FlyoutAnchor" | "SplitButton";
    controlId: string;
    commandId: string;
    label: string;
    tooltip: string;
    icon: string;
    enabled: boolean;
    visible: boolean;
    isEntityCommand: boolean;
}
interface ExecutableCommand {
    execute(): Promise<void>;
}
interface MenuCommand {
    getChildCommands(): Promise<ISubCommand[]>;
}
interface ButtonControl extends CommandControlBase, ExecutableCommand {
    controlType: "Button";
}
interface FlyoutControl extends CommandControlBase, MenuCommand {
    controlType: "FlyoutAnchor";
}
interface SplitButtonControl extends CommandControlBase, ExecutableCommand, MenuCommand {
    controlType: "SplitButton";
}
export declare type ISubCommand = ButtonControl | FlyoutControl;
export declare type ICommand = ButtonControl | FlyoutControl | SplitButtonControl;
export {};

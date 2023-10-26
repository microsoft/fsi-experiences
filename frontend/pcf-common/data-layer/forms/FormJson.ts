interface FormList<T> {
    $values: T[];
}
interface FormCellParameter {
    Name: string;
    Value: string;
}
interface FormCellControl {
    DataFieldName: string;
    Disabled: boolean;
    Parameters: FormList<FormCellParameter>;
}
interface FormCell {
    Control: FormCellControl;
}
interface FormRow {
    Visible: boolean;
    Cells: FormList<FormCell>;
}
interface FormSection {
    Rows: FormList<FormRow>;
}
interface FormColumn {
    Sections: FormList<FormSection>;
}
interface FormTab {
    Columns: FormList<FormColumn>;
}

export interface CrmFormJson {
    FormId: string;
    Tabs: FormList<FormTab>;
}

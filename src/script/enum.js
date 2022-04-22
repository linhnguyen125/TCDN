const Enum = {
    StatusCode: {
        OK: 200,
        Created: 201,
        BadRequest: 400,
    },
    DialogCode: {
        Success: 1,
        Info: 2,
        Warning: 3,
        Error: 4,
        Delete: 5,
        Edit: 6
    },
    FormatDate: {
        1: "YY-MM-DD",
        2: "DD/MM/YYYY"
    },
    Datepicker: {
        Format_String: "dd/MM/yyyy",
        Format_String_v2: "DD/MM/YYYY",
    },
    FormMode: {
        Create: 1,
        Update: 2,
        Delete: 3,
        MultiDelete: 4,
        View: 5,
    },
    ToastType: {
        Success: "success",
    },
    TypeOfTableEditor: {
        Input: 0,
        Text: 1,
        CheckBox: 2,
        Combobox: 3,
    }
}
export default Enum;
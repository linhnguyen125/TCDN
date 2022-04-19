import Enum from "@/script/enum";

/**
 * Hàm format ngày tháng năm sinh
 * @param dateOfBirth
 * @param type - định dạng format (default = 0 - [dd/mm/yyyy], 1 - [yyyy-mm-dd])
 * @returns {string|Date}
 * @since 05/03/2022
 * @author Nguyễn Văn Linh
 */
function formatDateOfBirth(dateOfBirth, type = Enum.FormatDate["2"]) {
    if (dateOfBirth) {
        let dob = new Date(dateOfBirth);
        let date = dob.getDate();
        let month = dob.getMonth() + 1;
        let year = dob.getFullYear();
        date = date < 10 ? `0${date}` : date;
        month = month < 10 ? `0${month}` : month;
        if (type === Enum.FormatDate["2"]) {
            dob = `${date}/${month}/${year}`;
            return dob;
        } else if (type === Enum.FormatDate["1"]) {
            dob = `${year}-${month}-${date}`;
            return dob;
        }
    }
    return undefined;
}

function setTimeZone(date) {
    let newDate = date;
    newDate.setTime(newDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    return newDate.toISOString();
}

export {formatDateOfBirth, setTimeZone}
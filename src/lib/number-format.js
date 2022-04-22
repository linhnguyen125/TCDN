function formatCurrencyToSave(money) {
    try {
        if (money) {
            //bỏ hết dấu '.'
            money = money.replaceAll(".", "");
            //thay dấu ',' bằng dấu '.' để lấy phần thập phân
            money = money.replaceAll(",", ".");
            //convert về dạng số
            money = Number(money);
            return money;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(error);
    }
}

export {formatCurrencyToSave}
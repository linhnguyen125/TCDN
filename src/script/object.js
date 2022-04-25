const payment_term_header = [
    {
        name: "Mã điều khoản thanh toán",
        key: "payment_term_code",
        col_width: 300,
        resize: false
    },
    {
        name: "Tên điều khoản thanh toán",
        key: "payment_term_name",
        col_width: 300,
        resize: false
    },
]

const payment_term = [
    {
        payment_term_name: "Điều khoản 1",
        payment_term_code: "ĐK1",
    },
    {
        payment_term_name: "Điều khoản 2",
        payment_term_code: "ĐK2"
    }
]

const pay_account_header = [
    {
        name: "Số tài khoản",
        key: "pay_account_number",
        col_width: 150,
        resize: false
    },
    {
        name: "Tên tài khoản",
        key: "pay_account_name",
        col_width: 300,
        resize: false
    },
]

const payment_display = [
    {key: 'description', name: 'Diễn giải', col_width: 185, isShow: true, type: 0},
    {
        key: 'debit_account',
        name: 'TK Nợ',
        col_width: 100,
        isShow: true,
        data: "accounts",
        header: "account_header",
        label: "account_number",
        value: "account_number",
        type: 3,
        required: true,
        errorTitle: "Tài khoản nợ không được để trống"
    },
    {
        key: 'credit_account',
        name: 'TK Có',
        col_width: 100,
        isShow: true,
        data: "accounts",
        header: "account_header",
        label: "account_number",
        value: "account_number",
        type: 3,
        required: true,
        errorTitle: "Tài khoản có không được để trống"
    },
    {
        key: 'amount_oc',
        name: 'Số tiền',
        col_width: 150,
        isShow: true,
        type: 0,
        objectType: 'number',
        required: true,
        errorTitle: "Số tiền không được để trống"
    },
    {key: 'amount', name: 'Quy đổi', col_width: 107, isShow: false, type: 1},
    {key: 'cash_out_exchange_rate_finance', name: 'Tỷ giá xuất quỹ', col_width: 150, isShow: false, type: 1},
    {key: 'cash_out_amount_finance', name: 'Quy đổi theo TGXQ', col_width: 149, isShow: false, type: 1},
    {key: 'cash_out_diff_amount_finance', name: 'Chênh lệch', col_width: 150, isShow: false, type: 1},
    {key: 'cash_out_diff_account_number_finance', name: 'TK xử lý chênh lệch', col_width: 180, isShow: false, type: 1},
    {key: 'business_type', name: 'Nghiệp vụ', col_width: 250, isShow: false, type: 1},
    {
        key: 'account_object_id',
        name: 'Đối tượng',
        col_width: 150,
        isShow: true,
        data: "account_objects",
        header: "account_object_header",
        label: "account_object_code",
        value: "account_object_id",
        type: 3
    },
    {key: 'account_object_name', name: 'Tên đối tượng', col_width: 250, isShow: true, type: 1},
    {key: 'expense_item_id', name: 'Khoản mục CP', col_width: 151, isShow: false, type: 1},
    {key: 'loan_agreement_refid', name: 'Khế ước vay', col_width: 150, isShow: false, type: 1},
    {key: 'expense_item_name', name: 'Tên khoản mục CP', col_width: 250, isShow: false, type: 1},
    {key: 'bank_account_id', name: 'TK ngân hàng', col_width: 200, isShow: false, type: 1},
    {key: 'organization_unit_id', name: 'Đơn vị', col_width: 150, isShow: false, type: 1},
    {key: 'organization_unit_name', name: 'Tên đơn vị', col_width: 150, isShow: false, type: 1},
    {key: 'job_id', name: 'Đối tượng THCP', col_width: 150, isShow: false, type: 1},
    {key: 'job_name', name: 'Tên đối tượng THCP', col_width: 250, isShow: false, type: 1},
    {key: 'project_work_id', name: 'Công trình', col_width: 150, isShow: false, type: 1},
    {key: 'project_work_name', name: 'Tên công trình', col_width: 150, isShow: false, type: 1},
    {key: 'order_id', name: 'Đơn đặt hàng', col_width: 150, isShow: false, type: 1},
    {key: 'contract_id', name: 'Hợp đồng bán', col_width: 150, isShow: false, type: 1},
    {key: 'pu_order_refid', name: 'Đơn mua hàng', col_width: 150, isShow: false, type: 1},
    {key: 'pu_contract_id', name: 'Hợp đồng mua', col_width: 150, isShow: false, type: 1},
    {key: 'budget_item_id', name: 'Mục thu/chi', col_width: 150, isShow: false, type: 1},
    {key: 'budget_item_name', name: 'Tên mục thu/chi', col_width: 150, isShow: false, type: 1},
    {key: 'list_item_id', name: 'Mã thống kê', col_width: 150, isShow: false, type: 1},
    {key: 'list_item_name', name: 'Tên mã thống kê', col_width: 150, isShow: false, type: 1},
    {key: 'un_resonable_cost', name: 'CP không hợp lý', col_width: 150, isShow: false, type: 1},
]

const header_account_object = [
    {name: 'Đối tượng', key: 'account_object_code', isShow: true, col_width: '150'},
    {name: 'Tên đối tượng', key: 'account_object_name', col_width: '200', isShow: true},
    {name: 'Địa chỉ', key: 'address', isShow: true, col_width: '300'},
    {name: 'Điện thoại', key: 'phone_number', isShow: true, col_width: '100', theadClass: ''},
]

const header_employee = [
    {name: "Mã nhân viên", key: "employee_code", col_width: 200, resize: false},
    {name: "Tên nhân viên", key: "employee_name", col_width: 300, resize: false},
]

const header_account = [
    {name: "Số tài khoản", key: "account_number", col_width: 200, resize: false},
    {name: "Tên tài khoản", key: "account_name", col_width: 300, resize: false},
]

const payment_template = [
    {name: 'Ngày hoạch toán', key: 'posted_date', isShow: true, col_width: '', theadClass: 'text-align-center mw-10'},
    {name: 'Ngày chứng từ', key: 'refdate', isShow: false, col_width: '', theadClass: 'text-align-center mw-10'},
    {
        name: 'Số chứng từ',
        key: 'document_included',
        col_width: '150',
        isShow: true,
        theadClass: 'text-align-right mw-10'
    },
    {name: 'Diễn giải', key: 'journal_memo', isShow: true, col_width: '400', theadClass: 'mw-20'},
    {name: 'Số tiền', key: 'total_amount', isShow: true, col_width: '150', theadClass: 'mw-10 text-align-right'},
    {name: 'Mã đối tượng', key: 'account_object_code', isShow: true, col_width: '', theadClass: ''},
    {name: 'Đối tượng', key: 'account_object_name', isShow: true, col_width: '300', theadClass: ''},
    {name: 'Người nhận/Người nộp', key: 'account_object_contact_name', isShow: true, col_width: '', theadClass: ''},
    {name: 'Địa chỉ', key: 'account_object_address', isShow: true, col_width: '400', theadClass: ''},
    {name: 'Nhân viên', key: 'employee_name', isShow: true, col_width: '200', theadClass: 'mw-20'},
    {name: 'Lý do thu chi', key: 'journal_memo', isShow: true, col_width: '400', theadClass: 'mw-10'},
    {name: 'Loại chứng từ', key: 'payment_type', isShow: false, col_width: '100', theadClass: ''},
    {name: 'Hoạch toán gộp nhiều hóa đơn', key: 'payment_type', isShow: false, col_width: '', theadClass: 'mw-20'},
]

const pay_account = [
    {
        pay_account_number: "331",
        pay_account_name: "Phải trả cho người bán"
    },
    {
        pay_account_number: "3331",
        pay_account_name: "Thuế giá trị gia tăng phải nộp"
    },
    {
        pay_account_number: "3332",
        pay_account_name: "Thuế tiêu thụ đặc biệt"
    },
    {
        pay_account_number: "3333",
        pay_account_name: "Thuế xuất, nhập khẩu"
    },
    {
        pay_account_number: "3334",
        pay_account_name: "Thuế thu nhập doanh nghiệp"
    },
    {
        pay_account_number: "3335",
        pay_account_name: "Thuế thu nhập cá nhân"
    },
    {
        pay_account_number: "3336",
        pay_account_name: "Thuế tài nguyên"
    },
    {
        pay_account_number: "3337",
        pay_account_name: "Thuế nhà đất, tiền thuê đất"
    },
]

const account_object_group_id = [
    {label: "MISA JSC", value: "misajsc"},
    {label: "Thang Long", value: "thanglong"},
    {label: "Hung Thinh", value: "hungthinh"},
    {label: "Hello", value: "hello"},
    {label: "VinGroup", value: "vingroup"},
]

export {
    payment_term_header,
    payment_term,
    pay_account_header,
    pay_account,
    payment_display,
    header_account_object,
    header_employee,
    header_account,
    account_object_group_id
}
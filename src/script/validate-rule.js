const ValidateRule = {
    Employee: {
        MaxLength: {
            EmployeeCode: 20,
            FullName: 100,
            Email: 100,
            PhoneNumber: 50,
            PositionName: 50,
            IdentityNumber: 50,
            IdentityPlace: 255,
            TaxCode: 20,
            Address: 255,
            LandLine: 50,
            BankAccount: 50,
            BankName: 255,
            BankBranch: 255
        }
    }
}

export default ValidateRule;
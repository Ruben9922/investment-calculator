export type MortgageYearData = {
    year: number;
    capital: number;
    interest: number;
    outstandingValue: number;
    repaid: number;
    overpaymentFees: number;
};

export type MortgagesFormDataKeys =
    | "borrowedAmountString"
    | "yearsString"
    | "monthlyRepaymentString"
    | "monthlyOverpaymentString"
    | "interestRateString"
    | "overpaymentLimitString"
    | "overpaymentFeeString";
export type MortgagesFormData = Record<MortgagesFormDataKeys, string>;

export type MortgagesInputs = {
    borrowedAmount: number;
    years: number;
    monthlyRepayment: number;
    monthlyOverpayment: number;
    interestRate: number;
    overpaymentLimit: number;
    overpaymentFee: number;
};

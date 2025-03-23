export type MortgageYearData = {
    year: number;
    capital: number;
    interest: number;
    interestRate: number;
    outstandingValue: number;
    repaid: number;
    overpaymentFees: number;
};

export type MortgagesFormData = {
    borrowedAmountString: string;
    yearsString: string;
    monthlyRepaymentString: string;
    monthlyOverpaymentString: string;
    initialInterestRateString: string;
    initialInterestRateYearsString: string;
    subsequentInterestRateString: string;
    overpaymentLimitString: string;
    overpaymentFeeString: string;
};

export type MortgagesInputs = {
    borrowedAmount: number;
    years: number;
    monthlyRepayment: number;
    monthlyOverpayment: number;
    initialInterestRate: number;
    initialInterestRateYears: number;
    subsequentInterestRate: number;
    overpaymentLimit: number;
    overpaymentFee: number;
};

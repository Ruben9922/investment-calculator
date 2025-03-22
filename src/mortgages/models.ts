export type MortgageYearData = {
    year: number;
    capital: number;
    interest: number;
    interestRate: number;
    outstandingValue: number;
    repaid: number;
    overpaymentFees: number;
};

export type MortgageFormData = {
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

export type InvestmentYearData = {
    year: number;
    principal: number;
    profit: number;
    totalValue: number;
};

export type InvestmentsFormData = {
    initialAmountString: string;
    monthlyAmountString: string;
    yearlyAmountString: string;
    growthString: string;
    yearCountString: string;
};

export type InvestmentsInputs = {
    initialAmount: number;
    monthlyAmount: number;
    yearlyAmount: number;
    growth: number;
    yearCount: number;
};

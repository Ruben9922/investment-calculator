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

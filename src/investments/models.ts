export type InvestmentYearData = {
    year: number;
    principal: number;
    profit: number;
    totalValue: number;
};

export type InvestmentsFormDataKeys =
    | "initialAmountString"
    | "monthlyAmountString"
    | "yearlyAmountString"
    | "growthString"
    | "yearCountString";
export type InvestmentsFormData = Record<InvestmentsFormDataKeys, string>;

export type InvestmentsInputs = {
    initialAmount: number;
    monthlyAmount: number;
    yearlyAmount: number;
    growth: number;
    yearCount: number;
};

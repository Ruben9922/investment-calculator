import {Container, VStack} from "@chakra-ui/react";
import {useState} from 'react'
import Form from "./Form.tsx";
import Table from "./Table.tsx";

function calculate(initialAmount: number, recurringAmount: number, growth: number, yearCount: number): number[] {
    const multiplier = 1 + growth;
    const monthlyMultiplier = multiplier ** (1 / 12);

    const valuesByYear: number[] = [];
    valuesByYear.push(initialAmount);
    for (let i = 1; i <= yearCount; i++) {
        let value = valuesByYear[i - 1];
        for (let j = 0; j < 12; j++) {
            value += recurringAmount;
            value *= monthlyMultiplier;
        }
        valuesByYear.push(value);
    }
    return valuesByYear;
}

function App() {
    const [initialAmountString, setInitialAmountString] = useState("20000");
    const [recurringAmountString, setRecurringAmountString] = useState("500");
    const [growthString, setGrowthString] = useState("10");
    const [yearCountString, setYearCountString] = useState("50");

    const initialAmount = parseFloat(initialAmountString);
    const recurringAmount = parseFloat(recurringAmountString);
    const growth = parseFloat(growthString) / 100;
    const yearCount = parseInt(yearCountString);
    const valuesByYear = calculate(initialAmount, recurringAmount, growth, yearCount);

    return (
        <Container maxWidth="container.md" padding={10}>
            <VStack gap={10} alignItems="stretch">
                <Form
                    initialAmountString={initialAmountString}
                    recurringAmountString={recurringAmountString}
                    growthString={growthString}
                    yearCountString={yearCountString}
                    setInitialAmountString={setInitialAmountString}
                    setRecurringAmountString={setRecurringAmountString}
                    setGrowthString={setGrowthString}
                    setYearCountString={setYearCountString}
                />

                <Table valuesByYear={valuesByYear} />
            </VStack>
        </Container>
    )
}

export default App

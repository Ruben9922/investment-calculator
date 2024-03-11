import {FormControl, FormLabel, Grid, Input} from "@chakra-ui/react";
import {NumericFormat} from "react-number-format";

type FormProps = {
    initialAmountString: string;
    recurringAmountString: string;
    growthString: string;
    yearCountString: string;
    setInitialAmountString: (updatedInitialAmountString: string) => void;
    setRecurringAmountString: (updatedRecurringAmountString: string) => void;
    setGrowthString: (updatedGrowthString: string) => void;
    setYearCountString: (updatedYearCountString: string) => void;
};

// function NumberFormatCustom(props) {
//     const {inputRef, onChange, ...other} = props;
//
//     return (
//         <NumericFormat
//             {...other}
//             getInputRef={inputRef}
//             onValueChange={(values) => {
//                 onChange({
//                     target: {
//                         name: props.name,
//                         value: values.value,
//                     },
//                 });
//             }}
//             thousandSeparator
//             valueIsNumericString
//             decimalScale={0}
//         />
//     );
// }

function CurrencyFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            decimalScale={0}
            prefix="$"
        />
    );
}

function PercentFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            decimalScale={0}
            suffix="%"
        />
    );
}

function Form({
    initialAmountString,
    recurringAmountString,
    growthString,
    yearCountString,
    setInitialAmountString,
    setRecurringAmountString,
    setGrowthString,
    setYearCountString,
}: FormProps) {
    // const format = (value: number) => isNaN(value)? "": value.toLocaleString(undefined, {
    //     style:"currency",
    //     currency: "USD",
    //     currencyDisplay: "narrowSymbol",
    //     maximumFractionDigits: 0,
    // });

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <FormControl>
                <FormLabel>Initial amount</FormLabel>
                <Input as={CurrencyFormatCustom} value={initialAmountString} onChange={event => setInitialAmountString(event.target.value)} />
            </FormControl>

            <FormControl>
                <FormLabel>Monthly amount</FormLabel>
                <Input as={CurrencyFormatCustom} value={recurringAmountString} onChange={event => setRecurringAmountString(event.target.value)} />
            </FormControl>

            <FormControl>
                <FormLabel>Annual growth</FormLabel>
                <Input as={PercentFormatCustom} value={growthString} onChange={event => setGrowthString(event.target.value)} />
            </FormControl>

            <FormControl>
                <FormLabel>Years</FormLabel>
                <Input value={yearCountString} onChange={event => setYearCountString(event.target.value)} />
            </FormControl>
        </Grid>
    );
}

export default Form;

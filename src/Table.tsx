import {Table as ChakraUiTable, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {NumericFormat} from "react-number-format";

type TableProps = {
    valuesByYear: number[];
};

function Table({ valuesByYear }: TableProps) {
    return (
        <TableContainer>
            <ChakraUiTable variant="simple" size="sm">
                {/*<TableCaption>Imperial to metric conversion factors</TableCaption>*/}
                <Thead>
                    <Tr>
                        <Th>Year</Th>
                        <Th isNumeric>Value ($)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {valuesByYear.map((value, index) => (
                        <Tr key={index}>
                            <Td>{`Year ${index}`}</Td>
                            <Td isNumeric>
                                <NumericFormat
                                    value={value}
                                    displayType="text"
                                    thousandSeparator
                                    decimalScale={0}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>Year</Th>
                        <Th isNumeric>Value ($)</Th>
                    </Tr>
                </Tfoot>
            </ChakraUiTable>
        </TableContainer>
    );
}

export default Table;

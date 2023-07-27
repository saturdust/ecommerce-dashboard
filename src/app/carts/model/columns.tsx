import { Box } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import formatCurrency from "@/utils/format-currency";

import type { Cart } from "./carts/types";

const columnHelper = createColumnHelper<Cart>();

const cartsColumns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    enableColumnFilter: false,
  }),
  columnHelper.accessor("total", {
    header: () => "Total",
    cell: (info) => formatCurrency(info.getValue() || 0),
  }),
  columnHelper.accessor("totalProducts", {
    header: "Total Product",
    cell: (info) => (
      <Box>
        {info.getValue() && info.getValue()! > 1
          ? `${info.getValue()} Products`
          : `${info.getValue()} Product`}
      </Box>
    ),
  }),
  columnHelper.accessor("totalQuantity", {
    header: "Total Quantity",
  }),
];

export default cartsColumns;

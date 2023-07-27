import { Box } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import formatCurrency from "@/utils/format-currency";
import transformToTitleCase from "@/utils/transform-to-title-case";

import type { Product } from "./products/types";

const columnHelper = createColumnHelper<Product>();

const productsColumns = [
  columnHelper.accessor("title", {
    header: () => "Product Name",
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),
  columnHelper.accessor("brand", {
    header: () => "Brand",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price (USD)",
    cell: (info) => (
      <Box textAlign="right">
        {info.getValue()
          ? formatCurrency(info.getValue() || 0)
          : "Out of stock"}
      </Box>
    ),
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    cell: (info) => <Box textAlign="right">{info.getValue()}</Box>,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => transformToTitleCase(info.getValue() || ""),
    enableColumnFilter: false,
  }),
];

export default productsColumns;

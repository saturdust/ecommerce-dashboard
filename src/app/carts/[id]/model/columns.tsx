import { createColumnHelper } from "@tanstack/react-table";

import formatCurrency from "@/utils/format-currency";

import type { Product } from "./cart-details/types";

const columnHelper = createColumnHelper<Product>();

const productsColumns = [
  columnHelper.accessor("title", {
    header: () => "Product Name",
  }),
  columnHelper.accessor("price", {
    header: () => "Price (USD)",
    cell: (info) => formatCurrency(info.getValue() || 0),
  }),
];

export default productsColumns;

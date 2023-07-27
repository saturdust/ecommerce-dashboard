"use client";

import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import Filter from "@/components/Filter";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment } from "react";
import productsColumns from "./model/columns";
import useCartDetails from "./repository/cart/use-cart-details";
import formatCurrency from "@/utils/format-currency";
import useGetUser from "./repository/user/user-get-user";

interface CartsProps {
  params: { id: string };
}
export default function Carts(props: CartsProps) {
  const { params } = props;

  const { data, loading } = useCartDetails({
    variables: {
      cartID: parseInt(params.id || "0", 10),
    },
  });

  const { data: userData } = useGetUser({
    variables: { userID: data?.userId || 0 },
  });

  const table = useReactTable({
    data: data?.products || [],
    columns: productsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box p={4} bg="white" borderRadius="lg">
      <Heading size="md" noOfLines={1} mb={4}>
        Cart {params.id}
      </Heading>
      <Heading size="sm" noOfLines={1}>
        Details
      </Heading>
      <Box bg="gray.50" p={4} my={4}>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>User: {userData?.firstName}</GridItem>
          <GridItem># of Items: {data?.totalProducts}</GridItem>
          <GridItem>Added On: -</GridItem>
          <GridItem>Total Ammount: {formatCurrency(data?.total || 0)}</GridItem>
        </Grid>
      </Box>
      <Heading size="sm" noOfLines={1} mb={4}>
        Products
      </Heading>
      <TableContainer
        border="1px solid"
        borderColor="gray.200"
        borderRadius={12}
      >
        <Box overflowY="auto" height="25dvh">
          <Table
            variant="simple"
            size="sm"
            height={loading || !data?.products?.length ? "inherit" : ""}
          >
            <Thead position="sticky" top={0} background="white">
              {table.getHeaderGroups().map((hg) => (
                <Tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <Th key={header.id} textTransform="capitalize">
                      {header.isPlaceholder ? null : (
                        <Box
                          {...{
                            cursor: header.column.getCanSort() ? "pointer" : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {{
                            asc: "🔼 ",
                            desc: "🔽 ",
                          }[header.column.getIsSorted() as string] ?? null}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            <Filter column={header.column} table={table} />
                          ) : null}
                        </Box>
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={6}>
                    <Center>
                      <Spinner color="red.500" size="lg" />
                    </Center>
                  </Td>
                </Tr>
              ) : (
                <Fragment>
                  {data?.products?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <Tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        ))}
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={6}>
                        <Center>No Data.</Center>
                      </Td>
                    </Tr>
                  )}
                </Fragment>
              )}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
}

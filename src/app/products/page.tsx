"use client";
import { Fragment, useMemo, useState } from "react";

import {
  Box,
  Center,
  Divider,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";

import Header from "./components/Header";
import AuxProvider from "./context/aux-context";
import useEmitter from "./hooks/useEmitter";
import productsColumns from "./model/columns";
import useGetProduct from "./repository/products/use-products";
import useEventFilter from "./usecase/use-event-filter";

export default function Products() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const emitter = useEmitter();

  const { keyword, category } = useEventFilter({ emitter });

  const { data, loading } = useGetProduct({
    variables: { q: keyword, limit: pageSize, skip: pageIndex * 10, category },
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data.products,
    columns: productsColumns,
    pageCount: data.total / data.limit,
    state: {
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <AuxProvider emitter={emitter}>
      <Box p={4} bg="white" borderRadius="lg">
        <Header />
        <TableContainer
          border="1px solid"
          borderColor="gray.200"
          borderRadius={12}
        >
          <Box overflowY="auto" height="50dvh">
            <Table
              variant="simple"
              size="md"
              height={loading || !data.products.length ? "inherit" : ""}
            >
              <Thead position="sticky" top={0} background="white">
                {table.getHeaderGroups().map((hg) => (
                  <Tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <Th key={header.id} textTransform="capitalize">
                        {header.isPlaceholder ? null : (
                          <Box
                            {...{
                              cursor: header.column.getCanSort()
                                ? "pointer"
                                : "",
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
                    {data.products.length ? (
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
          <Divider />
          <Pagination table={table} />
        </TableContainer>
      </Box>
    </AuxProvider>
  );
}

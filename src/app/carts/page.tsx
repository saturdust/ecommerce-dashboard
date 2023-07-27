"use client";
import { Fragment } from "react";

import {
  Box,
  Center,
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
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Filter from "@/components/Filter";

import cartsColumns from "./model/columns";
import useGetCarts from "./repository/carts/use-carts";
import { useRouter } from "next/navigation";

export default function Carts() {
  const { data, loading } = useGetCarts();
  const router = useRouter();

  const table = useReactTable({
    data: data.carts,
    columns: cartsColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box p={4} bg="white" borderRadius="lg">
      <Heading size="md" noOfLines={1} mb={4}>
        Cart List
      </Heading>
      <TableContainer
        border="1px solid"
        borderColor="gray.200"
        borderRadius={12}
      >
        <Box overflowY="auto" height="50dvh">
          <Table
            variant="simple"
            size="md"
            height={loading || !data.carts.length ? "inherit" : ""}
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
                  {data.carts.length ? (
                    table.getRowModel().rows.map((row) => {
                      return (
                        <Tr
                          key={row.id}
                          _hover={{ cursor: "pointer" }}
                          onClick={() => router.push(`/carts/${row.id}`)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <Td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          ))}
                        </Tr>
                      );
                    })
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

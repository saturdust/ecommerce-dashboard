import type { FC } from "react";
import React, { useState } from "react";

import { Flex, Heading, Input, Select } from "@chakra-ui/react";

import transformToTitleCase from "@/utils/transform-to-title-case";

import { useAuxContext } from "../context/aux-context";
import useGetCategories from "../repository/categories/use-categories";

const Header: FC = () => {
  const { emitter } = useAuxContext();
  const { data: categories } = useGetCategories();

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleOnSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKeyword("");
    setCategory(e.target.value);
    emitter.emit("@filter/select-category", e.target.value);
  };

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory("");
    setKeyword(e.target.value);
    emitter.emit("@search", e.target.value);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Heading size="md" noOfLines={1}>
        Product List
      </Heading>
      <Flex alignItems="center" gap={2}>
        <Select
          placeholder="All Categories"
          size="sm"
          w="auto"
          value={category}
          onChange={handleOnSelectCategory}
        >
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {transformToTitleCase(category)}
              </option>
            );
          })}
        </Select>
        <Input
          placeholder="Search Product"
          size="sm"
          w="auto"
          value={keyword}
          onChange={handleOnSearch}
        />
      </Flex>
    </Flex>
  );
};

export default Header;

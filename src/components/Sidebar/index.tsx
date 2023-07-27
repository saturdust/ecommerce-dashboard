import { LinkItems } from "@/models/sidebar";
import { Box, BoxProps, CloseButton, Flex, Text } from "@chakra-ui/react";
import type { FC } from "react";
import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent: FC<SidebarProps> = (props) => {
  const { onClose, ...rest } = props;

  return (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center" h="20" mx="8">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          E-commerce Admin
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;

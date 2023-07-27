"use client";
import type { ReactNode } from "react";

import SidebarContent from "@/components/Sidebar";
import MobileNav from "@/components/Sidebar/MobileNav";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100dvh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        display={{ base: "none", md: "block" }}
        onClose={() => onClose}
      />
      <Drawer
        isOpen={isOpen}
        size="full"
        placement="left"
        returnFocusOnClose={false}
        onClose={onClose}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;

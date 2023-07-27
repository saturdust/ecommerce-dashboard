import type { FlexProps } from "@chakra-ui/react";
import { Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import type { FC } from "react";
import { FcMenu } from "react-icons/fc";

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav: FC<MobileNavProps> = (props) => {
  const { onOpen, ...rest } = props;

  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      height={20}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...rest}
    >
      <IconButton
        aria-label="open menu"
        variant="outline"
        icon={<FcMenu />}
        onClick={onOpen}
      />
      <Text ml="8" fontFamily="monospace" fontSize="2xl" fontWeight="bold">
        E-commerce
      </Text>
    </Flex>
  );
};

export default MobileNav;

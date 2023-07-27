import { useRouter } from "next/navigation";
import type { FC, ReactNode } from "react";

import type { FlexProps } from "@chakra-ui/react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string;
  children: ReactNode;
}

const NavItem: FC<NavItemProps> = (props) => {
  const { icon, to, children, ...rest } = props;
  const router = useRouter();

  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: "cyan.400", color: "white" }}
        onClick={() => router.push(to)}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default NavItem;

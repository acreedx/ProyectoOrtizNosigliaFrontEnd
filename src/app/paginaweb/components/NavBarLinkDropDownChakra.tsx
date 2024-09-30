import React from "react";
import {
  Flex,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
interface NavBarLinkDropDownProps {
  linkName: string;
  linkUrl: string;
  subLinks?: { name: string; url: string }[];
}

const NavBarLinkDropDownChakra: React.FC<NavBarLinkDropDownProps> = ({
  linkName,
  linkUrl,
  subLinks,
}) => {
  return (
    <Box as="li" className="relative flex items-center">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="link"
          fontSize="lg"
          dropShadow={"md"}
          fontWeight={"md"}
          color="gray.700"
          transition="all 0.3s ease-in-out"
          _hover={{ color: "orange.400", textDecoration: "none" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        >
          {linkName}
        </MenuButton>

        {/* MenuList para el dropdown */}
        {subLinks && (
          <MenuList>
            {subLinks.map((subLink, index) => (
              <MenuItem
                key={index}
                as="a"
                href={subLink.url}
                px={4}
                py={2}
                fontSize="sm"
                color="black"
                transition="background-color 0.2s, color 0.2s"
                _hover={{ bg: "gray.100", color: "orange.400" }} // hover:bg-gray-100 y hover:text-orange-400
              >
                {subLink.name}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Menu>
    </Box>
  );
};
export default NavBarLinkDropDownChakra;

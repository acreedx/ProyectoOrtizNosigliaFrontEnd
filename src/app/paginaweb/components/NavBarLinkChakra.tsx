import React from "react";

import { Box, Button, Link } from "@chakra-ui/react";
interface NavBarLinkProps {
  linkName: string;
  linkUrl: string;
}

const NavBarLinkChakra: React.FC<NavBarLinkProps> = ({ linkName, linkUrl }) => {
  return (
    <Box>
      <Link
        color="gray.700"
        className="inline-block text-lg  no-underline drop-shadow-md transition duration-150 ease-in-out hover:text-orange-400 focus:shadow-none focus:outline-none"
        href={linkUrl}
        _hover={{ textDecoration: "none" }}
      >
        {linkName}
      </Link>
    </Box>
  );
};
export default NavBarLinkChakra;

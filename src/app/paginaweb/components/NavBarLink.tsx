import React from "react";
interface NavBarLinkProps {
  linkName: string;
  linkUrl: string;
}

const NavBarLink: React.FC<NavBarLinkProps> = ({ linkName, linkUrl }) => {
  return (
    <li className="flex items-center">
      <a
        href={linkUrl}
        className="inline-block text-lg text-graydark no-underline drop-shadow-md transition duration-150 ease-in-out hover:text-orange-400 focus:shadow-none focus:outline-none"
      >
        {linkName}
      </a>
    </li>
  );
};
export default NavBarLink;

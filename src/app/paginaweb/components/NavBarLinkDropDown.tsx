"use client";
interface NavBarLinkDropDownProps {
  linkName: string;
  linkUrl: string;
  subLinks?: { name: string; url: string }[];
}
import React, { useState } from "react";

export default function NavBarLinkDropDown({
  linkName,
  linkUrl,
  subLinks,
}: NavBarLinkDropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <li
      className="relative flex items-center"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <a className="inline-block text-lg text-graydark no-underline drop-shadow-md ">
        {linkName}
      </a>
      <i className="lni lni-chevron-down ml-2 inline-block no-underline"></i>
      {subLinks && (
        <div
          className={`border-gray-200 absolute left-0 top-0 z-10 mt-2 rounded-lg border bg-white  shadow-lg transition-all duration-300 ease-in-out 
          ${isDropdownOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
        >
          <ul className="py-2">
            {subLinks.map((subLink, index) => (
              <li key={index}>
                <a
                  href={subLink.url}
                  className="hover:bg-gray-100 block px-4 py-2 text-sm text-black transition-colors hover:text-orange-400"
                >
                  {subLink.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

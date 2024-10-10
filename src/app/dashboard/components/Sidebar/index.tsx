"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/app/dashboard/components/Sidebar/SidebarItem";
import ClickOutside from "@/app/dashboard/components/ClickOutside";
import useLocalStorage from "@/app/dashboard/assets/hooks/useLocalStorage";
import { menuOptions } from "../../configuration";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`shadow-gray-500/50 fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-slate-50 shadow-lg duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={78}
              height={78}
              src={"/images/logo/logo.png"}
              alt="Ortiz Nosiglia Logo"
              priority
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="absolute right-4 lg:hidden"
          >
            <ArrowLeftIcon />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 shadow-lg shadow-gray lg:mt-9 lg:px-2 ">
            {menuOptions.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;

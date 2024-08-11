"use client";
import {
  Dashboard,
  Home,
  Inventory,
  NotificationsActive,
  SvgIconComponent,
  Timeline,
  Tune,
} from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar as ReactSidebar,
  SubMenu,
} from "react-pro-sidebar";

type NavMenuItemProps = {
  label: string;
  href?: string;
  Icon?: SvgIconComponent;
};

type MenuItem = {
  group?: boolean;
  menus?: NavMenuItemProps[];
  label: string;
  href?: string;
  Icon: SvgIconComponent;
};

const NavMenuItem = ({ Icon, href, label }: NavMenuItemProps) => {
  // pathname
  const pathname = usePathname();
  const isActive = (() => {
    if (pathname === "/dashboard" && href === "dashboard") {
      return true;
    }
    return pathname === href ? true : false;
  })();

  return (
    <MenuItem
      component={<Link href={href || ""} />}
      icon={Icon && <Icon fontSize="small" />}
      className={(isActive && "!bg-primary !text-white") || ""}
    >
      <Typography>{label}</Typography>
    </MenuItem>
  );
};

export default function Sidebar() {
  // mui theme
  const theme = useTheme();
  const scColor = theme.palette.secondary.main; // secondary color
  const pmColor = theme.palette.primary.main; // primary color
  const pathname = usePathname();

  // submenu active
  const isActive = (menus: NavMenuItemProps[]) => {
    const active = menus?.find((item) => item.href === pathname);
    return Boolean(active);
  };

  // menus
  const menus: MenuItem[] = [
    { href: "/dashboard", label: "Dashboard", Icon: Dashboard },
    {
      label: "Inventory",
      Icon: Inventory,
      group: true,
      menus: [
        { href: "/dashboard/medicines", label: "List Of Medicines" },
        { href: "/dashboard/medicine-generic", label: "Medicine Generic" },
      ],
    },
    { label: "Reports", Icon: Timeline },
    { label: "Configuration", Icon: Tune },
    {
      label: "Notifications",
      Icon: NotificationsActive,
      href: "/dashboard/notifications",
    },
  ];

  return (
    <>
      <ReactSidebar
        rootStyles={{
          backgroundColor: scColor,
          borderWidth: 0,
          ["& .ps-sidebar-container"]: {
            backgroundColor: "transparent !important",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* sidebar header */}
        <div className="py-5 px-5 border-b border-primary mb-2">
          <Image
            src={"/images/logo.png"}
            width={100}
            height={70}
            alt="Logo"
            className="!w-32 h-auto"
          />
        </div>

        {/* menu wrapper */}
        <Menu
          rootStyles={{ flex: 1 }}
          menuItemStyles={{
            button: {
              color: "#f2f2f2",
              transition: "all 0.5s ease",
              paddingLeft: 7,
              paddingRight: 14,
              ":hover": { backgroundColor: pmColor },
            },
          }}
        >
          {menus.map((menu, index) =>
            menu?.group ? (
              <SubMenu
                key={index}
                label={<Typography>{menu.label}</Typography>}
                icon={<menu.Icon fontSize="small" />}
                rootStyles={{
                  ["& .ps-submenu-content"]: {
                    backgroundColor: "#000 !important",
                  },
                }}
                defaultOpen={Boolean(isActive(menu?.menus || []))}
              >
                {menu?.menus?.map((item, subIndex) => (
                  <NavMenuItem {...item} key={subIndex} />
                ))}
              </SubMenu>
            ) : (
              <NavMenuItem key={index} {...menu} />
            )
          )}
        </Menu>

        {/* sidebar footer */}
        <div className="px-4 py-4 bg-black flex justify-between items-center">
          <Typography className="!text-[#f2f2f299]">
            Developed By{" "}
            <Link href={"/"} className="underline">
              Palash
            </Link>
          </Typography>
          <Typography className="!text-[#f2f2f299]">v1.0.0</Typography>
        </div>
      </ReactSidebar>
    </>
  );
}

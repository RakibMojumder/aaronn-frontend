"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconHome, IconBriefcase, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoutButton from "../LogoutButton";

const DashboardSidebar = () => {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="size-6 flex-shrink-0" />,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <IconBriefcase className="size-6 flex-shrink-0" />,
    },
    {
      label: "Add Project",
      href: "/add-project",
      icon: <IconPlus className="size-6 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="pl-4">{open ? <Logo /> : <LogoIcon />}</div>
          <div className="mt-8 flex flex-col gap-2 pl-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
            <LogoutButton />
          </div>
        </div>
        <div>
          <SidebarLink
            className="pl-4"
            link={{
              label: "Rakib Ahmed",
              href: "#",
              icon: (
                <Image
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre uppercase"
      >
        Aaronn
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default DashboardSidebar;

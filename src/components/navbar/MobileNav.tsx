"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT ME" },
  { href: "/work", label: "MY WORKS" },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-black text-white border-gray-800"
      >
        <SheetTitle className="text-sm text-white">Menus</SheetTitle>
        <div className="flex flex-col gap-8 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors text-lg"
            >
              {link.label}
            </Link>
          ))}
          {/* <AuthButton /> */}
          {/* <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black w-full"
                  onClick={() => setIsOpen(false)}
                >
                  CONTACT
                </Button> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT ME" },
    { href: "/work", label: "MY WORKS" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white text-xl font-semibold">
            <Image src={logo} alt="logo" height={120} width={120} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-neutral-950 text-white rounded-full">
              CONTACT
            </Button>
          </div>

          {/* Mobile Navigation */}
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
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black w-full"
                  onClick={() => setIsOpen(false)}
                >
                  CONTACT
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

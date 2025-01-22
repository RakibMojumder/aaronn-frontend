import Link from "next/link";
import { Button } from "@/components/ui/button";
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { getSession } from "@/lib/auth";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about-me", label: "ABOUT ME" },
  { href: "/contact", label: "CONTACT ME" },
];

export async function NavBar() {
  const session = await getSession();

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
            {session ? (
              <Link
                href="/projects"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Button variant="outline" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Button variant="outline" className="rounded-full">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}

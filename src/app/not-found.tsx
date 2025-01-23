import Link from "next/link";
import "./globals.css";
import { Rubik } from "next/font/google";
import { Syne } from "next/font/google";

const syne = Syne({
  variable: "----font-syne",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${syne.variable} ${rubik.variable} bg-neutral-900`}>
        <div className="min-h-screen flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-primary">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-neutral-400">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-10">
              <Link
                href="/"
                className="text-sm font-semibold text-white hover:text-primary transition-colors"
              >
                <span aria-hidden="true">&larr;</span> Back to home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

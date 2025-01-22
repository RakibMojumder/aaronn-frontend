"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import logo from "../../../../public/assets/logo.svg";
import Image from "next/image";
import { useState } from "react";
import { loginAction } from "@/actions/actions";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      toast.error(result?.error);
      setIsLoading(false);
    } else {
      toast.success("Login successful");
      router.push("/projects");
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side with background image */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-orange-600 rounded-r-[50px] lg:flex">
        <div className="absolute inset-0 bg-cover bg-center">
          <div className="h-full w-full p-12 text-white">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full border-2"></div>
              <Image src={logo} alt="logo" height={120} width={120} />
            </div>

            <div className="mt-32 max-w-lg">
              <p className="text-lg font-light">Nice to see you again</p>
              <h1 className="mt-2 text-5xl font-bold tracking-tight">
                WELCOME BACK
              </h1>
              <p className="mt-4 text-sm font-light leading-relaxed opacity-80">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismed tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex w-full lg:w-1/2">
        <div className="mx-auto flex w-full max-w-md flex-col justify-center px-6 py-12">
          <div className="mb-10">
            <Button
              onClick={() => router.push("/")}
              variant="link"
              className="pl-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold text-primary">Login Account</h2>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismed tincidunt ut laoreet dolore magna
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  required
                  name="email"
                  placeholder="Email"
                  defaultValue="admin@gmail.com"
                  className="h-12 bg-gray-50"
                />
              </div>
              <div>
                <Input
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                  defaultValue="123456"
                  className="h-12 bg-gray-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground"
                >
                  Keep me signed in
                </label>
              </div>
              <Link href="#" className="text-sm text-primary hover:underline">
                Already a member?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-primary text-base font-semibold"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

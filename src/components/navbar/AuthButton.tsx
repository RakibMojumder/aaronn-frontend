import Link from "next/link";
import { Button } from "../ui/button";
import { getSession } from "@/lib/auth";

const AuthButton = async () => {
  const session = await getSession();
  return (
    <>
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
    </>
  );
};

export default AuthButton;

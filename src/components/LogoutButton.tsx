import { logoutAction } from "@/actions/actions";
import { IconLogout } from "@tabler/icons-react";

const LogoutButton = () => {
  return (
    <form
      action={logoutAction}
      className="flex items-center gap-2 pl-2 text-white hover:bg-background transition duration-150 py-2"
    >
      <IconLogout className="size-6 flex-shrink-0" />
      <button type="submit" className="text-sm font-medium">
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;

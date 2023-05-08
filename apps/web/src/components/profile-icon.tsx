import Link from "next/link";
import {usePathname} from "next/navigation";
import {AvatarIcon, ExitIcon, LockClosedIcon} from "@radix-ui/react-icons";
import {signOut} from "next-auth/react";
import {AiOutlineUserSwitch} from "react-icons/ai";

import {type Session} from "@echo-webkom/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type ProfileIconProps = {
  session: Session;
};

const ProfileIcon = ({session}: ProfileIconProps) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <AvatarIcon className="h-7 w-7" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mx-3 w-56">
        <DropdownMenuLabel>Logget inn som, {session.user.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/auth/profile">
            <AiOutlineUserSwitch className="mr-2 h-4 w-4" />
            <span>Min profil</span>
          </Link>
        </DropdownMenuItem>

        {session.user.role === "ADMIN" && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/admin">
                <LockClosedIcon className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            className="w-full"
            onClick={() =>
              void signOut({
                callbackUrl: pathname,
              })
            }
          >
            <ExitIcon className="mr-2 h-4 w-4" />
            <span>Logg ut</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileIcon;

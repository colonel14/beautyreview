"use client";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogIn, LogOut, Plus, User } from "lucide-react";
import { useCallback, useState } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function UserMenu({ currentUser }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {currentUser ? (
            <Avatar onClick={toggleOpen}>
              <AvatarImage
                src={currentUser?.image || "/images/placeholder.jpg"}
              />
            </Avatar>
          ) : (
            <User
              className="w-7 h-7 text-pink-default cursor-pointer"
              onClick={toggleOpen}
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" side="bottom">
          {currentUser ? (
            <>
              {currentUser.role == "ADMIN" ? (
                // If User is Admin
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard")}
                  className="px-2 py-3 hover:bg-neutral-100 transition font-semibold text-pink-default cursor-pointer"
                >
                  <LayoutDashboard className="mr-1 h-4 w-4" />
                  <span>dashboard</span>
                </DropdownMenuItem>
              ) : (
                // If Use is not Admin
                <>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="px-2 py-3 hover:bg-neutral-100 transition font-semibold text-pink-default cursor-pointer"
                  >
                    <User className="mr-1 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/product/new")}
                    className="px-2 py-3 hover:bg-neutral-100 transition font-semibold text-pink-default cursor-pointer"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    <span>Add Product</span>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem
                onClick={() => signOut()}
                className="px-2 py-3 hover:bg-neutral-100 transition font-semibold text-pink-default cursor-pointer"
              >
                <LogOut className="mr-1 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => loginModal.onOpen()}
                className="px-2 py-3 hover:bg-neutral-100 transition font-semibold text-pink-default cursor-pointer"
              >
                <span>Login</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => registerModal.onOpen()}
                className="px-2 py-3 hover:bg-neutral-100 transition font-semibold text-pink-default cursor-pointer"
              >
                <span> Sign Up</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

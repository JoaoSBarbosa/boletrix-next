import { useAuth } from "@/hooks/useAuth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import { LogOut, Pencil, Trash } from "lucide-react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ReactNode, useState } from "react";
import { EditUserDialog } from "@/components/pages/user/dialogs/EditUserDialog";
import { UserMenuButton } from "@/components/buttons";
import { FaUserCog } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdOutlinePayments } from "react-icons/md";
import { getFirstAndLastName } from "@/util/util";
import { DeleteUserDialog } from "../pages/user/dialogs/DeleteUserDialog";

interface UserMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onLogout?: () => void;
}

interface menuProps {
  icon: ReactNode;
  name: string;
  onClick?: () => void;
}

export const UserMenu = ({ onLogout, onEdit, onDelete }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  if (!user) return null;

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };
  const handleUserPage = () => {
    if (router.pathname === "/user") {
      router.push("/payments");
    } else {
      router.push("/user");
    }
  };

  const menuList: menuProps[] = [
    {
      icon: <Trash size={16} />,
      name: "Excluir conta",
      //  onClick: onDelete
      onClick: onDelete,
    },
    { icon: <LogOut size={16} />, name: "Sair", onClick: onLogout },
  ];

  if (user && user.roles.includes("ROLE_ADMIN")) {
    const isOnUserPage = router.pathname === "/user";
    menuList.push({
      icon: isOnUserPage ? (
        <MdOutlinePayments size={16} />
      ) : (
        <FaUserCog size={16} />
      ),
      name: isOnUserPage ? "Voltar para Pagamentos" : "Gestão Usuario",
      onClick: handleUserPage,
    });
  }

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <div
          className={
            "flex items-center gap-2 cursor-pointer text-secondaryColor"
          }
        >
          <Avatar.Root
            className={
              "bg-quaternary rounded-full  h-8 w-8 xl:h-10 xl:w-10 flex items-center justify-center font-bold uppercase"
            }
          >
            <Avatar.Fallback delayMs={600}>
              {getInitials(user?.name)}
            </Avatar.Fallback>
          </Avatar.Root>
          <span className="text-sm font-medium">
            {getFirstAndLastName(user.name)}
          </span>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="min-w-[180px] bg-white text-gray-900 shadow-md rounded-md p-1 border border-gray-100 z-40"
        sideOffset={5}
      >
        <div className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
          <EditUserDialog />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
          <DeleteUserDialog />
        </div>
        <MenuItem
          icon={<LogOut size={16} />}
          name={"Sair"}
          onClick={onLogout}
        />

        {/* {menuList.map((menu) => (
          <MenuItem
            icon={menu.icon}
            name={menu.name}
            key={menu.name}
            onClick={menu.onClick}
          />
        ))} */}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export const MenuItem = ({ onClick, icon, name }: menuProps) => {
  return (
    <DropdownMenu.Item
      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <UserMenuButton name={name} icon={icon} onClick={onClick} />
    </DropdownMenu.Item>
  );
};

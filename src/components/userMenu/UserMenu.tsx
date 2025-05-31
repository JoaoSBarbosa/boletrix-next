import {useAuth} from "@/hooks/useAuth";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import {LogOut, Pencil, Trash} from "lucide-react";
import {RiArrowDownWideFill} from "react-icons/ri";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {ReactNode, useState} from "react";
import {EditUserDialog} from "@/components/pages/user/dialogs/EditUserDialog";
import {UserMenuButton} from "@/components/buttons";

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

export const UserMenu = ({onLogout, onEdit, onDelete}: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const {user} = useAuth();
    if (!user) return null;


    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        const first = parts[0]?.[0] || "";
        const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
        return (first + last).toUpperCase();
    }
    const menuList: menuProps[] = [
        // {icon: <Pencil size={16} />, name: "Editar perfil", onClick: onEdit },
        {icon: <Trash size={16}/>, name: "Excluir conta", onClick: onDelete},
        {icon: <LogOut size={16}/>, name: "Sair", onClick: onLogout},
    ]
    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu.Trigger asChild>
                <div className={"flex items-center gap-2 cursor-pointer text-secondaryColor"}>
                    <Avatar.Root
                        className={"bg-quaternary rounded-full  h-8 w-8 xl:h-10 xl:w-10 flex items-center justify-center font-bold uppercase"}>
                        <Avatar.Fallback delayMs={600}>
                            {getInitials(user?.name)}
                        </Avatar.Fallback>
                    </Avatar.Root>
                    <span className="text-sm font-medium">{user.name}</span>
                    {/*<span className="text-sm font-medium text-gray-200">{user.name}</span>*/}
                    {/*<IoIosArrowDown />*/}
                    {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}

                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                className="min-w-[180px] bg-white text-gray-900 shadow-md rounded-md p-1 border border-gray-100 z-40"
                sideOffset={5}
            >
                {/*<DropdownMenu.Item*/}
                {/*    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"*/}
                {/*>*/}
                {/*</DropdownMenu.Item>*/}

                <div className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                    <EditUserDialog/>

                </div>
                {menuList.map((menu) => (
                    <MenuItem icon={menu.icon} name={menu.name} key={menu.name} onClick={menu.onClick}/>
                ))}


                {/*<DropdownMenu.Item*/}
                {/*    className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"*/}
                {/*    onClick={onDelete}*/}
                {/*>*/}
                {/*    <Trash size={16}/> Excluir conta*/}
                {/*</DropdownMenu.Item>*/}

                {/*<DropdownMenu.Separator className="h-px bg-gray-200 my-1"/>*/}

                {/*<DropdownMenu.Item*/}
                {/*    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"*/}
                {/*    onClick={onLogout}*/}
                {/*>*/}
                {/*    <LogOut size={16}/> Sair*/}
                {/*</DropdownMenu.Item>*/}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}


export const MenuItem = ({onClick, icon, name}: menuProps) => {
    return (
        <DropdownMenu.Item
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={onClick}
        >
            {/*<span className={"flex items-center gap-2"}>*/}
            {/*    { icon }*/}
            {/*    {name}*/}
            {/*</span>*/}
            <UserMenuButton name={name} icon={icon} onClick={onClick}/>

            {/*<Pencil size={16}/> */}
        </DropdownMenu.Item>
    )
}
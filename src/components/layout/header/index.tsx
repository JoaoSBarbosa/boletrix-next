import {useAuth} from "@/hooks/useAuth";
import {UserMenu} from "@/components/userMenu/UserMenu";

export const Header = () => {
    const {user} = useAuth();

    return (
        <header className="flex items-center justify-between w-full px-6 py-4 bg-gray-800 shadow-md">
            <figure className="flex items-center gap-2">
                <img
                    src="/img/boletrix_logo_1.png"
                    alt="Boletrix Logo"
                    className="h-10 w-auto"
                />
            </figure>

            <UserMenu/>
            {/*<div className="flex items-center gap-2">*/}
            {/*    <span className="text-sm text-gray-700">*/}
            {/*        {user?.name || "Usuário"}*/}
            {/*    </span>*/}
            {/*    /!* Ícone de usuário opcional *!/*/}
            {/*    <img*/}
            {/*        src="/img/default_user.png"*/}
            {/*        alt="User avatar"*/}
            {/*        className="h-8 w-8 rounded-full border border-gray-300"*/}
            {/*    />*/}
            {/*</div>*/}
        </header>
    );
};

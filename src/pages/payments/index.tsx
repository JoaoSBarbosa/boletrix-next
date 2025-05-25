import {useAuth} from "@/hooks/useAuth";

export default function Payments() {

    const { user, isAdmin } = useAuth();
    return (
        <div>
            <h1>Olá, {user?.name}</h1>
            {isAdmin && <p>Você tem acesso de administrador.</p>}
        </div>
    )
};
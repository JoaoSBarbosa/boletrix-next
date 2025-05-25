import {useAuth} from "@/hooks/useAuth";
import {Layout} from "@/components/layout";

export default function Payments() {

    const {user, isAdmin} = useAuth();
    return (
        <Layout>
            <h1>Olá, {user?.name}</h1>
            {isAdmin && <p>Você tem acesso de administrador.</p>}
        </Layout>

    )
};
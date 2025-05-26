import {Modal} from "@/components/modal";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {Pencil} from "lucide-react";
import {UserMenuButton} from "@/components/buttons";

export const EditUserDialog = () => {

    const {user} = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    return (
        <Modal
            open={showModal}
            setOpen={setShowModal}
            title={"Edição de usuario logado"}
            trigger={
                 <UserMenuButton name={"Editar perfil"} icon={<Pencil size={16}/>}/>

            }
        >
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                />

                <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Atualizar
                </button>
            </form>

        </Modal>
    )
}
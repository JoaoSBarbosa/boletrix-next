import {Modal} from "@/components/modal";
import {useEffect, useState} from "react";
import {Pencil} from "lucide-react";
import {Button, ButtonType, UserMenuButton} from "@/components/buttons";
import {UserResponseType} from "@/types/user/UserResponseType";
import * as Form from "../../../Forms";
import {InputText} from "@/components/inputs/InputText";
import {KeyIcon, UserIcon} from "@phosphor-icons/react";

interface EditUserSystemProps {
    user: UserResponseType;
    reloadData?: () => void;
}

export const EditUserSystemDialog = ({user}: EditUserSystemProps) => {


    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.roles[0]?.name)
        }
    }, [user]);

    return (
        <Modal
            open={showModal}
            setOpen={setShowModal}
            title={"Edição de usuario"}
            trigger={
                <UserMenuButton name={"Editar"} icon={<Pencil size={16}/>}/>

            }
        >
            <Form.Form flexDirection={"column"}>

                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        title={"ID"}
                        value={user?.id}
                        width={"20%"}
                        disabled={true}
                    >
                        <KeyIcon/>
                    </InputText>
                </Form.FormRows>
                <Form.FormRows justifyContent={"flex-start"}>

                    <InputText
                        title={"Nome"}
                        value={name}
                        onChange={(value) => setName(value.target.value)}
                        width={"100%"}
                    >
                        <UserIcon/>
                    </InputText>
                </Form.FormRows>

                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        title={"E-mail"}
                        value={email}
                        type={"email"}
                        width={"100%"}
                        onChange={(value) => setEmail(value.target.value)}

                    >
                        <KeyIcon/>
                    </InputText>

                </Form.FormRows>
                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        title={"Acessos"}
                        value={role}
                        width={"100%"}
                        onChange={(value) => setRole(value.target.value)}
                    >
                        <KeyIcon/>
                    </InputText>
                </Form.FormRows>
                <Form.FormRows justifyContent={"flex-start"}>
                    <Button type={ButtonType.BUTTON} value={"Atualizar"}/>
                </Form.FormRows>
            </Form.Form>

        </Modal>
    )
}
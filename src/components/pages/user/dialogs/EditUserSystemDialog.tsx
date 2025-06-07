import {Modal} from "@/components/modal";
import {useEffect, useState} from "react";
import {Pencil} from "lucide-react";
import {Button, ButtonType, UserMenuButton} from "@/components/buttons";
import {UserResponseType} from "@/types/user/UserResponseType";
import * as Form from "../../../Forms";
import {InputText} from "@/components/inputs/InputText";
import {EnvelopeIcon, KeyIcon, UserIcon} from "@phosphor-icons/react";
import {Selection} from "@/components/select";
import {roleType, showToastMessage, typeStatus} from "@/util/util";
import ApiConnection from "@/util/api";
import {Loading} from "@/components/Loadings";
import {useWindowSize} from "@/hooks/useWindowSize";

interface EditUserSystemProps {
    user: UserResponseType;
    reloadData: () => void;
}

export const EditUserSystemDialog = ({user, reloadData }: EditUserSystemProps) => {


    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState("");
    const {width} = useWindowSize();
    const isSmallScreen = width <= 640;
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.roles[0]?.name)
        }
    }, [user]);

    async function handleEdit() {

        if (!user.id) {
            showToastMessage({
                type: "warning",
                message: "Necessário o id para edição do usuário: " + user?.name,
            })
            return;
        }
        setShowLoading( true );
        try {
            await ApiConnection( window.location.href ).put(`/users/${user.id}`,{
                name,
                email,
                roles: [role],
            })

            showToastMessage({
                type: "success",
                message: "Usuário atualizado com sucesso!"
            })

            reloadData();
            setShowModal(false); // fecha o modal após edição

        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar editar o usuario: " + user.name
            })
        } finally {
            setShowLoading( false )
        }
    }

    return (
        <Modal
            open={showModal}
            setOpen={setShowModal}
            width={isSmallScreen ? "95%" : 600}
            title={"Edição de usuario"}
            trigger={<UserMenuButton name={"Editar"} icon={<Pencil size={16}/>}/>}
        >
            { showLoading ?
            <Loading/>
                :
                <Form.Form flexDirection={"column"}>

                    <Form.FormRows justifyContent={"flex-start"}>
                        <InputText
                            title={"ID"}
                            value={user?.id}
                            width={"50%"}
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
                            <EnvelopeIcon/>
                        </InputText>

                    </Form.FormRows>
                    <Form.FormRows justifyContent={"flex-start"}>
                        <Selection
                            title={'Acesso'}
                            groupName={'Lista de Acessos'}
                            optionsList={roleType}
                            width={'100%'}
                            value={role}
                            onValueChange={(newValue: string) => setRole(newValue)}
                        />
                    </Form.FormRows>
                    <Form.FormRows justifyContent={"flex-end"}>
                        <Button type={ButtonType.BUTTON} value={"Atualizar"} width={"max-content"} onClick={handleEdit}/>
                    </Form.FormRows>
                </Form.Form>
            }

        </Modal>
    )
}
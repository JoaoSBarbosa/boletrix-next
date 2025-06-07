import {Modal} from "@/components/modal";
import {BgColor, Button, ButtonType} from "@/components/buttons";
import {Loading} from "@/components/Loadings";
import {FormEvent, useEffect, useState} from "react";
import * as Form from "../../../Forms";
import {EnvelopeIcon, PlusIcon, UserIcon} from "@phosphor-icons/react";
import {InputText} from "@/components/inputs/InputText";
import {roleType, showToastMessage} from "@/util/util";
import ApiConnection from "@/util/api";
import {FaKey} from "react-icons/fa";
import {Selection} from "@/components/select";


interface RegisterUserProps {
    reloadData: () => void
}

export const RegisterUser = ({reloadData}: RegisterUserProps) => {
    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const [role, setRole] = useState("");

    const handleCastration = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateValues();
        if (password !== confirmationPassword) {
            showToastMessage({
                type: "error",
                message: "As senhas não coincidem.",
            });
            return;
        }
        setShowLoading(true);
        try {
            await ApiConnection(window.location.href).post(`/users/system_register`, {
                name,
                email,
                password,
                confirmationPassword,
                roles: {
                    name: role
                }
            });
            showToastMessage({
                type: "success",
                message: "Cadastro realizado com sucesso!",
            });
            reloadData();
            setShowModal( false );
        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao realizar o cadastro!",
            });
            console.error(error);
        } finally {
            setShowLoading(false);
        }
    };

    const validateValues = () => {

        if (
            !name ||
            !email ||
            !password ||
            !confirmationPassword

        ) {
            const missingFields: string[] = [];

            if (!name) missingFields.push("Name");
            if (!email) missingFields.push("E-mail");
            if (!password) missingFields.push("Senha");
            if (!confirmationPassword) missingFields.push("Confirmação de Senha");

            showToastMessage({
                type: "warning",
                message: `${missingFields.length > 1 ? "Os campos" : ' O campo'}:  ${missingFields.join(', ')} ${missingFields.length > 1 ? "são obrigatórios" : ' é obrigatório'}.`
            })
            return;
        }
    }
    const isPasswordConfirmed = password === confirmationPassword;

    useEffect(() => {
        if ( showModal ){
            setEmail("");
            setName("");
            setPassword("");
            setConfirmationPassword("");
            setRole("")
        }
    }, [ showModal]);
    return (
        <Modal
            open={showModal}
            setOpen={setShowModal}
            width={500}
            title={"Cadastro de usuario"}
            trigger={
                <Button type={ButtonType.BUTTON} value={"Novo usuário"} width={"max-content"} bgColor={BgColor.GREEN}>
                    <PlusIcon size={16}/>
                </Button>
                // <UserMenuButton name={""} icon={<PlusIcon size={16}/>}/>
            }
        >
            {showLoading ?
                <Loading/>
                :
                <Form.Form flexDirection={"column"} onSubmit={handleCastration}>


                    <Form.FormRows justifyContent={"flex-start"}>

                        <InputText
                            value={name}
                            width={"100%"}
                            title="Nome do usuário"
                            placeholder={"Ex.: João da Silva"}
                            onChange={(value) => setName(value.target.value)}
                        >
                            <UserIcon/>
                        </InputText>
                    </Form.FormRows>

                    <Form.FormRows justifyContent={"flex-start"}>
                        <InputText
                            value={email}
                            type={"email"}
                            width={"100%"}
                            title={"E-mail do usuário"}
                            placeholder={"Ex.: joao@gmail.com"}
                            onChange={(value) => setEmail(value.target.value)}
                        >
                            <EnvelopeIcon/>
                        </InputText>

                    </Form.FormRows>
                    <Form.FormRows justifyContent="flex-start">
                        <InputText
                            width="100%"
                            value={password}
                            title="Informe uma senha"
                            placeholder="Ex.: @Senha45Fort%48*"
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            <FaKey size={16}/>
                        </InputText>
                    </Form.FormRows>
                    {password && (
                        <Form.FormRows justifyContent="flex-start">
                            <InputText
                                title="Confirmar senha"
                                placeholder="Digite a senha novamente"
                                value={confirmationPassword}
                                onChange={(e) => setConfirmationPassword(e.target.value)}
                                width="100%"
                            >
                                <FaKey size={16}/>
                            </InputText>
                        </Form.FormRows>
                    )}

                    {password && confirmationPassword && !isPasswordConfirmed && (
                        <Form.FormRows justifyContent="flex-start">
                            <span className="text-sm text-red-600">As senhas não coincidem.</span>
                        </Form.FormRows>
                    )}
                    <Form.FormRows justifyContent={"flex-start"}>
                        {/*<Selection */}
                        {/*    title={} */}
                        {/*    groupName={} */}
                        {/*    optionsList={}*/}
                        {/*/>*/}

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
                        <Button
                            type={ButtonType.SUBMIT}
                            value={"Cadastrar"}
                            width={"max-content"}
                        />
                    </Form.FormRows>
                </Form.Form>
            }

        </Modal>
    )
}
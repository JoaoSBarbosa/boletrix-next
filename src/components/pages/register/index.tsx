// import {Input, TypeInput} from "@/components/inputs";
// import {FormEvent, useState} from "react";
// import {BgColor, Button, ButtonType} from "@/components/buttons";
// import ApiConnection from "@/util/api";
// import {showToastMessage} from "@/util/util";
// import {useRouter} from "next/router";
// import {useAuth} from "@/hooks/useAuth";
// import * as Form from "../../Forms";
// import {InputText} from "@/components/InputText";
// import {FaKey} from "react-icons/fa";
// import { HiOutlineUserPlus } from "react-icons/hi2";
// import {MdEmail} from "react-icons/md";
//
// interface RegisterProps {
//     setAction: (action: "login" | "register" | "") => void;
// }
// export const Register = ({ setAction }:RegisterProps) => {
//     const [email, setEmail] = useState<string>("");
//     const [confirmationPassword, setConfirmationPassword] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [activeForm, setActiveForm] = useState<"login" | "recover" | "create" | "">("");
//
//     const router = useRouter();
//
//     // const {login} = useAuth();
//
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log("CHAMOU O SUBMIT");
//         console.log("ACTIVEFORM", activeForm);
//
//         if (activeForm === "login") {
//             console.log("Login", {email, password});
//             await handleRegister();
//         }
//
//         if (activeForm === "recover") {
//             console.log("Recuperar senha", {email});
//         }
//     };
//
//     async function handleRegister() {
//         try {
//             const data = await ApiConnection(window.location.href).post(`/login`, {
//                 email,
//                 password
//             })
//
//
//             const receivedToken = data?.data?.token;
//             console.log("LOGIN", data);
//
//             login(receivedToken)
//
//             showToastMessage({
//                 type: 'success',
//                 message: 'Login realizado com sucesso!'
//             });
//
//             await router.push("/user_systems");
//
//         } catch (error) {
//             showToastMessage({
//                 type: 'error',
//                 message: 'Erro ao fazer o login!'
//             });
//             console.error(error);
//         }
//     }
//
//     return (
//         <div className="w-full bg-gray-50 rounded-lg shadow md:mt-0 xl:p-0">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                 <h1 className="flex items-center gap-2 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl ">
//                     Criar sua conta
//                     <HiOutlineUserPlus />
//
//                 </h1>
//
//                 <Form.Form
//                     flexDirection={"column"}
//                     onSubmit={handleSubmit}
//                 >
//
//                     <Form.FormRows justifyContent={"flex-start"}>
//
//                         <InputText
//                             value={email}
//                             title={'Informe seu melhor e-mail'}
//                             width={'100%'}
//                             placeholder={"Ex.: usuario@gmail.com"}
//                             onChange={(e) => setEmail(e.target.value)}
//                         >
//                             <MdEmail size={'16px'}/>
//                         </InputText>
//
//
//                     </Form.FormRows>
//
//                     <Form.FormRows justifyContent={"flex-start"}>
//
//                         <InputText
//                             value={password}
//                             title={'Informe uma senha'}
//                             width={'100%'}
//                             placeholder={"Ex.: @Senha45Fort%48*"}
//                             onChange={(e) => setPassword(e.target.value)}
//                         >
//                             <FaKey size={'16px'}/>
//                         </InputText>
//                     </Form.FormRows>
//
//
//                     { password &&
//                         <Form.FormRows justifyContent={"flex-start"}>
//
//                             <InputText
//                                 value={confirmationPassword}
//                                 title={'Confirmar Senha'}
//                                 width={'100%'}
//                                 placeholder={"Ex.: @Senha45Fort%48*"}
//                                 onChange={(e) => setConfirmationPassword(e.target.value)}
//                             >
//                                 <FaKey size={'16px'}/>
//                             </InputText>
//                         </Form.FormRows>
//
//
//                     }
//
//
//                     { password === confirmationPassword ?
//                         <Form.FormRows justifyContent={"flex-end"}>
//                             <Button
//                                 width={"max-content"}
//                                 onClick={() => setActiveForm("login")}
//                                 type={ButtonType.SUBMIT}
//                                 value={"Cadastrar"}
//                                 title={"Clique para cadastrar"}
//                             />
//                         </Form.FormRows>
//                         :
//                         <span className={"text-red-600"}>Senha não coicidem</span>
//                     }
//
//
//
//                     <Form.FormRows justifyContent="center">
//                         <p className="text-sm text-gray-600">
//                             Já tem conta?
//                             <button
//                                 type="button"
//                                 onClick={() => setAction("login")}
//                                 className="text-blue-600 hover:underline ml-1"
//                             >
//                                 Faça login
//                             </button>
//                         </p>
//                     </Form.FormRows>
//
//                 </Form.Form>
//
//             </div>
//         </div>
//     );
// };
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { InputText } from "../../inputs/InputText";
import { Button, ButtonType } from "@/components/buttons";
import ApiConnection from "@/util/api";
import { showToastMessage } from "@/util/util";
import { useAuth } from "@/hooks/useAuth";
import * as Form from "../../Forms";

interface RegisterProps {
    setAction: (action: "login" | "register" | "") => void;
}

export const Register = ({ setAction }: RegisterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showToastMessage({
                type: "error",
                message: "As senhas não coincidem.",
            });
            return;
        }

        try {
            // Simulação do cadastro e login (ajuste para endpoint correto se necessário)
            const response = await ApiConnection(window.location.href).post(`/register`, {
                email,
                password,
            });

            const token = response?.data?.token;

            login(token);

            showToastMessage({
                type: "success",
                message: "Cadastro realizado com sucesso!",
            });

            await router.push("/user_systems");
        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao realizar o cadastro!",
            });
            console.error(error);
        }
    };

    const isPasswordConfirmed = password === confirmPassword;

    return (
        <div className="w-full bg-gray-50 rounded-lg shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="flex items-center gap-2 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                    Criar sua conta
                    <HiOutlineUserPlus />
                </h1>

                <Form.Form flexDirection="column" onSubmit={handleSubmit}>
                    <Form.FormRows justifyContent="flex-start">
                        <InputText
                            title="Informe seu melhor e-mail"
                            placeholder="Ex.: usuario@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            width="100%"
                        >
                            <MdEmail size={16} />
                        </InputText>
                    </Form.FormRows>

                    <Form.FormRows justifyContent="flex-start">
                        <InputText
                            title="Informe uma senha"
                            placeholder="Ex.: @Senha45Fort%48*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            width="100%"
                        >
                            <FaKey size={16} />
                        </InputText>
                    </Form.FormRows>

                    {password && (
                        <Form.FormRows justifyContent="flex-start">
                            <InputText
                                title="Confirmar senha"
                                placeholder="Digite a senha novamente"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                width="100%"
                            >
                                <FaKey size={16} />
                            </InputText>
                        </Form.FormRows>
                    )}

                    {password && confirmPassword && !isPasswordConfirmed && (
                        <Form.FormRows justifyContent="flex-start">
                            <span className="text-sm text-red-600">As senhas não coincidem.</span>
                        </Form.FormRows>
                    )}

                    <Form.FormRows justifyContent="flex-end">
                        <Button
                            type={ButtonType.SUBMIT}
                            value="Cadastrar"
                            title="Clique para cadastrar"
                            width="max-content"
                            disabled={!email || !password || !isPasswordConfirmed}
                        />
                    </Form.FormRows>

                    <Form.FormRows justifyContent="center">
                        <p className="text-sm text-gray-600">
                            Já tem conta?
                            <button
                                type="button"
                                onClick={() => setAction("login")}
                                className="text-blue-600 hover:underline ml-1"
                            >
                                Faça login
                            </button>
                        </p>
                    </Form.FormRows>
                </Form.Form>
            </div>
        </div>
    );
};

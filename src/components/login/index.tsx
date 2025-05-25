import {Input, TypeInput} from "@/components/inputs";
import {FormEvent, useState} from "react";
import {Button, ButtonType} from "@/components/buttons";
import ApiConnection from "@/util/api";
import {showToastMessage} from "@/util/util";
import {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";

export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [activeForm, setActiveForm] = useState<"login" | "recover" | "">("");

    const router = useRouter();

    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("CHAMOU O SUBMIT");
        console.log("ACTIVEFORM", activeForm);

        if (activeForm === "login") {
            console.log("Login", {email, password});
            await handleLogin();
        }

        if (activeForm === "recover") {
            console.log("Recuperar senha", {email});
        }
    };

    async function handleLogin() {
        try {
            const data = await ApiConnection(window.location.href).post(`/login`, {
                email,
                password
            })


            const receivedToken = data?.data?.token;
            console.log("LOGIN", data);

            login(receivedToken)

            showToastMessage({
                type: 'success',
                message: 'Login realizado com sucesso!'
            });

            await router.push("/payments");

        } catch (error) {
            showToastMessage({
                type: 'error',
                message: 'Erro ao fazer o login!'
            });
            console.error(error);
        }
    }

    return (
        <div className="w-full bg-gray-600 rounded-lg shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Entre na sua conta
                </h1>

                <form
                    className="space-y-4 md:space-y-6"
                    method={"POST"}
                    onSubmit={handleSubmit}
                >
                    <Input
                        type={TypeInput.EMAIL}
                        htmlFor={"email"}
                        label={"E-mail"}
                        placeholder={"Ex.: usuario@gmail.com"}
                        inputValue={email}
                        onChange={setEmail}
                    />
                    <Input
                        type={TypeInput.PASSWORD}
                        htmlFor={"password"}
                        label={"Senha"}
                        placeholder={"Ex.: @Senha45Fort%48*"}
                        inputValue={password}
                        onChange={setPassword}
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex w-[50%] items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="remember"
                                    className="text-gray-500 dark:text-gray-300"
                                >
                                    Lembre de mim
                                </label>
                            </div>
                        </div>

                        <Button
                            width={"50%"}
                            onClick={() => setActiveForm("recover")}
                            type={ButtonType.SUBMIT}
                            value={"Esqueceu sua senha?"}
                            title={"Clique para recuperar"}
                        />
                    </div>

                    <Button
                        onClick={() => setActiveForm("login")}
                        type={ButtonType.SUBMIT}
                        value={"Entrar"}
                        title={"Clique para entrar"}
                    />
                </form>
            </div>
        </div>
    );
};

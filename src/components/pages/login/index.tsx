import { Input, TypeInput } from "@/components/inputs";
import { FormEvent, useState } from "react";
import { BgColor, Button, ButtonType } from "@/components/buttons";
import ApiConnection from "@/util/api";
import { getVisibilityIcon, showToastMessage } from "@/util/util";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import * as Form from "../../Forms";
import { InputText } from "../../inputs/InputText";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { EnvelopeIcon } from "@phosphor-icons/react";

interface LoginProps {
  setAction: (action: "login" | "register" | "") => void;
}
export const Login = ({ setAction }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [activeForm, setActiveForm] = useState<
    "login" | "recover" | "create" | ""
  >("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeForm === "login") {
      await handleLogin();
    }
    if (activeForm === "recover") {
      console.log("Recuperar senha", { email });
    }
  };

  async function handleLogin() {
    try {
      const data = await ApiConnection(window.location.href).post(`/login`, {
        email,
        password,
      });

      const receivedToken = data?.data?.token;
      login(receivedToken);
      showToastMessage({
        type: "success",
        message: "Login realizado com sucesso!",
      });
      await router.push("/payments");
    } catch (error) {
      showToastMessage({
        type: "error",
        message: "Erro ao fazer o login!",
      });
      console.error(error);
    }
  }

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow md:mt-0 xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl ">
          Entre na sua conta
        </h1>

        <Form.Form padding={1} flexDirection={"column"} onSubmit={handleSubmit}>
          <Form.FormRows justifyContent={"flex-start"}>
            <InputText
              value={email}
              title={"E-mail"}
              width={"100%"}
              placeholder={"Ex.: usuario@gmail.com"}
              onChange={(e) => setEmail(e.target.value)}
            >
              <FaEnvelope size={"16px"} />
            </InputText>
          </Form.FormRows>

          <Form.FormRows justifyContent={"flex-start"}>
            <InputText
              value={password}
              title={"Senha"}
              width={"100%"}
              type={showPassword ? "text" : "password"}
              placeholder={"Ex.: @Senha45Fort%48*"}
              onChange={(e) => setPassword(e.target.value)}
            >
              {getVisibilityIcon(
                showPassword,
                () => setShowPassword(!showPassword),
                !!password
              )}
            </InputText>
          </Form.FormRows>
          <Form.FormRows justifyContent="flex-start">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setActiveForm("recover")}
            >
              Esqueceu sua senha?
            </button>
          </Form.FormRows>

          {/*<Form.FormRows justifyContent={"flex-start"}>*/}
          {/*    <div className="flex w-[65%]">*/}
          {/*        <button type={"button"} onClick={() => setActiveForm("recover")}>*/}
          {/*            Esqueceu sua senha?*/}
          {/*        </button>*/}
          {/*    </div>*/}

          {/*</Form.FormRows>*/}

          <Form.FormRows justifyContent={"flex-end"}>
            <Button
              width={"max-content"}
              onClick={() => setActiveForm("login")}
              type={ButtonType.SUBMIT}
              value={"Entrar"}
              title={"Clique para entrar"}
            />
          </Form.FormRows>
          <Form.FormRows justifyContent="center">
            <p className="text-sm text-gray-600">
              Ainda não tem conta?
              <button
                type="button"
                onClick={() => setAction("register")}
                className="text-blue-600 hover:underline ml-1"
              >
                Cadastre-se
              </button>
            </p>
          </Form.FormRows>
        </Form.Form>
      </div>
    </div>
  );
};

import { useState } from "react";
import { useRouter } from "next/router";
import ApiConnection from "@/util/api";
import { ShowAxiosError, showToastMessage } from "@/util/util";
import * as Form from "../../Forms";
import { InputText } from "../../inputs/InputText";
import { FaEnvelope } from "react-icons/fa";
import { Button, ButtonType } from "@/components/buttons";
import { log } from "console";

interface ForgotProps {
  setAction: (action: "login" | "register" | "forgot" | "") => void;
}
export default function Forgot({ setAction }: ForgotProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  async function handleRecover() {
    try {
      await ApiConnection(window.location.href).post(
        "/login/auth/forgot_password",
        { email }
      );

      setEmailSent(true);
      showToastMessage({
        type: "success",
        message: "Enviamos um link de recuperação para o seu e-mail.",
      });
    } catch (error) {
      console.log("ERRO:", error);

      setEmailSent(false);
      ShowAxiosError(error);
    }
  }

  const handleClick = async () => {
    setAction("forgot");
    await handleRecover();
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow md:mt-0 xl:p-0">
      <div className="p-6 space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
          Recuperar Senha
        </h1>

        {!emailSent ? (
          <Form.Form padding={1} flexDirection={"column"}>
            <Form.FormRows justifyContent="flex-start">
              <InputText
                value={email}
                title="Informe seu e-mail cadastrado"
                width="100%"
                placeholder="Ex.: usuario@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              >
                <FaEnvelope size="16px" />
              </InputText>
            </Form.FormRows>

            <Form.FormRows justifyContent="flex-end">
              <Button
                onClick={handleClick}
                width="max-content"
                type={ButtonType.BUTTON}
                value="Recuperar Senha"
                title="Clique para receber o link de redefinição"
              />
            </Form.FormRows>
          </Form.Form>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center space-y-4 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Verifique seu e-mail
            </h2>
            <p className="text-gray-600">
              Enviamos um link de redefinição de senha para{" "}
              <strong>{email}</strong>. Caso não o encontre, verifique sua caixa
              de spam.
            </p>
            <Button
              type={ButtonType.BUTTON}
              value="Voltar ao login"
              onClick={() => router.push("/")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

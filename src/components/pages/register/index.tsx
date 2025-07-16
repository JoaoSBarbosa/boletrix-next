import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { InputText } from "../../inputs/InputText";
import { Button, ButtonType } from "@/components/buttons";
import ApiConnection from "@/util/api";
import { getVisibilityIcon, showToastMessage } from "@/util/util";
import { useAuth } from "@/hooks/useAuth";
import * as Form from "../../Forms";
import { EyeIcon, EyeSlashIcon, UserIcon } from "@phosphor-icons/react";

interface RegisterProps {
  setAction: (action: "login" | "register" | "forgot" | "") => void;
}

export const Register = ({ setAction }: RegisterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateValues();
    if (password !== confirmPassword) {
      showToastMessage({
        type: "error",
        message: "As senhas não coincidem.",
      });
      return;
    }
    setShowLoading(true);
    try {
      // Simulação do cadastro e login (ajuste para endpoint correto se necessário)
      const response = await ApiConnection(window.location.href).post(
        `/users/register`,
        {
          name,
          email,
          password,
          confirmationPassword: confirmPassword,
        }
      );

      const token = response?.data?.token;

      login(token);

      showToastMessage({
        type: "success",
        message: "Cadastro realizado com sucesso!",
      });

      await router.push("/payments");
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
    if (!name || !email || !password || !confirmPassword) {
      const missingFields: string[] = [];

      if (!name) missingFields.push("Name");
      if (!email) missingFields.push("E-mail");
      if (!password) missingFields.push("Senha");
      if (!confirmPassword) missingFields.push("Confirmação de Senha");

      showToastMessage({
        type: "warning",
        message: `${
          missingFields.length > 1 ? "Os campos" : " O campo"
        }:  ${missingFields.join(", ")} ${
          missingFields.length > 1 ? "são obrigatórios" : " é obrigatório"
        }.`,
      });
      return;
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
              title="Informe seu nome"
              placeholder="Ex.: José Gonçalves"
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="100%"
            >
              <UserIcon size={16} />
            </InputText>
          </Form.FormRows>
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
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              width="100%"
            >
              {getVisibilityIcon(
                showPassword,
                () => setShowPassword(!showPassword),
                !!password
              )}
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
                type={showConfirmationPassword ? "text" : "password"}
              >
                {getVisibilityIcon(
                  showConfirmationPassword,
                  () => setShowConfirmationPassword(!showConfirmationPassword),
                  !!confirmPassword
                )}
              </InputText>
            </Form.FormRows>
          )}

          {password && confirmPassword && !isPasswordConfirmed && (
            <Form.FormRows justifyContent="flex-start">
              <span className="text-sm text-red-600">
                As senhas não coincidem.
              </span>
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

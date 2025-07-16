// import { useAuth } from "@/hooks/useAuth";
// import ApiConnection from "@/util/api";
// import {
//   getVisibilityIcon,
//   ShowAxiosError,
//   showToastMessage,
// } from "@/util/util";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import * as Form from "../../components/Forms";
// import InputText from "@/components/inputs/InputText";
// import { Button, ButtonType } from "@/components/buttons";

// export default function resetPassword() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");
//   const { login } = useAuth();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmationPassword, setShowConfirmationPassword] =
//     useState<boolean>(false);
//   async function handleReset() {
//     try {
//       const data = await ApiConnection(window.location.href).post(
//         `/login/auth/reset_password`,
//         {
//           token,
//           newPassword,
//           confirmationPassword: confirmPassword,
//         }
//       );

//       const receivedToken = data?.data?.token;
//       login(receivedToken);
//       showToastMessage({
//         type: "success",
//         message: "Login realizado com sucesso!",
//       });
//       await router.push("/payments");
//     } catch (error: any) {
//       const message =
//         error?.response?.data?.message ||
//         "Erro ao fazer login. Tente novamente mais tarde.";

//       showToastMessage({
//         type: "error",
//         message,
//       });
//     }
//   }

//   const isPasswordConfirmed = newPassword === confirmPassword;

//   return (
//     <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Redefinir Senha</h1>
//       <Form.Form flexDirection="column">
//         <Form.FormRows justifyContent={"flex-start"}>
//           <InputText
//             value={newPassword}
//             title={"Senha"}
//             width={"100%"}
//             type={showPassword ? "text" : "password"}
//             placeholder={"Ex.: @Senha45Fort%48*"}
//             onChange={(e) => setNewPassword(e.target.value)}
//           >
//             {getVisibilityIcon(
//               showPassword,
//               () => setShowPassword(!showPassword),
//               !!newPassword
//             )}
//           </InputText>
//         </Form.FormRows>

//         {newPassword && (
//           <Form.FormRows justifyContent="flex-start">
//             <InputText
//               title="Confirmar senha"
//               placeholder="Digite a senha novamente"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               width="100%"
//               type={showConfirmationPassword ? "text" : "password"}
//             >
//               {getVisibilityIcon(
//                 showConfirmationPassword,
//                 () => setShowConfirmationPassword(!showConfirmationPassword),
//                 !!confirmPassword
//               )}
//             </InputText>
//           </Form.FormRows>
//         )}

//         <Form.FormRows justifyContent="flex-end">
//           <Button
//             onClick={handleReset}
//             type={ButtonType.BUTTON}
//             value="Atualizar Senha"
//             title="Clique para Atualizar Senha"
//             width="max-content"
//             disabled={!newPassword || !isPasswordConfirmed}
//           />
//         </Form.FormRows>
//       </Form.Form>
//     </div>
//   );
// }

"use client";

import { useAuth } from "@/hooks/useAuth";
import ApiConnection from "@/util/api";
import { getVisibilityIcon, showToastMessage } from "@/util/util";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Form from "@/components/Forms";
import InputText from "@/components/inputs/InputText";
import { Button, ButtonType } from "@/components/buttons";
import Image from "next/image";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { login } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordConfirmed = newPassword === confirmPassword;

  async function handleReset() {
    try {
      const data = await ApiConnection(window.location.href).post(
        `/login/auth/reset_password`,
        {
          token,
          newPassword,
          confirmationPassword: confirmPassword,
        }
      );

      const receivedToken = data?.data?.token;
      login(receivedToken);
      showToastMessage({
        type: "success",
        message: "Login realizado com sucesso!",
      });
      await router.push("/payments");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Erro ao redefinir senha. Tente novamente mais tarde.";

      showToastMessage({
        type: "error",
        message,
      });
    }
  }

  const VisibilityIcon = ({
    visible,
    onClick,
  }: {
    visible: boolean;
    onClick: () => void;
  }) => (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 transition"
    >
      {visible ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.25 0-9.678-3.618-10.875-8.5a10.05 10.05 0 012.323-4.225M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3l18 18M10.477 10.477a3 3 0 104.242 4.242M7.143 7.143C5.207 8.74 3.81 10.723 3 12c1.197 4.882 5.625 8.5 10.875 8.5 1.288 0 2.528-.225 3.675-.634M16.5 16.5l-6.75-6.75"
        />
      )}
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 transition-all">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/img/boletrix_logo_1.png"
            alt="Logo Boletrix"
            width={80}
            height={80}
            className="mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">Redefinir Senha</h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Crie uma nova senha segura para continuar
          </p>
        </div>

        <Form.Form flexDirection="column">
          <Form.FormRows justifyContent="flex-start">
            <InputText
              value={newPassword}
              title="Nova Senha"
              width="100%"
              type={showPassword ? "text" : "password"}
              placeholder="Ex: @SenhaForte45"
              onChange={(e) => setNewPassword(e.target.value)}
            >
              {!!newPassword && (
                <VisibilityIcon
                  visible={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </InputText>
          </Form.FormRows>

          {newPassword && (
            <Form.FormRows justifyContent="flex-start">
              <InputText
                title="Confirmar Senha"
                placeholder="Digite novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                width="100%"
                type={showConfirmPassword ? "text" : "password"}
              >
                {!!confirmPassword && (
                  <VisibilityIcon
                    visible={showConfirmPassword}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                )}
              </InputText>
            </Form.FormRows>
          )}

          {!isPasswordConfirmed && confirmPassword && (
            <p className="text-red-500 text-sm mt-1 ml-1">
              As senhas não coincidem
            </p>
          )}

          <Form.FormRows justifyContent="flex-end" customStyles="mt-4">
            <Button
              onClick={handleReset}
              type={ButtonType.BUTTON}
              value="Atualizar Senha"
              title="Clique para Atualizar Senha"
              width="100%"
              disabled={!newPassword || !isPasswordConfirmed}
              customSTyles="transition hover:scale-105 hover:bg-blue-600"
            />
          </Form.FormRows>
        </Form.Form>
      </div>
    </div>
  );
}

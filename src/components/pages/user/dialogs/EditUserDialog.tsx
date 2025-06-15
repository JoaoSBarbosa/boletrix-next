import { Modal } from "@/components/modal";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Pencil } from "lucide-react";
import { Button, ButtonType, UserMenuButton } from "@/components/buttons";
import * as Form from "../../../Forms";
import { InputText } from "@/components/inputs/InputText";
import { EnvelopeIcon, UserCheckIcon } from "@phosphor-icons/react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Checkbox } from "@radix-ui/react-checkbox";
import { CheckBox } from "@/components/checkbox";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { ShowAxiosError, showToastMessage } from "@/util/util";
import ApiConnection from "@/util/api";
import { PasswordIconControl } from "@/components/passwordIconControl";

export const EditUserDialog = () => {
  const { user, login, updateUser } = useAuth();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 640;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isAlterPassword, setIsAlterPassword] = useState(false);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUserId(user?.id);
    }
  }, [user]);
  const isPasswordConfirmed = newPassword === confirmNewPassword;

  async function handleUpdateProfile() {
    try {
      const response = await ApiConnection(window.location.href).put(
        `/users/profile/${user?.id}`,
        {
          name,
          email,
          alterPassword: isAlterPassword,
          password,
          newPassword,
          confirmNewPassword,
        }
      );
      const updatedUser = response?.data;

      updateUser({
        name: updatedUser.name,
        email: updatedUser.email,
      });
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showToastMessage({
        type: "success",
        message: "Perfil atualizado com sucesso!",
      });
    } catch (error) {
      ShowAxiosError(error);
    }
  }

  return (
    <Modal
      open={showModal}
      setOpen={setShowModal}
      width={isSmallScreen ? "95%" : 600}
      title={"Edição de usuario logado"}
      trigger={
        <UserMenuButton name={"Editar perfil"} icon={<Pencil size={16} />} />
      }
    >
      <Form.Form flexDirection={"column"}>
        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            title={"Nome"}
            value={name}
            onChange={(value) => setName(value.target.value)}
            placeholder={"Ex.: João da Silva"}
          >
            <UserCheckIcon />
          </InputText>
        </Form.FormRows>

        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            title={"E-mail"}
            value={email}
            onChange={(value) => setEmail(value.target.value)}
            placeholder={"Ex.: João da Silva"}
          >
            <EnvelopeIcon />
          </InputText>
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-end"}>
          <CheckBox
            title="Atualizar senha?"
            checked={isAlterPassword}
            onCheckedChange={() => setIsAlterPassword(!isAlterPassword)}
          />
        </Form.FormRows>

        {isAlterPassword && (
          <Form.FormColumns>
            <Form.FormRows justifyContent="flex-start">
              <InputText
                type={showPassword ? "text" : "password"}
                title="Informe a senha atual"
                placeholder="Ex.: @Senha45Fort%48*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width="100%"
              >
                <PasswordIconControl
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  value={password}
                />
              </InputText>
            </Form.FormRows>

            <Form.FormRows justifyContent="flex-start">
              <InputText
                type={showNewPassword ? "text" : "password"}
                title="Digite a senha nova"
                placeholder="Digite a senha novamente"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                width="100%"
              >
                <PasswordIconControl
                  showPassword={showNewPassword}
                  setShowPassword={setShowNewPassword}
                  value={newPassword}
                />
              </InputText>
            </Form.FormRows>

            {newPassword && (
              <Form.FormRows justifyContent="flex-start">
                <InputText
                  type={showConfirmPassword ? "text" : "password"}
                  title="Digite a senha nova"
                  placeholder="Confirme a senha nova"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  width="100%"
                >
                  <PasswordIconControl
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                    value={confirmNewPassword}
                  />
                </InputText>
              </Form.FormRows>
            )}

            {password && confirmNewPassword && !isPasswordConfirmed && (
              <Form.FormRows justifyContent="flex-start">
                <span className="text-sm text-red-600">
                  As senhas não coincidem.
                </span>
              </Form.FormRows>
            )}
          </Form.FormColumns>
        )}

        <Form.FormRows justifyContent={"flex-end"}>
          <Button
            type={ButtonType.BUTTON}
            value={"Atualizar"}
            width={"max-content"}
            onClick={handleUpdateProfile}
          />
        </Form.FormRows>
      </Form.Form>
    </Modal>
  );
};

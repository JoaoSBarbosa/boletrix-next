// components/DeleteUserDialog.tsx
import { Modal } from "@/components/modal";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ExclamationMarkIcon, Trash, WarningIcon } from "@phosphor-icons/react";
import {
  Button,
  ButtonType,
  BgColor,
  UserMenuButton,
} from "@/components/buttons";
import * as Form from "../../../Forms";
import { showToastMessage, ShowAxiosError } from "@/util/util";
import ApiConnection from "@/util/api";
import { useWindowSize } from "@/hooks/useWindowSize";

export const DeleteUserDialog = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { width } = useWindowSize();
  const isSmallScreen = width <= 640;

  async function handleUserDelete() {
    if (!user?.id) {
      showToastMessage({
        type: "error",
        message:
          "Erro: não conseguimos identificar sua conta. Tente novamente ou entre em contato com o suporte.",
      });
      return;
    }

    setIsDeleting(true);

    try {
      const api = ApiConnection(window.location.href);
      await api.delete(`/users/${user.id}`);

      showToastMessage({
        type: "success",
        message: "Conta excluída com sucesso. Sentiremos sua falta!",
      });

      await logout();
    } catch (error) {
      ShowAxiosError(error);
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  }

  return (
    <Modal
      open={showModal}
      setOpen={setShowModal}
      width={isSmallScreen ? "95%" : 600}
      title="Tem certeza?"
      trigger={
        <UserMenuButton name="Excluir conta" icon={<Trash size={16} />} />
      }
    >
      <Form.Form flexDirection="column" className="gap-4 mt-4">
        <div className="flex items-center gap-3 bg-red-100 text-red-700 p-4 rounded-lg border border-red-300">
          <WarningIcon size={32} />
          <span>
            Essa ação é irreversível. Sua conta e todos os dados serão excluídos
            permanentemente.
          </span>
        </div>

        <Form.FormRows justifyContent="flex-end" customStyles="gap-4 mt-6">
          <Button
            type={ButtonType.BUTTON}
            value="Cancelar"
            onClick={() => setShowModal(false)}
            bgColor={BgColor.SLATE}
            width="max-content"
          />
          <Button
            type={ButtonType.BUTTON}
            value={isDeleting ? "Excluindo..." : "Confirmar exclusão"}
            onClick={handleUserDelete}
            bgColor={BgColor.RED}
            width="max-content"
            disabled={isDeleting}
          />
        </Form.FormRows>
      </Form.Form>
    </Modal>
  );
};

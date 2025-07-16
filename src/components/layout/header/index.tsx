import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/userMenu/UserMenu";
import { ShowAxiosError, showToastMessage } from "@/util/util";
import ApiConnection from "@/util/api";

export const Header = () => {
  const { user, logout } = useAuth();

  async function handleUserDelete() {
    const userId = user?.id;

    if (!user || !userId) {
      showToastMessage({
        type: "error",
        message:
          "Não foi possível excluir sua conta. Usuário não autenticado ou identificador inválido. Entre em contato com o suporte.",
      });
      return;
    }

    try {
      const api = ApiConnection(window.location.href);

      await api.delete(`/users/${userId}`);

      showToastMessage({
        type: "success",
        message:
          "Sua conta foi excluída com sucesso. Esperamos vê-lo novamente em breve.",
      });

      await logout();
    } catch (error) {
      ShowAxiosError(error);
    }
  }

  return (
    <header className="flex items-center justify-between w-full px-4 py-2 xl:px-6 xl:py-4 bg-primary shadow-md">
      <figure className="flex items-center gap-2">
        <img
          src="/img/boletrix_logo_5.png"
          alt="Logo da plataforma Boletrix"
          className="h-10 w-auto"
        />
      </figure>
      <UserMenu onLogout={logout} onDelete={handleUserDelete} />
    </header>
  );
};

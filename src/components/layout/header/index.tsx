import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/userMenu/UserMenu";

export const Header = () => {
  const { user, logout } = useAuth();

  // const { width } = useWindowSize();
  // const isSmallScreen = width <= 640;

  return (
    <header
      className={`flex items-center justify-between w-full px-2 py-2 xl:px-6 xl:py-4 bg-primary shadow-md`}
    >
      <figure className="flex items-center gap-2">
        <img
          src={`/img/boletrix_logo_5.png`}
          alt="Boletrix Logo"
          className="h-10 w-auto"
        />
      </figure>
      <UserMenu onLogout={logout} />
    </header>
  );
};

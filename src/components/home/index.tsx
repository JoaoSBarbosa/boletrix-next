import { useEffect, useState } from "react";
import { Login } from "../pages/login";
import { FooterLogin } from "@/components/footers/FooterLogin";
import { Register } from "@/components/pages/register";
import Forgot from "../pages/forgot";
import { log } from "console";

export const HomeLogin = () => {
  const [action, setAction] = useState<"login" | "register" | "forgot" | "">(
    "login"
  );

  useEffect(() => {
    console.log("action", action);
  }, [action]);
  return (
    // <section className=" w-1/2 h-1/2 border flex flex-col items-center border-red-500">
    <section className="w-full h-full p-4 lg:p-1 lg:w-1/3 flex flex-col items-center">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img className="h-20 mr-2" src="/img/boletrix_logo_1.png" alt="logo" />
      </a>

      {action === "login" && <Login setAction={setAction} />}
      {action === "register" && <Register setAction={setAction} />}
      {action === "forgot" && <Forgot setAction={setAction} />}

      <FooterLogin />
    </section>
  );
};

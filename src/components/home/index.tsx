import { useState } from "react";
import { Login } from "../login";

export const HomeLogin = () => {
  const [action, setAction] = useState<"login" | "register" | "">("login");
  return (
    <section className=" w-1/3 h-1/3">
      <div className="flex flex-col items-center justify-center px-6 py-8 w-full mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>

        {action === "login" && <Login />}
      </div>
    </section>
  );
};

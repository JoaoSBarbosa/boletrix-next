import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { showToastMessage } from "@/util/util";

export const useUserLoged = () => {
    const router = useRouter();
    const hasRedirected = useRef(false); // 👈 controla se já redirecionou

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token && !hasRedirected.current) {
            hasRedirected.current = true; // 👈 evita múltiplas execuções
            showToastMessage({
                type: "error",
                message: "Você não está autorizado a acessar esta rota. Faça login primeiro."
            });

            router.push("/").then(() => {
                showToastMessage({
                    type: "success",
                    message: "Redirecionando para tela de login"
                });
            });
        }
    }, []);
};

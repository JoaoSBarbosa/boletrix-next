import {useContext} from "react";
import {AuthContext} from "@/context/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Necessário envolver o trecho no qual deseja utilizar o contexto no Provider com 'AuthContext'");
    }

    return context;
}
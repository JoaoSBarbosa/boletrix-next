import {createContext, useEffect, useState} from "react";
import {UserType} from "@/types/UserType";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/router";


interface AuthContextProps {

    user: UserType | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


interface AuthProviderProps {
    children: React.ReactNode;
}
export const AuthContextProvider  = ({ children }:AuthProviderProps) =>{
    const router = useRouter();
    const [ user, setUser ] = useState<UserType | null>(null);
    const [ token, setToken ] = useState<string | null>(null);

    // const saveToken = localStorage.getItem("token");

    const decodeAndSetUser = (token: string) => {
        try {
            const payload = jwtDecode<any>(token);
            const userData: UserType = {
                name: payload.name,
                email: payload.email,
                roles: payload.roles,
            };
            setToken(token);
            setUser(userData);
            localStorage.setItem("token", token);
        } catch (err) {
            console.error("Erro ao decodificar token:", err);
            logout();
        }
    };

    // useEffect(() => {
    //     if ( saveToken ) {
    //         decodeAndSetUser(saveToken);
    //     }
    // },[])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                decodeAndSetUser(savedToken);
            }
        }
    }, []);



    const login = (token: string) => {
        decodeAndSetUser(token);
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        await router.push("/");
    };

    const isAdmin = user?.roles.includes("ROLE_ADMIN") ?? false

    return(
        <AuthContext.Provider value={{ user, token, logout, login, isAdmin }}>
            { children}
        </AuthContext.Provider>
    )

}
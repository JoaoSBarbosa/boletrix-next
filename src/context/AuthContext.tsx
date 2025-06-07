import {createContext, useEffect, useState} from "react";
import {UserType} from "@/types/user/UserType";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/router";


interface AuthContextProps {

    user: UserType | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAdmin: boolean;
    isAuthLoading: boolean;
    setIsAuthLoading: (isAuthLoading: boolean) => void;

}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


interface AuthProviderProps {
    children: React.ReactNode;
}
export const AuthContextProvider  = ({ children }:AuthProviderProps) =>{
    const router = useRouter();
    const [ user, setUser ] = useState<UserType | null>(null);
    const [ token, setToken ] = useState<string | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // const saveToken = localStorage.getItem("token");



    // useEffect(() => {
    //     if ( saveToken ) {
    //         decodeAndSetUser(saveToken);
    //     }
    // },[])
    useEffect(() => {
        const initializeAuth = async () => {
            if (typeof window !== "undefined") {
                const savedToken = localStorage.getItem("token");
                if (savedToken) {
                    decodeAndSetUser(savedToken);
                }
                setIsAuthLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const savedToken = localStorage.getItem("token");
    //         if (savedToken) {
    //             decodeAndSetUser(savedToken);
    //         }
    //         setIsAuthLoading( false );
    //     }
    // }, []);



    const login = (token: string) => {
        decodeAndSetUser(token);
    }

    const logout = async () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        await router.push("/");
    };
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
    const isAdmin = user?.roles.includes("ROLE_ADMIN") ?? false

    return(
        <AuthContext.Provider value={{ user, token, logout, login, isAdmin, isAuthLoading, setIsAuthLoading }}>
            { children}
        </AuthContext.Provider>
    )

}
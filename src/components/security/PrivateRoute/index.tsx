// import {ReactNode, useEffect} from "react";
// import {useAuth} from "@/hooks/useAuth";
// import {useRouter} from "next/router";
//
// interface PrivateRouteProps {
//     children: ReactNode;
// }
//
// export const PrivateRoute = ({children}: PrivateRouteProps) => {
//
//     const {token} = useAuth();
//     const router = useRouter();
//
//     useEffect(() => {
//         if (!token) {
//             router.replace("/")
//         }
//     }, [token]);
//
//     if (!token) return null; // Evita flicker
//
//     return <>{children} </>
// }

import {ReactNode, useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/router";

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const {token, isAuthLoading} = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isAuthLoading && !token) {
            router.replace("/");
        }
    }, [token, isAuthLoading]);

    if (!mounted || isAuthLoading) return null;

    return <>{children}</>;
}

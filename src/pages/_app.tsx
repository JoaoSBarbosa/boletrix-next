'use client';
import '@/styles/globals.css'

import 'react-toastify/dist/ReactToastify.css';

import type {AppProps} from 'next/app'
import {ToastContainer} from "react-toastify";
import {ToastProvider} from "@/components/toast/ToastProvider";
import {AuthContextProvider} from "@/context/AuthContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthContextProvider>
            <ToastProvider/>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}

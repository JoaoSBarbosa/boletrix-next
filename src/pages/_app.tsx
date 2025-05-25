'use client';
import '@/styles/globals.css'

import 'react-toastify/dist/ReactToastify.css';

import type {AppProps} from 'next/app'
import {ToastContainer} from "react-toastify";
import {ToastProvider} from "@/components/toast/ToastProvider";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <ToastProvider/>
            <Component {...pageProps} />
        </>
    )
}

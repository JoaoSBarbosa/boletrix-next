'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ToastProvider() {
    return (
        <ToastContainer
            position="top-center"
            theme="dark"
            autoClose={6500}
        />
    );
}

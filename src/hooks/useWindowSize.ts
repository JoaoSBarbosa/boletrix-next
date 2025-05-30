// Hook para obter o tamanho da janela
import {useEffect, useState} from "react";

export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: 0,  // Valor inicial 0 para evitar referência ao `window` no SSR
        height: 0, // Mesmo para altura
    });

    useEffect(() => {
        // Verificar se está no cliente
        if (typeof window !== "undefined") {
            // Agora é seguro acessar `window`
            const handleResize = () => {
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            // Definir o tamanho inicial
            handleResize();

            // Adicionar o listener para redimensionamento da janela
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []); // Este efeito só é executado no cliente

    return size;
};

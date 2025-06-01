export const Footer = () => {
    return (
        <footer className="w-full bg-primary text-gray-300 px-6 py-4 shadow-inner">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
                <div className="text-center md:text-left">
                    © {new Date().getFullYear()} <span className="font-semibold text-white">Boletrix</span>. Todos os direitos reservados.
                </div>

                <div className="text-center md:text-right">
                    Desenvolvido por <a
                    href="https://joaobarbosadev.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondaryColor hover:underline transition"
                >
                    Barbosa Code
                </a>
                </div>
            </div>
        </footer>
    );
};

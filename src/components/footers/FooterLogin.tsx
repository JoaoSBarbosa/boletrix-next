export const FooterLogin = () =>{
    return(
        <footer className="mt-auto text-center text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-1">
                Desenvolvido por{" "}
                <a
                    href="https://www.linkedin.com/in/devjbarbosa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline font-semibold"
                >
                    João Barbosa
                </a>
            </p>
            <p className={"text-blue-600"}>
                <a
                    href="https://joaobarbosadev.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:underline"
                >
                    Barbosa Code
                </a> | Boletrix{" "}
                &copy; {new Date().getFullYear()}
            </p>
        </footer>

    )
}
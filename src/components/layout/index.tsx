import {Header} from "@/components/layout/header";
import {Main} from "@/components/layout/main";
import {Footer} from "@/components/layout/footer";

interface LayoutProps {
    children?: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {

    return (
        <section className={"w-screen min-h-[100dvh] flex flex-col bg-gray-50 "}>
            <Header/>
            <div className="flex-1 w-full">
                <Main>{children}</Main>
            </div>
        </section>
    )
}
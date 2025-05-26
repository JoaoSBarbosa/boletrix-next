import {Header} from "@/components/layout/header";
import {Main} from "@/components/layout/main";

interface LayoutProps {
    children?: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {

    return(
        <section className={"w-screen h-screen flex flex-col items-center  border border-gray-200"}>

            <Header/>
            <Main>
                { children }
            </Main>
        </section>
    )
}
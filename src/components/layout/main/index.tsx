interface MainProps {
    children: React.ReactNode;
}

export const Main = ({children}: MainProps) => {
    return (
        <div className={"w-full h-full p-4 text-gray-900"}>
            {children}
        </div>
    )
}
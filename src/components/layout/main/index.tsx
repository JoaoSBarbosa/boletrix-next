interface MainProps {
    children: React.ReactNode;
}

export const Main = ({children}: MainProps) => {
    return (
        <div className={"w-full p-4 text-gray-900"}>
            {children}
        </div>
    )
}
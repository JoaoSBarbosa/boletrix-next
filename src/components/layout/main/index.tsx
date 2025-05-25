interface MainProps {
    children: React.ReactNode;
}

export const Main = ({children}: MainProps) => {
    return (
        <div>
            {children}
        </div>
    )
}
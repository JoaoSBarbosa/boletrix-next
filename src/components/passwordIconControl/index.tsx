import {FaEye, FaEyeSlash} from "react-icons/fa";
import {KeyIcon} from "@phosphor-icons/react";

interface PasswordIconControlProps {
    showPassword: boolean,
    setShowPassword: (cond: boolean) => void;
    value: string;
}

export const PasswordIconControl = ({showPassword, setShowPassword, value}: PasswordIconControlProps) => {
    return (


        value ?

            (
                showPassword ?
                    <FaEyeSlash
                        size={24}
                        color={"#b91c1c"}
                        className={"cursor-pointer"}
                        title={"Ocultar senha"}
                        onClick={() => setShowPassword(false)}
                    />
                    :
                    <FaEye
                        size={24}
                        color={"#15803d"}
                        className={"cursor-pointer"}
                        title={"Visualizar senha"}
                        onClick={() => setShowPassword(true)}
                    />
            )
            :
            <KeyIcon/>




    )
}
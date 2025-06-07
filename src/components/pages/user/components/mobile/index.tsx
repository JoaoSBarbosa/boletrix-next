import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import {UserResponseType} from "@/types/user/UserResponseType";
import * as Form from "../../../../Forms";
import {InputText} from "@/components/inputs/InputText";
import {KeyIcon, ShieldCheckIcon, TrashIcon} from "@phosphor-icons/react";
import {EditUserSystemDialog} from "@/components/pages/user/dialogs/EditUserSystemDialog";
import {useAuth} from "@/hooks/useAuth";
import {handleRoleStatus} from "@/util/util";
import {Alert} from "@/components/alert";
import {TableSpanButton, ThemeSpan} from "@/components/buttons";
import {IoBackspace} from "react-icons/io5";

interface MobileUserTableProps {
    list: UserResponseType[];
    title?: string;
    onDelete: (data: UserResponseType) => void;
    isSmallScreen: boolean;
    reloadData: () => void;
}

export const MobileUserTable = (
    {
        reloadData,
        isSmallScreen,
        onDelete,
        title,
        list

    }: MobileUserTableProps
) => {
    const {user} = useAuth();
    return (
        list?.map((item, index) => (

            <Form.Form flexDirection={"column"} customStyles={"bg-gray-800 rounded-md mb-4"}>
                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        isDark={true}
                        title={"Nº"}
                        value={item?.id}
                        width={"50%"}
                    >
                        <KeyIcon/>
                    </InputText>

                </Form.FormRows>
                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        isDark={true}
                        title={"Name"}
                        value={item?.name}
                        width={"100%"}
                    />
                </Form.FormRows>

                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        isDark={true}
                        title={"E-mail"}
                        value={item?.email}
                        width={"100%"}
                    />
                </Form.FormRows>


                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        isDark={true}
                        title={"Acesso"}
                        value={handleRoleStatus(item?.roles[0].name)}
                        width={"100%"}
                    >
                        <ShieldCheckIcon/>
                    </InputText>

                </Form.FormRows>


                <div className={"w-full flex items-center justify-between"}>
                    <EditUserSystemDialog
                        user={item} reloadData={reloadData}
                    />

                    <Alert
                        titleAlert={`Confirmação de Exclusão`}
                        descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir o registro de pagamentos '${
                            item?.id ? "Nº" + item.id : ""
                        }' do sistema?`}
                        button={
                            <TableSpanButton
                                info={"Excluir registro de Cliente"}
                                width={"max-content"}
                                notBg={true}
                                theme={ThemeSpan.RED}
                            >
                                <TrashIcon
                                    size={32}
                                    color={"#b91c1c"}
                                    className={"cursor-pointer inline-flex"}
                                />
                            </TableSpanButton>
                        }
                        onAccept={() => onDelete(item)}
                    />
                </div>
            </Form.Form>
        ))
    )
}
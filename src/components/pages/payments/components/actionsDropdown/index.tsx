import DropdownMenuCustom, {DropdownItemButton} from "@/components/dropdown";
import {TrashIcon} from "@phosphor-icons/react";
import {BgColor, ButtonRef, ButtonType} from "@/components/buttons";
import {ButtonTypeEnum, GeneratedPaymentsDialog} from "@/components/pages/payments/dialogs/GeneratedPaymentsDialog";
import {Alert} from "@/components/alert";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {Settings2} from "lucide-react";

interface ActionsDropdownProps {
    length?: number;
    handleDeleteAll: () => void;
    reload: () => void;
}

export const ActionsDropdown = ({length, handleDeleteAll, reload}: ActionsDropdownProps) => {
    return (
        <DropdownMenuCustom
            trigger={
                <ButtonRef width="max-content" value="Ações" type={ButtonType.BUTTON} bgColor={BgColor.SECONDARY}>
                    <Settings2 size={18} />
                </ButtonRef>
            }
            sideOffset={1}
        >
            <div className="flex flex-col gap-2 w-64">
                {length && length > 0 && (
                    <DropdownMenu.Item>
                        <Alert
                            titleAlert="Confirmação de Exclusão"
                            descriptionAlert="Atenção! Esta ação é irreversível. Deseja mesmo apagar os registros?"
                            button={
                                <DropdownItemButton label={"Deletar todos"}>
                                    <TrashIcon/>
                                </DropdownItemButton>
                            }
                            onAccept={handleDeleteAll}
                        />
                    </DropdownMenu.Item>
                )}

                <div onClick={(e) => e.stopPropagation()}>
                    <GeneratedPaymentsDialog reload={reload} buttonType={ButtonTypeEnum.DROPDOWN} />
                </div>
              {/*<DropdownMenu.Item>*/}
              {/*    <GeneratedPaymentsDialog reload={reload} buttonType={ButtonTypeEnum.DROPDOWN}/>*/}
              {/*</DropdownMenu.Item>*/}
            </div>
        </DropdownMenuCustom>
    );
};

import DropdownMenuCustom, {
  ActionsDropdownItem,
  DropdownItemButton,
} from "@/components/dropdown";
import { GearSixIcon, TrashIcon } from "@phosphor-icons/react";
import { BgColor, ButtonRef, ButtonType } from "@/components/buttons";
import {
  ButtonTypeEnum,
  GeneratedPaymentsDialog,
} from "@/components/pages/payments/dialogs/GeneratedPaymentsDialog";
import { Alert } from "@/components/alert";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Settings2 } from "lucide-react";
import { ReactNode } from "react";
import { GeneratedOnePaymentDialog } from "../../dialogs/GeneratedOnePaymentDialog";

interface ActionsDropdownProps {
  length: number;
  debitId?: number;
  handleDeleteAll: () => void;
  reload: () => void;
}

export const ActionsDropdown = ({
  length,
  handleDeleteAll,
  reload,
  debitId,
}: ActionsDropdownProps) => {
  return (
    <DropdownMenuCustom
      trigger={
        <ButtonRef
          width="max-content"
          value=""
          type={ButtonType.BUTTON}
          bgColor={BgColor.PRIMARY_SYSTEM}
        >
          <GearSixIcon size={24} weight={"fill"} />
        </ButtonRef>
      }
      sideOffset={1}
    >
      <div className="flex flex-col gap-2 w-64">
        {length > 0 && (
          <ActionsDropdownItem>
            <Alert
              titleAlert="Confirmação de Exclusão"
              descriptionAlert="Atenção! Esta ação é irreversível. Deseja mesmo apagar os registros?"
              button={
                <DropdownItemButton label={"Deletar todos"}>
                  <TrashIcon />
                </DropdownItemButton>
              }
              onAccept={handleDeleteAll}
            />
          </ActionsDropdownItem>
        )}

        <ActionsDropdownItem>
          <GeneratedPaymentsDialog
            reload={reload}
            buttonType={ButtonTypeEnum.DROPDOWN}
          />
        </ActionsDropdownItem>

        {debitId && length > 0 && (
          <ActionsDropdownItem>
            <GeneratedOnePaymentDialog
              reload={reload}
              debtId={debitId}
              buttonType={ButtonTypeEnum.DROPDOWN}
            />
          </ActionsDropdownItem>
        )}

        {/*<DropdownMenu.Item>*/}
        {/*    <GeneratedPaymentsDialog reload={reload} buttonType={ButtonTypeEnum.DROPDOWN}/>*/}
        {/*</DropdownMenu.Item>*/}
      </div>
    </DropdownMenuCustom>
  );
};

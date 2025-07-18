import { Modal } from "@/components/modal";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Pencil, Plus } from "lucide-react";
import { BgColor, Button, ButtonType } from "@/components/buttons";
import ApiConnection from "@/util/api";
import { showToastMessage } from "@/util/util";
import * as Form from "../../../Forms";
import { CurrencyInputText, InputText } from "../../../inputs/InputText";
import {
  CalendarIcon,
  HandCoinsIcon,
  MoneyIcon,
  ReceiptIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { DropdownItemButton } from "@/components/dropdown";
import { useWindowSize } from "@/hooks/useWindowSize";

export enum ButtonTypeEnum {
  DEFAULT = "default",
  DROPDOWN = "dropdown",
}

interface GeneratedOnePaymentDialogProps {
  reload: () => void;
  debtId: number;
  buttonType?: ButtonTypeEnum;
}

export const GeneratedOnePaymentDialog = ({
  reload,
  debtId,
  buttonType = ButtonTypeEnum.DEFAULT,
}: GeneratedOnePaymentDialogProps) => {
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [amount, setamount] = useState<string>("");
  const [date, setdate] = useState<string>("");
  const { width } = useWindowSize();
  const isSmallScreen = width <= 640;

  const cleanValues = () => {
    setamount("");
    setdate("");
    setShowModal(false);
  };
  function parseBrazilianCurrency(value: string): number {
    return Number(
      value
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.]/g, "")
    );
  }

  async function handleInsertInstallment() {
    if (!amount || !date) {
      showToastMessage({
        type: "warn",
        message:
          "Os campos 'Valor parcela' e 'Data da parcela' são obrigatorios",
      });
      return;
    }
    if (!debtId) {
      showToastMessage({
        type: "warn",
        message: "Ocorreu um erro inesperado ! O id da dívida está ausente",
      });
      return;
    }
    try {
      await ApiConnection(window.location.href).post(`/installments/manual`, {
        amount: parseBrazilianCurrency(amount),
        date,
        debtId,
      });

      showToastMessage({
        type: "success",
        message: "Parcela cadastrada com sucesso!",
      });
      cleanValues();
      if (reload) reload();
    } catch (error) {
      showToastMessage({
        type: "error",
        message: "Erro ao cadastrar boletos: " + error,
      });
    }
  }

  const displayButtonType = () => {
    switch (buttonType) {
      case ButtonTypeEnum.DROPDOWN:
        return (
          <DropdownItemButton label="Adicionar parcela">
            <Plus size={16} />
          </DropdownItemButton>
        );

      case ButtonTypeEnum.DEFAULT:
      default:
        return (
          <Button
            type={ButtonType.BUTTON}
            value="Adicionar parcela"
            width="max-content"
          >
            <Plus size={16} />
          </Button>
        );
    }
  };

  return (
    <Modal
      open={showModal}
      setOpen={setShowModal}
      title={"Adicionar parcela"}
      width={isSmallScreen ? "95%" : 400}
      trigger={displayButtonType()}
    >
      <Form.Form flexDirection={"column"}>
        <Form.FormRows justifyContent={"flex-start"}>
          <CurrencyInputText
            title={"Valor por Parcela"}
            value={amount}
            width={"100%"}
            placeholder={"Ex.: 3500.00"}
            onValueChange={(value) => setamount(value || "")}
          >
            <MoneyIcon />
          </CurrencyInputText>
        </Form.FormRows>

        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            type={"date"}
            title={"Data da Parcela"}
            value={date}
            width={"100%"}
            onChange={(e) => setdate(e.target.value)}
          />
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <Button
            width={"max-content"}
            type={ButtonType.BUTTON}
            value={"Gerar Parcela"}
            bgColor={BgColor.GREEN}
            onClick={handleInsertInstallment}
          >
            <HandCoinsIcon />
          </Button>
        </Form.FormRows>
      </Form.Form>
    </Modal>
  );
};

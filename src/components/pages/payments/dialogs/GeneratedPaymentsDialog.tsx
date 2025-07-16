import { Modal } from "@/components/modal";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Pencil } from "lucide-react";
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

interface GeneratedPaymentsDialogProps {
  reload: () => void;
  buttonType?: ButtonTypeEnum;
}

export const GeneratedPaymentsDialog = ({
  reload,
  buttonType = ButtonTypeEnum.DEFAULT,
}: GeneratedPaymentsDialogProps) => {
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [monthlyAmount, setMonthlyAmount] = useState<string>("");
  const [initialDate, setInitialDate] = useState<string>("");
  const { width } = useWindowSize();
  const isSmallScreen = width <= 640;
  // useEffect(() => {
  //     if (user) {
  //         setTotalAmount(user.name);
  //         setMonthlyAmount(user.email);
  //     }
  // }, [user]);

  const cleanValues = () => {
    setTotalAmount("");
    setMonthlyAmount("");
    setInitialDate("");
    setShowModal(false);
  };

  async function handleGeneretadePayments() {
    if (!totalAmount || !monthlyAmount || !initialDate) {
      showToastMessage({
        type: "warn",
        message:
          "Os campos 'Valor Total', 'Valor por Parcela' e 'Data inicial' são obrigatorios",
      });
      return;
    }
    try {
      await ApiConnection(window.location.href).post(`/debts`, {
        totalAmount,
        monthlyAmount,
        initialDate,
      });

      showToastMessage({
        type: "success",
        message: "Parcelas geradas com sucesso!",
      });
      cleanValues();
      if (reload) reload();
    } catch (error) {
      showToastMessage({
        type: "error",
        message: "Erro ao tentar obter a lista de boletos: " + error,
      });
    }
  }

  const displayButtonType = () => {
    switch (buttonType) {
      case ButtonTypeEnum.DROPDOWN:
        return (
          <DropdownItemButton label="Gerar parcelas">
            <Pencil size={16} />
          </DropdownItemButton>
        );

      case ButtonTypeEnum.DEFAULT:
      default:
        return (
          <Button
            type={ButtonType.BUTTON}
            value="Gerar parcelas"
            width="max-content"
          >
            <Pencil size={16} />
          </Button>
        );
    }
  };

  return (
    <Modal
      open={showModal}
      setOpen={setShowModal}
      title={"Gerar parcelas"}
      width={isSmallScreen ? "95%" : 400}
      trigger={displayButtonType()}
    >
      <Form.Form flexDirection={"column"}>
        <Form.FormRows justifyContent={"flex-start"}>
          <CurrencyInputText
            title={"Valor Total"}
            value={totalAmount}
            width={"100%"}
            placeholder={"Ex.: 3500.00"}
            onValueChange={(value) => setTotalAmount(value || "")}
          >
            <MoneyIcon />
          </CurrencyInputText>
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            title={"Valor por Parcela"}
            value={monthlyAmount}
            width={"100%"}
            placeholder={"Ex.: 300.00"}
            onChange={(e) => setMonthlyAmount(e.target.value)}
          >
            <ReceiptIcon />
          </InputText>
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            type={"date"}
            title={"Data inicial das Parcela"}
            value={initialDate}
            width={"100%"}
            placeholder={"Ex.: 300.00"}
            onChange={(e) => setInitialDate(e.target.value)}
          />
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <Button
            width={"max-content"}
            type={ButtonType.BUTTON}
            value={"Gerar Parcelas"}
            bgColor={BgColor.GREEN}
            onClick={handleGeneretadePayments}
          >
            <HandCoinsIcon />
          </Button>
        </Form.FormRows>
      </Form.Form>

      {/*<form className="space-y-4">*/}
      {/*    <input*/}
      {/*        type="text"*/}
      {/*        placeholder="Valor total"*/}
      {/*        value={totalAmount}*/}
      {/*        onChange={(e) => setTotalAmount(e.target.value)}*/}
      {/*        className="w-full border px-3 py-2 rounded"*/}
      {/*    />*/}
      {/*    <input*/}
      {/*        type="text"*/}
      {/*        value={monthlyAmount}*/}
      {/*        onChange={(e) => setMonthlyAmount(e.target.value)}*/}
      {/*        placeholder="Valor por parcela"*/}
      {/*        className="w-full border px-3 py-2 rounded"*/}
      {/*    />*/}

      {/*    <input*/}
      {/*        type="date"*/}
      {/*        value={initialDate}*/}
      {/*        onChange={(e) => setInitialDate(e.target.value)}*/}
      {/*        placeholder="Data inicial"*/}
      {/*        className="w-full border px-3 py-2 rounded"*/}
      {/*    />*/}

      {/*    <button*/}
      {/*        type="button"*/}
      {/*        onClick={handleGeneretadePayments}*/}
      {/*        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"*/}
      {/*    >*/}
      {/*        Gerar pareclas*/}
      {/*    </button>*/}
      {/*</form>*/}
    </Modal>
  );
};

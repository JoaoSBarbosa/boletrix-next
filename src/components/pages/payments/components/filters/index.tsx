import DropdownMenuCustom from "@/components/dropdown";
import { BgColor, Button, ButtonRef, ButtonType } from "@/components/buttons";
import { FaFilter } from "react-icons/fa";
import * as Form from "../../../../Forms";
import { CurrencyInputText, InputText } from "@/components/inputs/InputText";
import { CheckBox } from "@/components/checkbox";
import {
  CurrencyCircleDollarIcon,
  FilesIcon,
  FunnelIcon,
} from "@phosphor-icons/react";

export type status = "PENDING" | "PAID" | "";

interface FiltersDropdownProps {
  paymentDate: string;
  setPaymentDate: (value: string) => void;

  invoiceDate: string;
  setInvoiceDate: (value: string) => void;

  status: status;
  setStatus: (value: status) => void;

  amount: string;
  setAmount: (value: string) => void;

  installmentId: string;
  setInstallmentId: (installmentId: string) => void;

  apply: () => void;
  cleanFilter: () => void;
  isMobile: boolean;
}

export const FiltersDropdown = ({
  setStatus,
  status,
  setInvoiceDate,
  invoiceDate,
  isMobile,
  setPaymentDate,
  paymentDate,
  installmentId,
  setInstallmentId,
  amount,
  setAmount,
  apply,
  cleanFilter,
}: FiltersDropdownProps) => {
  const handleCheckStatus = (value: status) => {
    if (status === value) {
      setStatus(""); // Desmarca se já estiver marcado
    } else {
      setStatus(value);
    }
  };

  return (
    <DropdownMenuCustom
      width={isMobile ? 300 : 500}
      trigger={
        <ButtonRef
          width="max-content"
          value=""
          type={ButtonType.BUTTON}
          bgColor={BgColor.PRIMARY_SYSTEM}
        >
          <FunnelIcon size={24} weight={"fill"} />
        </ButtonRef>
      }
      sideOffset={1}
    >
      <Form.Form flexDirection={"column"}>
        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            title={"Nº"}
            width={"40%"}
            justNumber={true}
            value={installmentId}
            placeholder={"Ex.: 1"}
            onChange={(value) => setInstallmentId(value.target.value)}
          >
            <FilesIcon />
          </InputText>
          <CurrencyInputText
            title={"Valor"}
            width={"60%"}
            placeholder={"Ex.: R$ 250,00"}
            value={amount}
            onValueChange={(value) => setAmount(value || "")}
          >
            <CurrencyCircleDollarIcon />
          </CurrencyInputText>
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            title={"Data da Parcela"}
            type={"date"}
            width={"100%"}
            value={invoiceDate}
            onChange={(value) => setInvoiceDate(value.target.value)}
          />
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <h2
            className={
              "text-sm border-b-2 border-secondary text-primaryColor font-bold"
            }
          >
            Data e Hora de Pagamento
          </h2>
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <InputText
            title={"Data"}
            type={"date"}
            width={"60%"}
            value={paymentDate}
            onChange={(value) => setPaymentDate(value.target.value)}
          />
          <InputText
            title={"Hora"}
            type={"time"}
            width={"40%"}
            value={paymentDate}
            onChange={(value) => setPaymentDate(value.target.value)}
          />
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <CheckBox
            title="Apenas faturas pendentes"
            checked={status === "PENDING"}
            onCheckedChange={() => handleCheckStatus("PENDING")}
          />
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <CheckBox
            title="Apenas faturas pagas"
            checked={status === "PAID"}
            onCheckedChange={() => handleCheckStatus("PAID")}
          />
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-start"}>
          <CheckBox
            title="Todas faturas"
            checked={status === ""}
            onCheckedChange={() => handleCheckStatus("")}
          />
        </Form.FormRows>
        <Form.FormRows justifyContent={"flex-end"}>
          <Button
            onClick={cleanFilter}
            value={"Limpar filtros"}
            width={"max-content"}
            type={ButtonType.BUTTON}
            bgColor={BgColor.QUATERNARY_SYSTEM}
          />
          <Button
            onClick={apply}
            value={"Aplicar"}
            width={"max-content"}
            type={ButtonType.BUTTON}
            bgColor={BgColor.PRIMARY_SYSTEM}
          />
        </Form.FormRows>
      </Form.Form>
    </DropdownMenuCustom>
  );
};

import DropdownMenuCustom from "@/components/dropdown";
import {BgColor, Button, ButtonRef, ButtonType} from "@/components/buttons";
import {FaFilter} from "react-icons/fa";
import * as Form from "../../../../Forms";
import {CurrencyInputText, InputText} from "@/components/inputs/InputText";
import {CheckBox} from "@/components/checkbox";

export type status = "PENDING" | "PAID" | "";

interface FiltersDropdownProps {
    paymentDate: string;
    setPaymentDate: (value: string) => void;

    invoiceDate: string;
    setInvoiceDate: (value: string) => void;

    status: status
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
                <ButtonRef width="max-content" value="Filtros" type={ButtonType.BUTTON} bgColor={BgColor.SECONDARY}>
                    <FaFilter size={18}/>
                </ButtonRef>
            }
            sideOffset={1}
        >
            <Form.Form flexDirection={"column"}>

                <Form.FormRows justifyContent={"flex-start"}>
                    <InputText
                        title={"Nº"}
                        type={"number"}
                        width={"40%"}
                        value={installmentId}
                        onChange={(value) => setInstallmentId(value.target.value)}
                    />
                    <CurrencyInputText
                        title={"Valor"}
                        width={"60%"}
                        value={amount}
                        onValueChange={(value) => setAmount(value || "")}
                    />
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
                    <InputText
                        title={"Data de Pagamento"}
                        type={"date"}
                        width={"100%"}
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
}
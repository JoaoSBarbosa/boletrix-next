import {Modal} from "@/components/modal";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {TableSpanButton, ThemeSpan} from "@/components/buttons";
import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import * as Form from "../../../Forms";
import {CurrencyInputText, InputText} from "../../../inputs/InputText";
import {FaKey} from "react-icons/fa";
import {MdPayments} from "react-icons/md";
import {NotePencilIcon} from "@phosphor-icons/react";

interface EditInstallmentDialogProps {
    installment: InstallmentResponseType;
    iconSize?: number;
}

export const EditInstallmentDialog = ({installment, iconSize = 24}: EditInstallmentDialogProps) => {

    const {user} = useAuth();

    const [showModal, setShowModal] = useState(false);

    const [installmentNumber, setInstallmentNumber] = useState<string>("");
    const [paymentDate, setPaymentDate] = useState<string>("");
    const [installmentDate, setInstallmentDate] = useState<string>("");
    const [amount, setAmount] = useState<string>("");


    useEffect(() => {
        if (showModal && installment) {
            setInstallmentNumber(installment.installment_number);
            setPaymentDate(installment.payment_date);
            setInstallmentDate(installment.installment_date);
            setAmount(installment.amount ? String(installment.amount) : "");
        }
    }, [showModal]);

    return (
        <Modal
            open={showModal}
            setOpen={setShowModal}
            title={"Edição de Parcela"}
            width={600}
            trigger={
                <TableSpanButton
                    info={"Editar registro de Cliente"}
                    width={'max-content'}
                    notBg={true}
                    theme={ThemeSpan.BLUE}
                >
                    <NotePencilIcon size={iconSize} weight={'regular'} color={"#075985"} className={"cursor-pointer inline-flex"}/>

                </TableSpanButton>

            // <UserMenuButton name={"Editar"} icon={<Pencil size={16}/>}/>

        }
        >
            <Form.FormColumns
                justifyContent={'flex-start'}
                classNameCustom={"p-2 my-2"}
            >
                <Form.FormRows justifyContent={'flex-start'}>
                    <InputText
                        title={'Código'}
                        value={installment?.id}
                        placeholder={'Ex.: 21'}
                        width={'15%'}
                        justNumber={true}
                        maxLength={6}
                    >
                        <FaKey size={'16px'}/>
                    </InputText>

                    <InputText
                        width={'85%'}
                        maxLength={50}
                        title={'Número da parcela'}
                        placeholder={'Ex.: 3'}
                        value={installmentNumber}
                        onChange={(e) => setInstallmentNumber(e.target.value)}
                    >
                        <MdPayments size={'16px'}/>
                    </InputText>
                </Form.FormRows>
                <Form.FormRows justifyContent={'flex-start'}>
                    <CurrencyInputText
                        title={'Valor'}
                        value={amount}
                        placeholder={'Ex.: 250,00'}
                        width={'50%'}
                        maxLength={50}
                        onChange={(event) => setAmount(event.target.value)}
                    >
                        <MdPayments size={'16px'}/>
                    </CurrencyInputText>

                    <InputText
                        width={'50%'}
                        type={"date"}
                        maxLength={50}
                        title={'Data da parcela'}
                        value={installmentDate}
                        onChange={(e) => setInstallmentDate(e.target.value)}
                    />

                    <InputText
                        width={'50%'}
                        type={"date"}
                        maxLength={50}
                        title={'Data da pagamento'}
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                    />
                </Form.FormRows>
            </Form.FormColumns>
        </Modal>
    )
}
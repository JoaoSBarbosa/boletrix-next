import {Modal} from "@/components/modal";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {BgColor, Button, ButtonType, TableSpanButton, ThemeSpan} from "@/components/buttons";
import {InstallmentResponseType} from "@/types/InstallmentResponseType";
import * as Form from "../../../Forms";
import {NotePencilIcon} from "@phosphor-icons/react";
import {useWindowSize} from "@/hooks/useWindowSize";
import {CardStatus, CardStatusChildren, showToastMessage, typeStatus} from "@/util/util";
import {Selection} from "@/components/select";
import {InputText} from "@/components/inputs/InputText";
import ApiConnection from "@/util/api";
import {Loading} from "@/components/Loadings";

interface InstallmentStatusProps {
    installment: InstallmentResponseType,
    reloadData: (data: InstallmentResponseType) => void;
    isSmallScreen: boolean;
}

export const InstallmentStatus = ({installment, reloadData, isSmallScreen }: InstallmentStatusProps) => {


    const [status, setStatus] = useState<string>("");
    const [paymentTime, setPaymentTime] = useState<string>("");
    const [paymentDate, setPaymentDate] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);

    async function handleUpdateStatus() {

        if (status === 'PAID' && (!paymentDate || !paymentTime) || !installment?.id) {
            const missingFields: string[] = [];
            if (!installment?.id) missingFields.push("ID do registro")
            if (status === 'PAID' && (!paymentDate)) missingFields.push("Data de pagamento")
            if (status === 'PAID' && (!paymentTime)) missingFields.push("Hora de pagamento")
            showToastMessage({
                type: "warning",
                message: `${missingFields.length > 1 ? "Os campos" : ' O campo'}:  ${missingFields.join(', ')} ${missingFields.length > 1 ? "são obrigatórios" : ' é obrigatório'}.`
            })
            return;
        }

        setShowLoading(true)
        try {
           const response = await ApiConnection(window.location.href).patch(`/installments/${installment.id}/status`, {
                paymentDate,
                paymentTime,
                status
            });

            showToastMessage({
                type: "success",
                message: "Registro atualizado com sucesso!"
            });
            if( response?.data && reloadData) reloadData(response.data);

            setShowModal(false);
        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar atualizar o status de pagamento"
            })
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        setPaymentDate("");
        setStatus("");
        setPaymentTime("");
    }, [showModal]);
    useEffect(() => {
        if (showModal && installment) {
            console.log("PARCELA: ", installment)
            setPaymentDate(installment.paymentDate);
            setStatus(!installment?.status ? "PENDING" : installment?.status)
            setPaymentTime(installment.paymentTime)
        }
    }, [showModal]);

    return (
        <Modal
            padding={isSmallScreen ? "p-2" : "p-6"}
            open={showModal}
            setOpen={setShowModal}
            title={showLoading ? "Carregando..." : "Edição de Parcela"}
            width={isSmallScreen ? "95%" : 450}
            trigger={
                <CardStatusChildren status={installment?.status}>
                    <NotePencilIcon weight={'regular'}/>
                </CardStatusChildren>
            }
        >
            {showLoading ?
                <Loading title={"Atualizando status da parcela"}
                         message={"Por favor, aguarde. Estamos realizando a operação"}/>
                :
                <Form.Form flexDirection={"column"}>
                    <Form.FormRows>
                        <Selection
                            title={'Status'}
                            groupName={'Tipo de Emissão'}
                            optionsList={typeStatus}
                            width={'100%'}
                            value={status}
                            onValueChange={(newValue: string) => setStatus(newValue)}
                        />
                    </Form.FormRows>
                    <Form.FormRows>
                        <InputText
                            width={'100%'}
                            type={"date"}
                            title={'Data pagamento'}
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                        />
                    </Form.FormRows>
                    <Form.FormRows>
                        <InputText
                            width={'100%'}
                            type={"time"}
                            title={'Hora pagamento'}
                            value={paymentTime}
                            onChange={(e) => setPaymentTime(e.target.value)}
                        />
                    </Form.FormRows>
                    <Form.FormRows justifyContent={"flex-end"}>
                        <Button
                            onClick={handleUpdateStatus}
                            value={"Atualizar"}
                            width={"max-content"}
                            type={ButtonType.BUTTON}
                            bgColor={BgColor.PRIMARY_SYSTEM}
                        />
                    </Form.FormRows>
                </Form.Form>

            }

        </Modal>
    )
}
import { Modal } from "@/components/modal";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  BgColor,
  Button,
  ButtonType,
  TableSpanButton,
  ThemeSpan,
} from "@/components/buttons";
import { InstallmentResponseType } from "@/types/InstallmentResponseType";
import * as Form from "../../../Forms";
import { CurrencyInputText, InputText } from "../../../inputs/InputText";
import { FaKey } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { MoneyIcon, NotePencilIcon } from "@phosphor-icons/react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Selection, SelectionOptionsProps } from "@/components/select";
import {
  showToastMessage,
  typeStatus,
  VerifyStatus,
  VerifyStatus2,
} from "@/util/util";
import ApiConnection from "@/util/api";
import { AxiosResponse } from "axios";
import { Loading } from "@/components/Loadings";

interface EditInstallmentDialogProps {
  installment: InstallmentResponseType;
  iconSize?: number;
  reload?: (update: InstallmentResponseType) => void;
}

export const EditInstallmentDialog = ({
  installment,
  iconSize = 24,
  reload,
}: EditInstallmentDialogProps) => {
  const { user } = useAuth();

  const { width } = useWindowSize();
  const isSmallScreen = width <= 640;

  const [showLoading, setShowLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [installmentNumber, setInstallmentNumber] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [paymentTime, setPaymentTime] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [installmentDate, setInstallmentDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (showModal && installment) {
      setInstallmentNumber(installment.installmentNumber);
      setPaymentDate(installment.paymentDate);
      setStatus(!installment?.status ? "PENDING" : installment?.status);
      setInstallmentDate(installment.installmentDate);
      setAmount(installment.amount ? String(installment.amount) : "");
      setPaymentTime(installment.paymentTime);
    }
  }, [showModal]);

  async function handleUpdateRegister() {
    if (
      (status === "PAID" && !paymentDate) ||
      !installmentDate ||
      !amount ||
      !installment?.id
    ) {
      const missingFields: string[] = [];
      if (!installment?.id) {
        missingFields.push("ID do registro");
      }
      if (status === "PAID" && !paymentDate) {
        missingFields.push("Data de pagamento");
      }
      if (!installmentDate) {
        missingFields.push("Data da parcela");
      }
      if (!amount) {
        missingFields.push("Valor do documento");
      }
      showToastMessage({
        type: "warning",
        message: `${
          missingFields.length > 1 ? "Os campos" : " O campo"
        }:  ${missingFields.join(", ")} ${
          missingFields.length > 1 ? "são obrigatórios" : " é obrigatório"
        }.`,
      });
      return;
    }
    setShowLoading(true);
    try {
      const data: AxiosResponse<InstallmentResponseType> = await ApiConnection(
        window.location.href
      ).patch(`/installments/${installment?.id}`, {
        amount,
        paymentDate,
        paymentTime,
        installmentNumber,
        status,
      });

      showToastMessage({
        type: "success",
        message: "Registro atualizado com sucesso!",
      });
      if (data?.data && reload) {
        reload(data.data);
      }
      setShowModal(false);
    } catch (err) {
      showToastMessage({
        type: "error",
        message: "Erro ao tentar atualizar o registro",
      });
    } finally {
      setShowLoading(false);
    }
  }

  return (
    <Modal
      padding={isSmallScreen ? "p-2" : "p-6"}
      open={showModal}
      setOpen={setShowModal}
      title={showLoading ? "Carregando..." : "Edição de Parcela"}
      // width={isSmallScreen ? 100 : 600}
      width={isSmallScreen ? "95%" : 600}
      trigger={
        <TableSpanButton
          info={"Editar registro de Cliente"}
          width={"max-content"}
          notBg={true}
          theme={ThemeSpan.BLUE}
        >
          <NotePencilIcon
            size={iconSize}
            weight={"regular"}
            color={"#075985"}
            className={"cursor-pointer inline-flex"}
          />
        </TableSpanButton>

        // <UserMenuButton name={"Editar"} icon={<Pencil size={16}/>}/>
      }
    >
      {showLoading ? (
        <Loading
          title={"Atualizando registro"}
          message={"Por favor, aguarde. Estamos realizando a operação"}
        />
      ) : (
        <Form.FormColumns
          justifyContent={"flex-start"}
          classNameCustom={"p-2 my-2"}
        >
          <Form.FormRows justifyContent={"flex-start"}>
            <InputText
              title={"Código"}
              value={installment?.id}
              placeholder={"Ex.: 21"}
              width={"50%"}
              justNumber={true}
              disabled={true}
              isDisabled={true}
              maxLength={6}
            >
              <FaKey size={"50%"} />
            </InputText>

            <InputText
              title={"Status"}
              value={VerifyStatus2(status)}
              width={"50%"}
              disabled={true}
              isDisabled={true}
            >
              <MoneyIcon size={"50%"} />
            </InputText>
            {/* <Selection
                            title={'Status'}
                            groupName={'Tipo de Emissão'}
                            optionsList={typeStatus}
                            width={'50%'}
                            value={status}
                            onValueChange={(newValue: string) => setStatus(newValue)}
                        /> */}
          </Form.FormRows>
          <Form.FormRows justifyContent={"flex-start"}>
            {/*<InputText*/}
            {/*    width={'50%'}*/}
            {/*    maxLength={50}*/}
            {/*    title={'Nº parcela'}*/}
            {/*    placeholder={'Ex.: 3'}*/}
            {/*    value={installmentNumber}*/}
            {/*    onChange={(e) => setInstallmentNumber(e.target.value)}*/}
            {/*>*/}
            {/*    <MdPayments size={'16px'}/>*/}
            {/*</InputText>*/}
            <CurrencyInputText
              title={"Valor"}
              value={amount}
              placeholder={"Ex.: 250,00"}
              width={"50%"}
              maxLength={50}
              onValueChange={(value) => setAmount(value ?? "")}
            >
              <MdPayments size={"16px"} />
            </CurrencyInputText>
            <InputText
              width={"50%"}
              type={"date"}
              maxLength={50}
              title={"Data parcela"}
              value={installmentDate}
              onChange={(e) => setInstallmentDate(e.target.value)}
            />
          </Form.FormRows>
          <Form.FormRows>
            <InputText
              width={"50%"}
              type={"date"}
              maxLength={50}
              title={"Data pagamento"}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
            <InputText
              width={"50%"}
              type={"time"}
              maxLength={50}
              title={"Hora pagamento"}
              value={paymentTime}
              onChange={(e) => setPaymentTime(e.target.value)}
            />
          </Form.FormRows>
          <Form.FormRows justifyContent={"flex-end"}>
            <Button
              onClick={handleUpdateRegister}
              value={"Atualizar"}
              width={"max-content"}
              type={ButtonType.BUTTON}
              bgColor={BgColor.PRIMARY_SYSTEM}
            />
          </Form.FormRows>
        </Form.FormColumns>
      )}
    </Modal>
  );
};

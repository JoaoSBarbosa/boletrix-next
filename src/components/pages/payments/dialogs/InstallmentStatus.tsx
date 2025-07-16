import { Modal } from "@/components/modal";
import { useEffect, useRef, useState } from "react";
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
import {
  DownloadSimpleIcon,
  EyeIcon,
  NotePencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  CardStatus,
  CardStatusChildren,
  showToastMessage,
  typeStatus,
} from "@/util/util";
import { Selection } from "@/components/select";
import { InputText } from "@/components/inputs/InputText";
import ApiConnection from "@/util/api";
import { DownloadingOrDeletingBox, Loading } from "@/components/Loadings";
import { InputFile } from "@/components/inputs/inputFile";
import { AxiosResponse } from "axios";

interface InstallmentStatusProps {
  installment: InstallmentResponseType;
  reloadData: (data: InstallmentResponseType) => void;
  isSmallScreen: boolean;
  width?: string | number;
  isMobile: boolean;
}

export const InstallmentStatus = ({
  installment,
  isMobile,
  width,
  reloadData,
  isSmallScreen,
}: InstallmentStatusProps) => {
  const MESSAGE = "Por favor, aguarde. Estamos realizando a operação";
  const [status, setStatus] = useState<string>("");
  const [paymentTime, setPaymentTime] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [isSeenDataAndFile, setIsSeenDataAndFile] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef(null);
  const [selectedFileEdit, setSelectedFileEdit] = useState<File | null>(null);

  async function handleUpdateStatus() {
    if (
      (status === "PAID" && (!paymentDate || !paymentTime)) ||
      !installment?.id
    ) {
      const missingFields: string[] = [];
      if (!installment?.id) missingFields.push("ID do registro");
      if (status === "PAID" && !paymentDate)
        missingFields.push("Data de pagamento");
      if (status === "PAID" && !paymentTime)
        missingFields.push("Hora de pagamento");
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
    const formData = new FormData();

    const data = {
      paymentDate,
      paymentTime,
      status,
    };

    formData.append("data", JSON.stringify(data));
    if (selectedFileEdit) {
      setIsSeenDataAndFile(true);
      formData.append("file", selectedFileEdit);
    } else {
      setIsSeenDataAndFile(false);
    }
    try {
      const response = await ApiConnection(window.location.href).patch(
        `/installments/${installment.id}/status`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showToastMessage({
        type: "success",
        message: "Registro atualizado com sucesso!",
      });
      if (response?.data && reloadData) reloadData(response.data);

      setShowModal(false);
    } catch (error) {
      showToastMessage({
        type: "error",
        message: "Erro ao tentar atualizar o status de pagamento",
      });
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
      setPaymentDate(installment.paymentDate);
      setStatus(!installment?.status ? "PENDING" : installment?.status);
      setPaymentTime(installment.paymentTime);
    }
  }, [showModal]);

  async function handleDeleteReceipt() {
    if (!installment.id) {
      showToastMessage({
        type: "warning",
        message: "Não foi encontrado o ID da parcela",
      });
      return;
    }
    setShowDelete(true);
    try {
      const data: AxiosResponse<InstallmentResponseType> = await ApiConnection(
        window.location.href
      ).delete(`/installments/file/${installment.id}/delete`);
      showToastMessage({
        type: "success",
        message: "Comprovante deletado com sucesso!",
      });
      if (data?.data && reloadData) {
        reloadData(data.data);
      }
    } catch (error) {
      showToastMessage({
        type: "error",
        message: "Erro ao tentar excluir comprovante!",
      });
    } finally {
      setShowDelete(false);
    }
  }

  return (
    <Modal
      padding={isSmallScreen ? "p-2" : "p-6"}
      open={showModal}
      setOpen={setShowModal}
      title={showLoading ? "Carregando..." : "Edição de Parcela"}
      width={isSmallScreen ? "95%" : 500}
      trigger={
        <CardStatusChildren
          status={installment?.status}
          width={width}
          isMobile={isMobile}
        >
          <NotePencilIcon weight={"regular"} />
        </CardStatusChildren>
      }
    >
      {showLoading ? (
        <Loading title={"Atualizando status da parcela"} message={MESSAGE} />
      ) : showDelete ? (
        <DownloadingOrDeletingBox
          isDelete={true}
          title={"Deletando comprovante"}
          message={MESSAGE}
        />
      ) : (
        <Form.Form flexDirection={"column"}>
          <Form.FormRows>
            <Selection
              title={"Status"}
              groupName={"Tipo de Emissão"}
              optionsList={typeStatus}
              width={"100%"}
              value={status}
              onValueChange={(newValue: string) => setStatus(newValue)}
            />
          </Form.FormRows>
          <Form.FormRows>
            <InputText
              width={"100%"}
              type={"date"}
              title={"Data pagamento"}
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </Form.FormRows>
          <Form.FormRows>
            <InputText
              width={"100%"}
              type={"time"}
              title={"Hora pagamento"}
              value={paymentTime}
              onChange={(e) => setPaymentTime(e.target.value)}
            />
          </Form.FormRows>
          {installment?.receiptUrl ? (
            <div className="flex flex-col gap-2 w-full border-b-2 border-gray-500">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Comprovante de pagamento
                </label>
                <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-800 dark:text-gray-200 break-all border border-gray-300 dark:border-gray-600">
                  {installment?.receiptPath?.split("/").pop() ||
                    "Nenhum comprovante encontrado"}
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <a
                  href={installment?.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visualizar comprovante"
                  className="hover:text-blue-600 transition-colors"
                >
                  <EyeIcon size={28} />
                </a>
                <button
                  type={"button"}
                  onClick={handleDeleteReceipt}
                  title="Excluir comprovante"
                  className="hover:text-red-600 transition-colors"
                >
                  <TrashIcon size={28} />
                </button>
              </div>
            </div>
          ) : (
            // <Form.FormColumns>
            //     <Form.FormRows justifyContent={"flex-start"}>
            //         <InputText
            //             width={'100%'}
            //             title={'Comprovante pagamento'}
            //             value={installment?.receiptPath?.split('/').pop() || ""}
            //         />
            //
            //     </Form.FormRows>
            //     <Form.FormRows justifyContent={"flex-end"}>
            //         <a
            //             href={installment?.receiptUrl}
            //             target="_blank"
            //             rel="noopener noreferrer"
            //             title="Visualizar comprovante"
            //             className="hover:text-blue-600 transition-colors"
            //         >
            //             <EyeIcon size={28}/>
            //         </a>
            //         <button
            //             onClick={handleDeleteReceipt}
            //             title="Excluir comprovante"
            //             className="hover:text-green-600 transition-colors"
            //         >
            //             <TrashIcon size={28}/>
            //         </button>
            //
            //     </Form.FormRows>
            // </Form.FormColumns>
            <Form.FormRows justifyContent={"flex-start"}>
              <InputFile
                fileName={fileName}
                onChange={(file) => setSelectedFileEdit(file)}
              />
            </Form.FormRows>
          )}
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
      )}
    </Modal>
  );
};

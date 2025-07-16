import {
  InstallmentResponseType,
  StatusType,
} from "@/types/InstallmentResponseType";
import { useAuth } from "@/hooks/useAuth";
import * as Form from "../../../../Forms";
import { CurrencyInputText, InputText } from "@/components/inputs/InputText";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChartLineIcon,
  FilesIcon,
  MoneyIcon,
} from "@phosphor-icons/react";
import { InstallmentStatus } from "@/components/pages/payments/dialogs/InstallmentStatus";
import { formatedDate } from "@/util/util";
import { ReceiptActions } from "@/components/pages/payments/dialogs/ReceiptActions";
import { EditInstallmentDialog } from "@/components/pages/payments/dialogs/EditInstallmentDialog";
import { Alert } from "@/components/alert";
import { TableSpanButton, ThemeSpan } from "@/components/buttons";
import { IoBackspace } from "react-icons/io5";

interface MobileInstallmentTableProps {
  list: InstallmentResponseType[];
  title?: string;
  onDelete: (id: string | number) => void;
  isSmallScreen: boolean;
  reloadData: (data: InstallmentResponseType) => void;
  onDownload: (data: InstallmentResponseType) => void;
}

export const MobileInstallmentTable = ({
  list,
  title,
  onDownload,
  reloadData,
  isSmallScreen,
  onDelete,
}: MobileInstallmentTableProps) => {
  const { user } = useAuth();
  const handleShowStatus = (status: StatusType) => {
    switch (status) {
      case "WAITING":
        return "Aguardando";
      case "PAID":
        return "Pago";
      case "PENDING":
        return "Pedente";
      default:
        return "Desconhecido";
    }
  };
  return (
    <>
      {list?.map((item, index) => (
        <Form.Form
          flexDirection={"column"}
          customStyles={`
                    bg-white
                    shadow-md
                    rounded-lg
                    mb-4
                    border border-gray-200
                    p-4
                    transition-all
                    duration-200
                    hover:shadow-lg
    `}
        >
          <Form.FormRows justifyContent={"flex-start"}>
            <InputText
              colorMode={"light"}
              title={"Nº"}
              value={item?.installmentNumber}
              width={"50%"}
            >
              <FilesIcon />
            </InputText>

            {/*<InputText*/}
            {/*    colorMode={"light"}*/}
            {/*    title={"Valor"}*/}
            {/*    value={item?.amount ? `R$ ${item?.amount}`: "-"}*/}
            {/*    width={"50%"}*/}
            {/*>*/}
            {/*    <MoneyIcon/>*/}
            {/*</InputText>*/}
            <CurrencyInputText
              title={"Valor"}
              colorMode={"light"}
              value={item?.amount}
              width={"50%"}
            >
              <MoneyIcon />
            </CurrencyInputText>
          </Form.FormRows>
          <Form.FormRows justifyContent={"flex-start"}>
            {user?.roles?.includes("ROLE_ADMIN") ? (
              <InstallmentStatus
                width={"50%"}
                installment={item}
                isMobile={true}
                reloadData={reloadData}
                isSmallScreen={isSmallScreen}
              />
            ) : (
              <InputText
                colorMode={"light"}
                title={"Status"}
                value={handleShowStatus(item?.status)}
                width={"50%"}
              >
                <ChartLineIcon />
              </InputText>
            )}
            <InputText
              title={"Parcela"}
              value={
                item?.installmentDate ? formatedDate(item.installmentDate) : "-"
              }
              width={"50%"}
              colorMode={"light"}
            />
          </Form.FormRows>

          <Form.FormRows justifyContent={"flex-start"}>
            <InputText
              title={"Data Pagamento"}
              value={item?.paymentDate ? formatedDate(item.paymentDate) : "-"}
              width={"50%"}
              colorMode={"light"}
            />
            <InputText
              title={"Hora Pagamento"}
              value={item?.paymentTime}
              width={"50%"}
              type={"time"}
              colorMode={"light"}
            />
          </Form.FormRows>

          {item?.receiptPath && (
            <div
              className={
                "w-full border-b-2 pb-2 border-gray-500 flex items-center justify-between gap-2"
              }
            >
              <div className={"flex items-center gap-2 text-gray-400"}>
                <h2>Comprovante</h2>
                <ArrowRightIcon color={"#15803d"} weight={"fill"} />
              </div>
              <ReceiptActions onDownload={() => onDownload(item)} row={item} />
            </div>
          )}
          {user?.roles?.includes("ROLE_ADMIN") && (
            <Form.FormRows justifyContent={"flex-start"}>
              <EditInstallmentDialog installment={item} iconSize={32} />

              <Alert
                titleAlert={`Confirmação de Exclusão`}
                descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir o registro de pagamentos '${
                  item?.id ? "Nº" + item.id : ""
                }' do sistema?`}
                button={
                  <TableSpanButton
                    info={"Excluir registro de Cliente"}
                    width={"max-content"}
                    notBg={true}
                    theme={ThemeSpan.RED}
                  >
                    <IoBackspace
                      size={32}
                      color={"#b91c1c"}
                      className={"cursor-pointer inline-flex"}
                    />
                  </TableSpanButton>
                }
                onAccept={() => onDelete(item?.id)}
              />
            </Form.FormRows>
          )}
        </Form.Form>
      ))}
    </>
  );
};

import { UserResponseType } from "@/types/user/UserResponseType";
import * as Form from "../../../../Forms";
import { InputText } from "@/components/inputs/InputText";
import { KeyIcon, ShieldCheckIcon, TrashIcon } from "@phosphor-icons/react";
import { EditUserSystemDialog } from "@/components/pages/user/dialogs/EditUserSystemDialog";
import { useAuth } from "@/hooks/useAuth";
import { handleRoleStatus } from "@/util/util";
import { Alert } from "@/components/alert";
import { TableSpanButton, ThemeSpan } from "@/components/buttons";

interface MobileUserTableProps {
  list: UserResponseType[];
  title?: string;
  onDelete: (data: UserResponseType) => void;
  isSmallScreen: boolean;
  reloadData: () => void;
}

export const MobileUserTable = ({
  reloadData,
  isSmallScreen,
  onDelete,
  title,
  list,
}: MobileUserTableProps) => {
  const { user } = useAuth();

  return list?.map((item) => {
    const isLoggedUser = item?.email === user?.email;

    return (
      <Form.Form
        key={item?.id}
        flexDirection="column"
        customStyles="bg-white shadow-md rounded-xl mb-4 p-4 border border-gray-300"
      >
        <Form.FormRows justifyContent="flex-start">
          <InputText
            colorMode="light"
            title="Nº"
            value={item?.id}
            width="50%"
            className="text-sm"
          >
            <KeyIcon />
          </InputText>
        </Form.FormRows>

        <Form.FormRows justifyContent="flex-start">
          <InputText
            colorMode="light"
            title="Nome"
            value={isLoggedUser ? `${item?.name} (você)` : item?.name}
            width="100%"
            className={`text-base font-medium ${
              isLoggedUser ? "bg-green-100 text-green-700 rounded px-1" : ""
            }`}
          />
        </Form.FormRows>

        <Form.FormRows justifyContent="flex-start">
          <InputText
            colorMode="light"
            title="E-mail"
            value={item?.email}
            width="100%"
          />
        </Form.FormRows>

        <Form.FormRows justifyContent="flex-start">
          <InputText
            colorMode="light"
            title="Acesso"
            value={handleRoleStatus(item?.roles?.[0]?.name)}
            width="100%"
            className="capitalize"
          >
            <ShieldCheckIcon />
          </InputText>
        </Form.FormRows>

        <div className="w-full flex items-center justify-end gap-2 mt-4">
          {!isLoggedUser && (
            <>
              <EditUserSystemDialog user={item} reloadData={reloadData} />

              <Alert
                titleAlert="Confirmação de Exclusão"
                descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir o registro de usuário '${
                  item?.id ? "Nº" + item.id : ""
                }' do sistema?`}
                button={
                  <TableSpanButton
                    info="Excluir usuário"
                    width="max-content"
                    notBg
                    theme={ThemeSpan.RED}
                  >
                    <TrashIcon
                      size={28}
                      color="#b91c1c"
                      className="cursor-pointer inline-flex"
                    />
                  </TableSpanButton>
                }
                onAccept={() => onDelete(item)}
              />
            </>
          )}
        </div>
      </Form.Form>
    );
  });
};

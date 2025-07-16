import { PrivateRoute } from "@/components/security/PrivateRoute";
import { Layout } from "@/components/layout";
import { DownloadingOrDeletingBox, Loading } from "@/components/Loadings";
import {
  AlignmentColumnTableProps,
  ColumnTableProps,
  DefaultTable,
} from "@/components/tables/DefaultTable";
import {
  CardStatus,
  formatedDate,
  showToastMessage,
  translateLabel,
} from "@/util/util";
import { useEffect, useState } from "react";
import { UserResponseType } from "@/types/user/UserResponseType";
import ApiConnection from "@/util/api";
import { AxiosResponse } from "axios";
import { Alert } from "@/components/alert";
import { TableSpanButton, ThemeSpan } from "@/components/buttons";
import { IoBackspace } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { EditUserSystemDialog } from "@/components/pages/user/dialogs/EditUserSystemDialog";
import { useAuth } from "@/hooks/useAuth";
import { RegisterUser } from "@/components/pages/user/dialogs/RegisterUser";
import { MobileUserTable } from "@/components/pages/user/components/mobile";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function User() {
  const [showLoading, setShowLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDownland, setShowDownland] = useState(false);
  const [users, setUsers] = useState<UserResponseType[]>([]);

  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { user } = useAuth();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 640;
  const [tableComponentMaxHeight, setTableComponentMaxHeight] =
    useState<string>("");

  const clientsTableColumns: ColumnTableProps[] = [
    {
      id: "id",
      selector: "id",
      name: "#",
      alignment: AlignmentColumnTableProps.CENTRALIZADO,
      width: 50,
    },
    {
      id: "name",
      selector: "name",
      name: "Nome",
      alignment: AlignmentColumnTableProps.CENTRALIZADO,
      width: 200,
      cell: (row: UserResponseType) =>
        row?.email === user?.email ? (
          <span className={"bg-green-100 p-1 rounded-md text-green-600"}>
            {row?.name} (você){" "}
          </span>
        ) : (
          row?.name
        ),
    },
    {
      id: "email",
      selector: "email",
      name: "E-mail",
      alignment: AlignmentColumnTableProps.CENTRALIZADO,
      width: 200,
    },
    {
      id: "roles",
      selector: "roles",
      name: "Acessos",
      alignment: AlignmentColumnTableProps.CENTRALIZADO,
      width: 200,
      cell: (row: UserResponseType) =>
        row?.roles ? (
          <div className="flex flex-wrap gap-1">
            {row.roles.map((role) => translateLabel(role.name))}
          </div>
        ) : (
          "-"
        ),
    },

    {
      id: "",
      selector: "",
      name: "",
      alignment: AlignmentColumnTableProps.DIREITA,
      width: 100,
      cell: (row: UserResponseType) =>
        row?.email !== user?.email ? (
          <EditUserSystemDialog
            user={row}
            reloadData={() => {
              getAllUsers().then(setUsers);
            }}
          />
        ) : null,
    },
    {
      id: "",
      selector: "",
      name: "",
      alignment: AlignmentColumnTableProps.CENTRALIZADO,
      width: 100,
      cell: (row: UserResponseType) =>
        row?.email !== user?.email ? (
          <Alert
            titleAlert="Confirmação de Exclusão"
            descriptionAlert={`Atenção! Esta ação é irreversível. Tem certeza de que deseja excluir o registro de pagamentos '${
              row?.id ? "Nº" + row.id : ""
            }' do sistema?`}
            button={
              <TableSpanButton
                info="Excluir registro de Cliente"
                width="max-content"
                notBg
                theme={ThemeSpan.RED}
              >
                <IoBackspace
                  size={24}
                  color="#b91c1c"
                  className="cursor-pointer inline-flex"
                />
              </TableSpanButton>
            }
            onAccept={() => handleDeleteUser(row)}
          />
        ) : null,
    },
  ];

  async function handleDeleteUser(user: UserResponseType) {
    if (!user.id) {
      showToastMessage({
        type: "warning",
        message:
          "Necessário o id para excluir o registro do usuário: " + user?.name,
      });
      return;
    }
    try {
      await ApiConnection(window.location.href).delete(`/users/${user.id}`, {
        timeout: 5 * 60 * 1000,
      });
      showToastMessage({
        type: "success",
        message: `Usuário ${user?.name} deletado com sucesso!`,
      });

      await getAllUsers().then(setUsers);
    } catch (error) {
      showToastMessage({
        type: "error",
        message: `Erro ao tentar excluir o usuario ${user?.name}: ${error}`,
      });
    }
  }

  async function getAllUsers() {
    let userResponse = [] as UserResponseType[];
    setShowLoading(true);
    try {
      const response: AxiosResponse<UserResponseType[]> = await ApiConnection(
        window.location.href
      ).get("/users", {
        timeout: 5 * 60 * 1000,
      });
      userResponse = response?.data;
    } catch (err) {
      showToastMessage({
        type: "error",
        message: "Erro ao tentar buscar os usuarios do sistema: " + err,
      });
    } finally {
      setShowLoading(false);
    }
    return userResponse;
  }

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setTableComponentMaxHeight(window.innerWidth <= 1366 ? "50vh" : "70vh");
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <PrivateRoute>
      <Layout>
        <div className={`flex items-center justify-end w-full mb-2`}>
          <RegisterUser
            reloadData={() => {
              getAllUsers().then(setUsers);
            }}
          />
        </div>

        {showDelete ? (
          <DownloadingOrDeletingBox
            isDelete
            title="Excluindo comprovante(s)"
            message="Aguarde enquanto removemos os comprovantes selecionados..."
          />
        ) : showDownland ? (
          <DownloadingOrDeletingBox
            isDelete={false}
            title="Baixando comprovante(s)"
            message="Por favor, aguarde o download..."
          />
        ) : showLoading ? (
          <Loading
            title="Carregando registros"
            message="Buscando informações de pagamentos..."
          />
        ) : (
          <>
            {!isClient ? null : isMobile ? (
              <div className={"max-h-[70vh] overflow-auto"}>
                <MobileUserTable
                  list={users}
                  onDelete={handleDeleteUser}
                  reloadData={() => {
                    getAllUsers().then(setUsers);
                  }}
                  isSmallScreen={isSmallScreen}
                />
                {/*<div className={"bg-red-400"}>COmponete mobile</div>*/}
              </div>
            ) : (
              <DefaultTable
                columns={clientsTableColumns}
                list={users.length > 0 ? users : []}
                maxHeight={tableComponentMaxHeight}
              />
            )}
          </>
        )}
      </Layout>
    </PrivateRoute>
  );
}

import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusType } from "@/types/InstallmentResponseType";
import React, { ReactNode } from "react";
import { SelectionOptionsProps } from "@/components/select";
import { colorModeType, InputText } from "@/components/inputs/InputText";
import { ChartLineIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { FaCrown, FaKey, FaQuestion, FaUser } from "react-icons/fa";
import { AxiosError } from "axios";

interface ShowToastMessageProps {
  type: "info" | "warning" | "error" | "success" | "dark" | "warn";
  message: string;
}

export function showToastMessage({ type, message }: ShowToastMessageProps) {
  switch (type) {
    case "info":
      toast.info(message);
      break;

    case "warning":
      toast.warning(message);
      break;

    case "error":
      toast.error(message);
      break;

    case "success":
      toast.success(message);
      break;
    case "dark":
      toast.dark(message);
      break;
  }
}

export const ShowAxiosError = (error: unknown) => {
  let message = "Erro inesperado.";

  if (error instanceof AxiosError) {
    message = error.response?.data?.message || error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  showToastMessage({
    type: "error",
    message: `Erro na operação: ${message}`,
  });
};

export const formatedDate = (date: string) => {
  if (!date) return "";
  return format(parseISO(date), "dd/MM/yyyy", { locale: ptBR });
};

export function recalculateHeightComponent(
  width: number,
  componentHeight: string | number | undefined
) {
  let heightToCalculate: any;
  let suffix: string = "";
  if (componentHeight === undefined) {
    return;
  }

  if (typeof componentHeight as string) {
    heightToCalculate = Number(
      String(componentHeight).replace("vh", "").replace("px", "")
    );

    if (String(componentHeight).includes("px")) suffix = "px";

    if (String(componentHeight).includes("vh")) suffix = "vh";
  } else heightToCalculate = componentHeight as number;

  if (width <= 1400)
    heightToCalculate = heightToCalculate - heightToCalculate * 0.1;

  if (suffix) return heightToCalculate + suffix;
  else return heightToCalculate;
}

export const CardStatus = (status: StatusType) => {
  if (status === "") return "-";
  const statusLabel = VerifyStatus(status);
  const statusStyle = checkStylesStatus(statusLabel);
  return (
    <span className={`inline-flex p-1 rounded-md  ${statusStyle}`}>
      {statusLabel}
    </span>
  );
};

export const getStatusLabel = (status: StatusType): string => {
  if (status === "") return "-";
  return VerifyStatus(status); // Ex: "Pago", "Pendente"
};

interface CardStatusChildrenProps {
  status: StatusType;
  children: ReactNode;
  onClick?: (value: any) => void;
  width?: string | number;
  isMobile: boolean;
}

export const CardStatusChildren = ({
  status,
  children,
  onClick,
  width,
  isMobile,
  ...rest
}: CardStatusChildrenProps) => {
  if (status === "") return "-";
  const statusLabel = VerifyStatus(status);
  const statusStyle = checkStylesStatus(statusLabel);

  if (isMobile) {
    return (
      <div
        {...rest}
        onClick={onClick}
        className={"border-b-2 border-gray-400 pb-2 flex flex-col"}
        style={{ width: width }}
      >
        <h2 className={"mb-2 text-gray-500"}>Status:</h2>
        <span
          className={`
                    inline-flex p-1 items-center gap-2 rounded-md cursor-pointer ${statusStyle}`}
        >
          {statusLabel}
          {children}
        </span>
      </div>
    );
  }

  return (
    <span
      style={{ width: width }}
      {...rest}
      onClick={onClick}
      className={`
            inline-flex p-1 items-center gap-2 rounded-md cursor-pointer ${statusStyle}`}
    >
      {statusLabel}
      {children}
    </span>
  );
};

export const VerifyStatus = (status: StatusType) => {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "PAID":
      return "Pago";
    case "WAITING":
      return "Aguardando";
    default:
      return "Desconhecido";
  }
};
export const VerifyStatus2 = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "PAID":
      return "Pago";
    case "WAITING":
      return "Aguardando";
    default:
      return "Desconhecido";
  }
};
export const checkStylesStatus = (
  status: "Pendente" | "Pago" | "Aguardando" | "Desconhecido"
) => {
  switch (status) {
    case "Pendente":
      return "bg-red-100 text-red-800";
    case "Pago":
      return "bg-green-100 text-green-800";
    case "Aguardando":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const typeStatus: SelectionOptionsProps[] = [
  { value: "PENDING", label: "Pendente" },
  { value: "PAID", label: "Pago" },
];

export const roleType: SelectionOptionsProps[] = [
  { value: "ROLE_ADMIN", label: "Administrador" },
  { value: "ROLE_USER", label: "Usuário" },
];

const ROLE_CONFIG: Record<
  string,
  { label: string; styles: string; icon: ReactNode }
> = {
  ROLE_ADMIN: {
    label: "Administrador",
    styles: "bg-yellow-100 text-yellow-800",
    icon: <FaCrown className="text-yellow-600" />,
  },
  ROLE_USER: {
    label: "Usuário",
    styles: "bg-blue-100 text-blue-800",
    icon: <FaUser className="text-blue-600" />,
  },
};

export const translateLabel = (role: string) => {
  const config = ROLE_CONFIG[role] || {
    label: "Desconhecido",
    styles: "bg-gray-100 text-gray-700",
    icon: <FaQuestion className="text-gray-500" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${config.styles}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export const handleRoleStatus = (status: string) => {
  switch (status) {
    case "ROLE_ADMIN":
      return "Administrador";
    case "ROLE_USER":
      return "Usuário";
    default:
      return "Desconhecido";
  }
};

export const handleDarkMode = (colorMode: colorModeType | undefined) => {
  if (!colorMode) return "text-gray-700";

  switch (colorMode) {
    case "dark":
      return "text-white";
    case "light":
      return "text-gray-900";
    default:
      return "text-gray-700";
  }
};

export const getFirstAndLastName = (name: string) => {
  if (!name) return "";

  let names = name.trim().split(" ");
  if (names.length === 1) return names[0];
  return `${names[0]} ${names[names?.length - 1]}`;
};

export const getVisibilityIcon = (
  isVisible: boolean,
  toggle: () => void,
  hasValue: boolean
) => {
  if (!hasValue) return <FaKey size={16} className="text-gray-500" />;

  return isVisible ? (
    <span title="Ocultar senha">
      <EyeSlashIcon
        size={24}
        weight="fill"
        className="cursor-pointer fill-red-600"
        onClick={toggle}
        aria-label="Ocultar senha"
      />
    </span>
  ) : (
    <span title="Exibir senha">
      <EyeIcon
        size={24}
        weight="fill"
        className="cursor-pointer fill-green-800"
        onClick={toggle}
        aria-label="Exibir senha"
      />
    </span>
  );
};

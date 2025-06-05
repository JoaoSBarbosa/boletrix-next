import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import ApiConnection from "@/util/api";
import {showToastMessage} from "@/util/util";
import {DebtType} from "@/types/debt/DebtType";
import {useWindowSize} from "@/hooks/useWindowSize";
import DropdownMenuCustom, {ActionsDropdownItem, BackgroudColor} from "@/components/dropdown";
import {BgColor, ButtonRef, ButtonType} from "@/components/buttons";
import {CurrencyCircleDollarIcon} from "@phosphor-icons/react";

// 👇 Use forwardRef para expor métodos
export const DebtCard = forwardRef((_, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [debt, setDebt] = useState<DebtType | null>(null);
    const {width} = useWindowSize();
    const isSmallScreen = width <= 640;
    const fetchDebt = async () => {
        setIsLoading(true);
        try {
            const response = await ApiConnection(window.location.href).get("/debts/2");
            setDebt(response.data);
        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao carregar dados da dívida",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // expõe a função para o pai via ref
    useImperativeHandle(ref, () => ({
        reloadDebt: fetchDebt
    }));

    useEffect(() => {
        fetchDebt();
    }, []);

    if (isSmallScreen) {
        return (
            <DropdownMenuCustom
                trigger={
                    <ButtonRef width="max-content" value="" type={ButtonType.BUTTON} bgColor={BgColor.PRIMARY_SYSTEM}>
                        <CurrencyCircleDollarIcon size={24} weight={"fill"}/>
                    </ButtonRef>
                }
                sideOffset={1}
            >
                <div className="flex flex-col gap-2 w-64">
                    <ActionsDropdownItem>
                        <StatCard
                            title="Valor Total"
                            value={debt?.totalAmount ?? 0.0}
                            color="text-primaryColor"
                        />
                    </ActionsDropdownItem>
                    <ActionsDropdownItem>
                        <StatCard
                            title="Valor Pago"
                            value={debt?.totalPaid ?? 0.0}
                            color="text-green-600"
                        /> </ActionsDropdownItem>

                    <ActionsDropdownItem>
                        <StatCard
                            title="Valor Restante"
                            value={debt?.remainingAmount ?? 0.0}
                            color="text-red-600"
                        />
                    </ActionsDropdownItem>
                </div>
            </DropdownMenuCustom>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <StatCard
                title="Valor Total"
                value={debt?.totalAmount ?? 0.0}
                color="text-primaryColor"
            />
            <StatCard
                title="Valor Pago"
                value={debt?.totalPaid ?? 0.0}
                color="text-green-600"
            />
            <StatCard
                title="Valor Restante"
                value={debt?.remainingAmount ?? 0.0}
                color="text-red-600"
            />
        </div>
    );
});

DebtCard.displayName = 'DebtCard';

interface LocalDebtCardProps {
    debt: DebtType
}
export const LocalDebtCard = ({ debt }:LocalDebtCardProps) =>{
    const {width} = useWindowSize();
    const isSmallScreen = width <= 640;

    if (isSmallScreen) {
        return (
            <DropdownMenuCustom
                trigger={
                    <ButtonRef width="max-content" value="" type={ButtonType.BUTTON} bgColor={BgColor.PRIMARY_SYSTEM}>
                        <CurrencyCircleDollarIcon size={24} weight={"fill"}/>
                    </ButtonRef>
                }
                sideOffset={1}
            >
                <div className="flex flex-col gap-2 w-64">
                    <ActionsDropdownItem>
                        <StatCard
                            title="Valor Total"
                            value={debt?.totalAmount ?? 0.0}
                            color="text-primaryColor"
                        />
                    </ActionsDropdownItem>
                    <ActionsDropdownItem>
                        <StatCard
                            title="Valor Pago"
                            value={debt?.totalPaid ?? 0.0}
                            color="text-green-600"
                        /> </ActionsDropdownItem>

                    <ActionsDropdownItem>
                        <StatCard
                            title="Valor Restante"
                            value={debt?.remainingAmount ?? 0.0}
                            color="text-red-600"
                        />
                    </ActionsDropdownItem>
                </div>
            </DropdownMenuCustom>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <StatCard
                title="Valor Total"
                value={debt?.totalAmount ?? 0.0}
                color="text-primaryColor"
            />
            <StatCard
                title="Valor Pago"
                value={debt?.totalPaid ?? 0.0}
                color="text-green-600"
            />
            <StatCard
                title="Valor Restante"
                value={debt?.remainingAmount ?? 0.0}
                color="text-red-600"
            />
        </div>
    );
}
interface StatCardProps {
    title: string;
    value: number;
    color?: string;
}

const StatCard = ({title, value, color = "text-primaryColor"}: StatCardProps) => {
    return (
        <div
            className="bg-white shadow-sm rounded-xl p-2 flex flex-col items-start justify-center border border-gray-200 hover:shadow-md transition-shadow">
            <span className={`text-[12px] font-semibold`}>{title}</span>
            <span className={` ${color} font-bold text-lg`}>
                R$ {value.toLocaleString("pt-BR", {minimumFractionDigits: 2})}
            </span>
        </div>
    );
};

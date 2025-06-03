import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import ApiConnection from "@/util/api";
import { showToastMessage } from "@/util/util";
import { DebtType } from "@/types/debt/DebtType";

// 👇 Use forwardRef para expor métodos
export const DebtCard = forwardRef((_, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [debt, setDebt] = useState<DebtType | null>(null);

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

interface StatCardProps {
    title: string;
    value: number;
    color?: string;
}

const StatCard = ({ title, value, color = "text-primaryColor" }: StatCardProps) => {
    return (
        <div className="bg-white shadow-sm rounded-xl p-2 flex flex-col items-start justify-center border border-gray-200 hover:shadow-md transition-shadow">
            <span className={`text-[12px] font-semibold`}>{title}</span>
            <span className={` ${color} font-bold text-lg`}>
                R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
        </div>
    );
};

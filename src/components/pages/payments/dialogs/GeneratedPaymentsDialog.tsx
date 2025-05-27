import {Modal} from "@/components/modal";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {Pencil} from "lucide-react";
import {Button, ButtonType, UserMenuButton} from "@/components/buttons";
import ApiConnection from "@/util/api";
import {showToastMessage} from "@/util/util";

interface GeneratedPaymentsDialogProps {
    reload: () => void;
}

export const GeneratedPaymentsDialog = ({reload}: GeneratedPaymentsDialogProps) => {

    const {user} = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [totalAmount, setTotalAmount] = useState<string>("");
    const [monthlyAmount, setMonthlyAmount] = useState<string>("");
    const [initialDate, setInitialDate] = useState<string>("");

    // useEffect(() => {
    //     if (user) {
    //         setTotalAmount(user.name);
    //         setMonthlyAmount(user.email);
    //     }
    // }, [user]);

    async function handleGeneretadePayments() {

        if (!totalAmount ||
            !monthlyAmount ||
            !initialDate) {

            showToastMessage({
                type: "warn",
                message: "Os campos 'Valor Total', 'Valor por Parcela' e 'Data inicial' são obrigatorios"
            });
            return;
        }
        try {
            await ApiConnection(window.location.href).post(`/installments/generated/${totalAmount}/${monthlyAmount}?initialDate=${initialDate}`);

            showToastMessage({
                type: "success",
                message: "Parcelas geradas com sucesso!"
            })

            if (reload) reload();

        } catch (error) {
            showToastMessage({
                type: "error",
                message: "Erro ao tentar obter a lista de boletos: " + error
            })
        }
    }

    return (
        <Modal
            open={showModal}
            setOpen={setShowModal}
            title={"Gerar parcelas"}
            trigger={
                <Button type={ButtonType.BUTTON} value={"Gerar parcelas"} width={"max-content"}>
                    <Pencil size={16}/>
                </Button>

            }
        >
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Valor total"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                    placeholder="Valor por parcela"
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    type="date"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                    placeholder="Data inicial"
                    className="w-full border px-3 py-2 rounded"
                />

                <button
                    type="button"
                    onClick={handleGeneretadePayments}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Gerar pareclas
                </button>
            </form>

        </Modal>
    )
}
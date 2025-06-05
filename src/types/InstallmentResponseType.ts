import {DebtType} from "@/types/debt/DebtType";

export type InstallmentResponseType ={
    id: string;
    amount: number;
    installmentDate: string;
    paymentTime: string;
    paymentDate: string;
    receiptUrl: string;
    receiptPath: string;
    installmentNumber: string;
    status: StatusType;
    debtDTO: DebtType

}


export type StatusType = "PENDING" | "PAID" | "WAITING" | "";

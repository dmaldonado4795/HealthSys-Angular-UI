import { Appointment } from "./appointment";

export interface Invoice {
    invoiceId: number;
    totalAmount: number;
    date: string;
    appointment: Appointment;
}

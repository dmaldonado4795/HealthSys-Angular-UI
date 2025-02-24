import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface Appointment {
    appointmentId: number;
    date: string;
    reason: string;
    patient: Patient;
    doctor: Doctor;
}

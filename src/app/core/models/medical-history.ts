import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface MedicalHistory {
    historyId: number;
    description: string;
    patient: Patient;
    doctor: Doctor;
    lastUpdated: string;
}

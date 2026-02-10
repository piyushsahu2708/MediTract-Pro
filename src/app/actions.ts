
'use server'

import { generateMedicationReminder, type MedicationReminderInput } from "@/ai/flows/medication-reminder-generation";

export async function getMedicationReminder(input: MedicationReminderInput) {
    try {
        const output = await generateMedicationReminder(input);
        return { success: true, data: output };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to generate medication reminder." };
    }
}

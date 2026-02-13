'use server'

import { generateMedicationReminder, type MedicationReminderInput } from "@/ai/flows/medication-reminder-generation";
import { analyzeSymptoms, type SymptomAnalysisInput } from "@/ai/ai-symptom-analysis";

export async function getMedicationReminder(input: MedicationReminderInput) {
    try {
        const output = await generateMedicationReminder(input);
        return { success: true, data: output };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to generate medication reminder." };
    }
}

export async function getSymptomAnalysis(input: SymptomAnalysisInput) {
    try {
        const output = await analyzeSymptoms(input);
        return { success: true, data: output };
    } catch (error: any) {
        console.error(error);
        return { success: false, error: error.message || "Failed to analyze symptoms." };
    }
}

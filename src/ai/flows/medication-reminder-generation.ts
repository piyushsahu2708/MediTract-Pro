// Medication Reminder Generation
'use server';

/**
 * @fileOverview A medication reminder generation AI agent.
 *
 * - generateMedicationReminder - A function that handles the medication reminder generation process.
 * - MedicationReminderInput - The input type for the generateMedicationReminder function.
 * - MedicationReminderOutput - The return type for the generateMedicationReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicationReminderInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  existingConditions: z
    .string()
    .describe('A summary of the patient\'s existing medical conditions.'),
});
export type MedicationReminderInput = z.infer<typeof MedicationReminderInputSchema>;

const MedicationReminderOutputSchema = z.object({
  medicationSummary: z.string().describe('A summary of the patient\'s medications and conditions.'),
  reminderSchedule: z
    .string()
    .describe('A proposed reminder schedule to ensure patient compliance.'),
});
export type MedicationReminderOutput = z.infer<typeof MedicationReminderOutputSchema>;

export async function generateMedicationReminder(
  input: MedicationReminderInput
): Promise<MedicationReminderOutput> {
  return medicationReminderFlow(input);
}

const medicationReminderPrompt = ai.definePrompt({
  name: 'medicationReminderPrompt',
  input: {schema: MedicationReminderInputSchema},
  output: {schema: MedicationReminderOutputSchema},
  prompt: `You are an expert medical assistant tasked with creating medication reminder schedules for patients.

  Patient Name: {{patientName}}
  Existing Conditions: {{existingConditions}}

  Summarize the patient's medications and conditions, and then create a reminder schedule to ensure patient compliance.
  The reminder schedule should include specific times and frequencies for medication intake.
  Return the medication summary and the reminder schedule in the requested JSON format.
  `,
});

const medicationReminderFlow = ai.defineFlow(
  {
    name: 'medicationReminderFlow',
    inputSchema: MedicationReminderInputSchema,
    outputSchema: MedicationReminderOutputSchema,
  },
  async input => {
    const {output} = await medicationReminderPrompt(input);
    return output!;
  }
);

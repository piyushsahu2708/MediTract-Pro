'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing patient symptoms and suggesting potential diagnoses.
 *
 * - analyzeSymptoms - A function that takes patient symptoms as input and returns potential diagnoses.
 * - SymptomAnalysisInput - The input type for the analyzeSymptoms function.
 * - SymptomAnalysisOutput - The output type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the patient symptoms.'),
  patientHistory: z
    .string()
    .optional()
    .describe('Relevant patient medical history, if available.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  potentialDiagnoses: z
    .string()
    .describe('A list of potential diagnoses based on the symptoms.'),
  confidenceLevels: z
    .string()
    .optional()
    .describe('Confidence levels for each diagnosis, if available.'),
  additionalTests: z
    .string()
    .optional()
    .describe('Suggested additional tests to confirm the diagnosis.'),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptoms(
  input: SymptomAnalysisInput
): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const symptomAnalysisPrompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are an AI assistant helping doctors diagnose patients.

  Based on the provided symptoms and patient history, suggest potential diagnoses, confidence levels, and additional tests.

  Symptoms: {{{symptoms}}}
  Patient History: {{{patientHistory}}}
  \n  Respond with a list of potential diagnoses, the confidence level for each diagnosis, and any additional tests that should be run.
  `,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await symptomAnalysisPrompt(input);
    return output!;
  }
);

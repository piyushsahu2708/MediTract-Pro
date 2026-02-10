import { PageHeader } from "@/components/page-header"
import MedicationReminderForm from "./components/medication-reminder-form"

export default function MedicationReminderPage() {
    return (
        <>
            <PageHeader title="AI Medication Reminder" />
            <p className="mb-6 text-muted-foreground max-w-2xl">
                This tool leverages generative AI to create a summarized medication and condition overview for a patient, and proactively suggests a typical reminder schedule to improve adherence.
            </p>
            <MedicationReminderForm />
        </>
    )
}

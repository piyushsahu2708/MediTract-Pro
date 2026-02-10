"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { getMedicationReminder } from "@/app/actions"
import type { MedicationReminderOutput } from "@/ai/flows/medication-reminder-generation"
import { Loader2, Sparkles, AlertTriangle, FileText, CalendarClock } from 'lucide-react'

const formSchema = z.object({
  patientName: z.string().min(2, "Patient name is required."),
  existingConditions: z.string().min(10, "Please provide a summary of existing conditions."),
})

type FormValues = z.infer<typeof formSchema>

export default function MedicationReminderForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<MedicationReminderOutput | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      existingConditions: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    setError(null)
    setResult(null)
    const response = await getMedicationReminder(values)
    if (response.success && response.data) {
      setResult(response.data)
    } else {
      setError(response.error || "An unknown error occurred.")
    }
    setIsLoading(false)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Enter the patient's details to generate a reminder schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="existingConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Conditions & Medications</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Hypertension, taking Lisinopril 10mg daily. Type 2 Diabetes, on Metformin 500mg twice daily."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Schedule
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div>
        {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-2 border-dashed rounded-lg">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-lg font-semibold">Generating Reminder...</p>
                <p className="text-muted-foreground">The AI is creating a personalized schedule.</p>
            </div>
        )}
        {error && (
            <Card className="bg-destructive/10 border-destructive">
                 <CardHeader className="flex-row gap-4 items-center">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    <div>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription className="text-destructive/80">{error}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        )}
        {result && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex-row gap-4 items-start">
                 <div className="flex-shrink-0"><FileText className="h-6 w-6 text-primary"/></div>
                 <div>
                    <CardTitle>Medication Summary</CardTitle>
                    <CardDescription>An AI-generated overview of the patient's conditions and medications.</CardDescription>
                 </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{result.medicationSummary}</p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex-row gap-4 items-start">
                    <div className="flex-shrink-0"><CalendarClock className="h-6 w-6 text-accent"/></div>
                    <div>
                        <CardTitle>Reminder Schedule</CardTitle>
                        <CardDescription>A proposed schedule to improve medication adherence.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap">{result.reminderSchedule}</p>
                </CardContent>
            </Card>
          </div>
        )}
        {!isLoading && !error && !result && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-2 border-dashed rounded-lg">
                <Sparkles className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold">Ready to Assist</p>
                <p className="text-muted-foreground">The generated reminder schedule will appear here.</p>
            </div>
        )}
      </div>
    </div>
  )
}

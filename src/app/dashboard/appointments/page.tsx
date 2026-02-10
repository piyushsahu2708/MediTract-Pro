"use client"

import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Calendar, PlusCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar as UICalendar } from "@/components/ui/calendar"
import { appointments } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export default function AppointmentsPage() {
  const [date, setDate] = React.useState<Date | undefined>()

  React.useEffect(() => {
    setDate(new Date())
  }, [])

  const todaysAppointments = date
    ? appointments.filter(
        (appt) => new Date(appt.date).toDateString() === date.toDateString()
      )
    : []

  return (
    <>
      <PageHeader title="Appointments">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a New Appointment</DialogTitle>
              <DialogDescription>
                Fill in the details below to schedule a new appointment.
              </DialogDescription>
            </DialogHeader>
            {/* Appointment booking form would go here */}
            <p className="text-center text-muted-foreground py-8">Appointment form placeholder.</p>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <UICalendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-3"
                classNames={{
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }}
                disabled={(day) => day < new Date("1900-01-01")}
                initialFocus
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Appointments for {date ? date.toLocaleDateString() : "loading..."}
              </CardTitle>
              <CardDescription>
                {todaysAppointments.length > 0
                  ? `You have ${todaysAppointments.length} appointments scheduled.`
                  : "No appointments scheduled for this day."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todaysAppointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div>
                        <p className="font-semibold">{appt.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          with {appt.doctor} at {appt.time}
                        </p>
                      </div>
                      <Badge variant={
                          appt.status === "Scheduled" ? "default" :
                          appt.status === "Completed" ? "secondary" : "destructive"
                        }
                        className={
                          appt.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" :
                          ""
                        }>
                        {appt.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">{date ? "No appointments here." : "Loading appointments..."}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

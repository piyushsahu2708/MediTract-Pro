"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/page-header"
import {
  Users,
  CalendarCheck,
  Workflow,
  Activity,
} from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { recentActivities, patients, appointments } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  const [admissionsData, setAdmissionsData] = React.useState<any[]>([])
  const [appointmentsToday, setAppointmentsToday] = React.useState(0)

  React.useEffect(() => {
    const data = [
      { month: 'Jan', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Feb', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Mar', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Apr', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'May', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Jun', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Jul', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Aug', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Sep', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Oct', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Nov', total: Math.floor(Math.random() * 50) + 10 },
      { month: 'Dec', total: Math.floor(Math.random() * 50) + 10 },
    ]
    setAdmissionsData(data)

    const today = new Date().toDateString()
    const todayAppts = appointments.filter(a => new Date(a.date).toDateString() === today).length
    setAppointmentsToday(todayAppts)
  }, [])

  const chartConfig = {
    total: {
      label: "Patients",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointmentsToday}
            </div>
            <p className="text-xs text-muted-foreground">+3 scheduled for tomorrow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5 in consultation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53</div>
            <p className="text-xs text-muted-foreground">4 doctors on duty</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 mt-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Patient Admissions</CardTitle>
            <CardDescription>Monthly patient admission trends for the last year.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={admissionsData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="total" fill="var(--color-total)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>An overview of the latest actions in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}{" "}
                      <span className="font-medium text-foreground">{activity.target}</span>.
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

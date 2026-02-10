import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { patientWorkflowData } from "@/lib/data"

const workflowStages = [
  { id: "admitted", title: "Admitted", data: patientWorkflowData.admitted },
  { id: "consultation", title: "In Consultation", data: patientWorkflowData.consultation },
  { id: "treatment", title: "Undergoing Treatment", data: patientWorkflowData.treatment },
  { id: "discharged", title: "Discharged", data: patientWorkflowData.discharged },
]

export default function WorkflowPage() {
  return (
    <>
      <PageHeader title="Patient Workflow" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {workflowStages.map((stage) => (
          <div key={stage.id} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-center font-headline">{stage.title} ({stage.data.length})</h2>
            <div className="space-y-4">
              {stage.data.map((patient) => (
                <Card key={patient.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{patient.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{patient.details}</p>
                  </CardContent>
                </Card>
              ))}
               {stage.data.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-10 border-2 border-dashed rounded-lg">
                    No patients in this stage.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

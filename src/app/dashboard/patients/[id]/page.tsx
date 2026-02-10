import { PageHeader } from "@/components/page-header";
import { patients } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = patients.find(p => p.id === params.id);

  if (!patient) {
    notFound();
  }
  
  const avatar = PlaceHolderImages.find(p => p.id === patient.avatar);

  return (
    <>
      <PageHeader title="Patient Details">
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Patient
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar?.imageUrl} alt={patient.name} />
              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-headline">{patient.name}</CardTitle>
              <p className="text-muted-foreground">{patient.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Gender</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Age</p>
              <p className="font-medium">{patient.age}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Last Visit</p>
              <p className="font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium">{patient.status}</p>
            </div>
            <div className="space-y-1 col-span-1 md:col-span-2">
              <p className="text-muted-foreground">Existing Conditions</p>
              <p className="font-medium">{patient.conditions.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6">
        <Card>
            <CardHeader>
                <CardTitle>Further Details</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">More patient details like appointments, medical history, and billing will be displayed here in tabs.</p>
            </CardContent>
        </Card>
      </div>
    </>
  );
}

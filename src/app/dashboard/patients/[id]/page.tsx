"use client"
import { PageHeader } from "@/components/page-header";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import { useDoc, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { doc } from "firebase/firestore";
import { Patient } from "@/lib/types";
import { format } from "date-fns";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore()
  const { user } = useUser();
  const patientRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'patients', params.id);
  }, [firestore, user, params.id]);
  const { data: patient, isLoading } = useDoc<Patient>(patientRef);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin" /></div>;
  }
  
  if (!patient) {
    notFound();
  }
  
  const avatar = PlaceHolderImages.find(p => p.id === patient.avatar);
  const name = `${patient.firstName} ${patient.lastName}`
  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();


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
              {avatar && <AvatarImage src={avatar?.imageUrl} alt={name} />}
              <AvatarFallback>{patient.firstName.charAt(0)}{patient.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-headline">{name}</CardTitle>
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
              <p className="font-medium">{age}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{format(new Date(patient.dateOfBirth), "PP")}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Admission Date</p>
              <p className="font-medium">{format(new Date(patient.admissionDate), "PP")}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Contact Number</p>
              <p className="font-medium">{patient.contactNumber}</p>
            </div>
             <div className="space-y-1">
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium">{patient.address}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Emergency Contact</p>
              <p className="font-medium">{patient.emergencyContactName} ({patient.emergencyContactNumber})</p>
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

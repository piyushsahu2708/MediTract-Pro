"use client"

import * as React from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { PlusCircle, Loader2 } from "lucide-react"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase"
import { collection } from "firebase/firestore"
import { Patient } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PatientForm from "./components/patient-form"

export default function PatientsPage() {
    const firestore = useFirestore()
    const { user } = useUser();
    const patientsCollection = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, "patients")
    }, [firestore, user]);
    const { data: patients, isLoading } = useCollection<Patient>(patientsCollection)
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <PageHeader title="Patients">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Add Patient
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add New Patient</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new patient record.
                        </DialogDescription>
                        </DialogHeader>
                        <PatientForm onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </PageHeader>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin" />
                </div>
            ) : (
                <DataTable columns={columns} data={patients || []} />
            )}
        </>
    )
}

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { patients } from "@/lib/data"

export default function PatientsPage() {
    return (
        <>
            <PageHeader title="Patients">
                <Button>
                    <PlusCircle className="mr-2" />
                    Add Patient
                </Button>
            </PageHeader>
            <DataTable columns={columns} data={patients} />
        </>
    )
}

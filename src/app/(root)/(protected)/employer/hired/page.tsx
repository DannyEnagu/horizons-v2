import PageTitle from "@/components/employer/PageTitle";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/components/shared/data-table/columns-config/jobs";

const jobs = [
    {
        id: '1',
        status: 'Active',
        title: 'Senior Frontend Developer',
        location: 'Lagos, Nigeria',
        salary: '120000',
        employmentType: 'Full-time',
        date: '10/10/2021',
    },
    {
        id: '2',
        status: 'Pending',
        title: 'Senior Backend Developer',
        location: 'Remote',
        employmentType: 'Full-time',
        salary: '120000',
        date: '05/10/2021',
    },
    {
        id: '3',
        status: 'Expired',
        title: 'Senior Fullstack Developer',
        employmentType: 'Full-time',
        location: 'Remote',
        salary: '120000',
        date: '25/09/2021',
    },
    {
        id: '4',
        status: 'Active',
        title: 'Senior DevOps Engineer',
        employmentType: 'Full-time',
        location: 'Remote',
        salary: '120000',
        date: '07/09/2021',
    },
    {
        id: '5',
        status: 'Active',
        title: 'Junior Frontend Developer',
        employmentType: 'Full-time',
        location: 'Remote',
        salary: '120000',
        date: '30/08/2021',
    }
];

export default function Page() {
    return (
        <div>
            <PageTitle>
                Hired
            </PageTitle>
            
            {/* Table */}
            <div className="mt-8">
                <DataTable
                    columns={columns}
                    data={jobs}
                />
            </div>
        </div>
    );
}

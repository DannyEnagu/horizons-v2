'use client';

import { ColumnDef } from '@tanstack/react-table';
import { actionHeader } from '.';
import { ComboboxDropdownMenu } from '../../ComboboxDropdownMenu';
import Link from 'next/link';
import { Job } from '@prisma/client';

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: (row) => {
            return <div className='space-y-2 font-medium'>
                    <Link href={`/jobs/${row.row.original.id}`} className='hover:underline'>{row.row.original.title}</Link>
                    <div className='flex items-center gap-2 text-xs text-muted'>
                        {row.row.original.location}
                        <span>•</span>
                        {row.row.original.employmentTypes}
                    </div>
                </div>;
        }
    },
    {
        header: 'Date',
        accessorKey: 'createdAt',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: ({row}) => {
            const status = row.getValue('status');
            let color = '';
            switch (status) {
                case 'OFFERED':
                    color = 'text-green-500';
                    break;
                case 'PENDING':
                    color = 'text-yellow-500';
                    break;
                case 'REJECTED':
                    color = 'text-red-500';
                    break;
                default:
                    color = 'text-gray-500';
            }
            return <div className="flex items-center">
                <span className={`${color}`}>•</span>
                <span className='ml-1'>{row.getValue('status')}</span>
            </div>;
        }
    },
    {
        header: () => actionHeader(),
        accessorKey: 'id',
        cell: ({row}) => {
            const id = row.getValue('id');

            const handleSelectMenuItem = (val: string) => {
                console.log('More clicked', val, id);
            };

            const handleDelete = (id: string) => {
                console.log('Delete clicked', id);
            };
            return (<div className='flex items-center justify-end'>
                    <ComboboxDropdownMenu
                        itemId={row.getValue('id')}
                        label="Actions"
                        onSelectMenuItem={handleSelectMenuItem}
                        menuItems={['Edit']}
                        onDelete={handleDelete}
                    />
            </div>
            )
        }
    },
];
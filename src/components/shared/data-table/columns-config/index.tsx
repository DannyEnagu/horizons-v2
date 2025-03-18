import { Row } from "@tanstack/react-table"


export const  amountHeader = (header: string) => <div className="text-right">{header}</div>

export function amountCell<TData>({ row }: { row: Row<TData> }, accessorKey: string) {
    const amount = parseFloat(row.getValue(accessorKey))
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(amount))
    
    return <div className="text-right font-medium">{formattedAmount}</div>
}

export const actionHeader = () => <div className="text-right">Actions</div> 



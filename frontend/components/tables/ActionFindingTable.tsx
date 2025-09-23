import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Test } from '@/interface'
import { RenderHTML } from '@/components/RenderHTML'


type ActionFindingProps = {
  actionFinding: any[]
}

export const ActionFindingTable = ({ actionFinding }: ActionFindingProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Range</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actionFinding.map((test) => (
          <TableRow key={test.name}>
            <TableCell className="font-medium">{test.name}</TableCell>
            <TableCell>
              <RenderHTML htmlString={test.value.html} />
            </TableCell>
            <TableCell>{test.range || 'No range'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Separator } from '@radix-ui/react-separator'


type ActionFindingProps = {
  actionResult: any[]
}
export const ActionResultTable = ({ actionResult }: ActionFindingProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Result</TableHead>
          <TableHead>Units</TableHead>
          <TableHead>Range</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actionResult.map((result) => {
            return (
              <>
                <TableRow key={result.result}>
                  <TableCell className="font-medium">{result.result}</TableCell>
                  <TableCell>{result.units || 'No units.'}</TableCell>
                  <TableCell>{getRange(result.rangeStart, result.rangeEnd)}</TableCell>
                </TableRow>
                <Separator />
              </>
            )
          },
        )}
      </TableBody>
    </Table>
  )
}

function getRange(rangeStart?: number, rangeEnd?: number) {
  if (!rangeStart || !rangeEnd) return 'No range'

  return `${rangeStart} - ${rangeEnd}`
}

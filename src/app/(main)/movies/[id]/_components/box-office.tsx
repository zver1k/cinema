import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { getBoxOffice } from "@/shared/api/box-office";
import { Skeleton } from "@/shared/ui/skeleton";

export function BoxOfficeSkeleton() {
  return (
    <div className="mt-4">
      <Skeleton className="h-5 w-32 mb-3" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
}

async function BoxOffice({ id }: { id: string }) {
  const { items } = await getBoxOffice(id);
  if (items.length === 0) return null;
  const typeLabels: Record<string, string> = {
    BUDGET: "Бюджет",
    RUS: "Сборы в России",
    WORLD: "Сборы в мире",
    USA: "Сборы в США",
    MARKETING: "Маркетинг",
  };
  return (
    <div className="mt-4">
      <div className="mb-3 font-semibold">Бюджет и сборы</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Тип</TableHead>
            <TableHead className="text-right">Сумма</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((i) => (
            <TableRow key={i.type}>
              <TableCell className="font-medium">
                {typeLabels[i.type] ?? i.type}
              </TableCell>
              <TableCell className="text-right">
                {i.symbol}
                {i.amount.toLocaleString("ru-RU")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BoxOffice;

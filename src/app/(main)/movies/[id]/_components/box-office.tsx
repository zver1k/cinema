import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { BoxOfficeFilm } from "@/shared/types/api.types";

function BoxOffice({ boxOffice }: { boxOffice: BoxOfficeFilm[] }) {
  if (boxOffice.length === 0) return null;
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
          {boxOffice.map((i) => (
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

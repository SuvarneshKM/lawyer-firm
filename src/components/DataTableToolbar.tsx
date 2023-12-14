import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const speciality = [
    {
      value: "Family Law",
      label: "Family Law",
    },
    {
      value: "Criminal Law",
      label: "Criminal Law",
    },
    {
      value: "Corporate Law",
      label: "Corporate Law",
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <input
          placeholder="Lawyer name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("speciality") && (
          <DataTableFacetedFilter
            column={table.getColumn("speciality")}
            title="Speciality"
            options={speciality}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

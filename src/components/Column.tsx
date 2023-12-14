import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowAction } from "./DataTableRowAction";
import { Badge } from "./ui/badge";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface Lawyer {
  id: number;
  name: string;
  speciality: string;
  firms: string;
  address: string;
  phone: string;
  availableTime: string[];
}

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

export const columns: ColumnDef<Lawyer>[] = [
  {
    id: "dnd",
    cell: () => <DragHandleDots2Icon />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "speciality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Speciality" />
    ),
    cell: ({ row }) => {
      const specialitys = speciality.find(
        (data) => data.value === row.getValue("speciality")
      );

      if (!specialitys) {
        return null;
      }
      return <div className="w-[100px]">{specialitys.label}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "firms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Firms" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue("firms")}</div>;
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("address")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("phone")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "availableTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available Time" />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const bookedTimeSlots = useSelector(
        (state: RootState) => state.lawyer.bookedTimeSlots
      );

      return (
        <div className="w-[200px] flex flex-wrap gap-1">
          {row.getValue("availableTime").length > 0 ? (
            row.getValue("availableTime")?.map((val: string) => (
              <>
                <Badge variant="outline">{val}</Badge>
              </>
            ))
          ) : (
            <p>No slot available</p>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <div className="hidden">{row.getValue("id")}</div>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowAction row={row} lawyerId={row.getValue("id")} />
    ),
  },
];

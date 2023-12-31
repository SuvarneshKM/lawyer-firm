import { Row } from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { bookTimeSlot } from "@/state/lawyer/lawyerSlice";

interface DataTableRowActionsProp<TData> {
  row: Row<TData>;
  lawyerId: number;
}

export function DataTableRowAction<TData>({
  row,
  lawyerId,
}: DataTableRowActionsProp<TData>) {
  const dispatch = useDispatch<AppDispatch>();
  const bookedTimeSlots = useSelector(
    (state: RootState) => state.lawyer.bookedTimeSlots
  );

  const handleBookAppointment = (timeSlot: string) => {
    dispatch(bookTimeSlot({ lawyerId, timeSlot }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = row.getValue("availableTime");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Book Slot</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Book Slot</SheetTitle>
          <SheetDescription>
            {data?.length > 0 ? "Book your slot" : "No slot available"}
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 items-center gap-4 mt-4">
          {data?.map((val: string) => (
            <div className="flex flex-col space-y-1 items-center border p-2 rounded-md">
              <p className="text-md">{val}</p>
              {!bookedTimeSlots.includes(val) && (
                <Button
                  size={"default"}
                  onClick={() => handleBookAppointment(val)}
                >
                  Book
                </Button>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

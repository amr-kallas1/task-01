import {
  TableBody,
  TableCell,
  Table as TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/string-function";
import { ShieldX } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Pagination from "./pagination";

type TableProps = {
  columns: { title: string; className?: string }[];
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  WithPagination?: boolean;
  totalPages?: number;
  dataLength?: number;
};
const Table = ({
  isLoading,
  columns,
  children,
  WithPagination,
  totalPages,
  isError,
  dataLength,
}: TableProps) => {
  return (
    <>
      <TableContainer className="overflow-hidden rounded-md">
        <TableHeader className="">
          <TableRow className="bg-primary dark:bg-green-600">
            {columns.map(({ className, title }) => (
              <TableHead
                className={cn("dark:text-white text-white", className)}
                key={title}
              >
                {capitalizeFirstLetter(title)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? new Array(5).fill(1).map((_, index) => (
                <TableRow key={index}>
                  {
                    new Array(
                      columns.map((_, index) => (
                        <TableCell key={index}>
                          <Skeleton className="h-8" />
                        </TableCell>
                      ))
                    )
                  }
                </TableRow>
              ))
            : children}
        </TableBody>
      </TableContainer>
      {!isLoading && dataLength == 0 && (
        <div className=" pt-spacing_8xl h-[260px] py-2.5 overflow-hidden relative">
          <div className="flex items-center justify-center h-full flex-col w-[95%] m-auto p-[30px] rounded-xl shadow-lg">
            <img src="/assets/no-data.svg" alt="" />

            <Typography variant="subtitle2">No data to show here</Typography>
          </div>
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center pt-spacing_8xl h-[260px] py-2.5 overflow-hidden relative">
          <ShieldX size={150} className="text-Error-600" />
          <Typography variant="subtitle2">
            Something went wrong, Please try again later.
          </Typography>
        </div>
      )}
      {WithPagination && totalPages != 0 && (
        <div className="px-2 pb-1 py-spacing_lg border-t-2 w-full rounded-b-radius_xl border-gray-200">
          <Pagination
            dataLength={dataLength}
            isLoading={isLoading}
            pagesCount={totalPages}
          />
        </div>
      )}
    </>
  );
};

export default Table;

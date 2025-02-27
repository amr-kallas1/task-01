import { Button } from "@/components/ui/button";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as SHDPagination,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  isLoading?: boolean;
  dataLength?: number;
  pagesCount?: number;
}

const numOfNeighborhood = 6;
const minToShowEllipsis = 9;
const halfNumOfNeighborhood = numOfNeighborhood / 2;

const Pagination: React.FunctionComponent<PaginationProps> = ({
  pagesCount = 1,
  isLoading,
  dataLength,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get("page") || 0);

  const changePaginationHandler = (page: number) => {
    if (page !== currentPage && page > currentPage) {
      setSearchParams(`?page=${page}`);
    } else if (page !== currentPage && page < currentPage) {
      setSearchParams(`?page=${page}`);
    }
  };

  useEffect(() => {
    if (pagesCount && pagesCount - 1 < currentPage) {
      setSearchParams(`?page=${pagesCount - 1}`);
    }
  }, [pagesCount]);

  const isTherePreviousPages = currentPage > 0;
  const isThereNextPages = currentPage + 1 < pagesCount;

  if (isLoading && !dataLength) return <Skeleton className="h-8 my-2" />;
  return (
    <SHDPagination>
      <PaginationContent>
        <div className="grow">
          <PaginationPrevious
            className="text-black dark:text-white bg-white dark:bg-green-500 py-2 px-3 mt-2 shadow-xs border border-gray-300 rounded-md max-w-fit"
            disabled={!isTherePreviousPages}
            onClick={changePaginationHandler.bind(
              null,
              isTherePreviousPages ? currentPage - 1 : 0
            )}
          />
        </div>

        <PaginationItem>
          <Button
            // variant="ghost"
            onClick={changePaginationHandler.bind(null, 0)}
            className={cn(
              "text-gray-600 dark:bg-inherit dark:hover:bg-green-500 bg-white dark:text-white text-sm py-[10px] px-4",
              currentPage === 0 &&
                "bg-primary dark:bg-green-500 text-white text-sm"
            )}
          >
            {1}
          </Button>
        </PaginationItem>

        {pagesCount > minToShowEllipsis && currentPage > 6 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagesCount >= currentPage &&
          pagesCount > 2 &&
          new Array(
            pagesCount >= numOfNeighborhood + 3
              ? numOfNeighborhood + 1
              : pagesCount - 2
          )
            .fill(1)
            .filter(
              (_, index) =>
                (currentPage > halfNumOfNeighborhood + 3
                  ? +Number(
                      currentPage -
                        numOfNeighborhood +
                        index +
                        halfNumOfNeighborhood -
                        1
                    ).toFixed()
                  : index + 1) <
                pagesCount - 1
            )
            .map((_, index) => {
              const paginationValue =
                currentPage > halfNumOfNeighborhood + 3
                  ? +Number(
                      currentPage -
                        numOfNeighborhood +
                        index +
                        halfNumOfNeighborhood -
                        1
                    ).toFixed()
                  : index + 1;
              return (
                <PaginationItem key={index}>
                  <Button
                    // variant="ghost"
                    onClick={changePaginationHandler.bind(
                      null,
                      paginationValue
                    )}
                    className={cn(
                      "text-gray-600 text-sm py-[10px] px-4 bg-white dark:bg-inherit dark:hover:bg-green-500",
                      currentPage === paginationValue &&
                        "bg-primary dark:bg-green-500 text-white text-sm"
                    )}
                  >
                    {paginationValue + 1}
                  </Button>
                </PaginationItem>
              );
            })}

        {pagesCount > minToShowEllipsis && currentPage < pagesCount - 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagesCount > 1 && (
          <PaginationItem>
            <Button
              onClick={changePaginationHandler.bind(null, pagesCount - 1)}
              className={cn(
                "text-gray-600 text-sm py-[10px] bg-white dark:bg-inherit dark:hover:bg-green-500 px-4",
                currentPage === pagesCount - 1 &&
                  "text-sm bg-primary dark:bg-green-500 text-white"
              )}
            >
              {pagesCount}
            </Button>
          </PaginationItem>
        )}
        <div className="grow flex justify-end">
          <PaginationNext
            className="text-black bg-white dark:bg-green-500 dark:text-white py-2 px-3 mt-2 shadow-xs border border-gray-300 rounded-md max-w-fit"
            disabled={!isThereNextPages}
            onClick={changePaginationHandler.bind(null, currentPage + 1)}
          />
        </div>
      </PaginationContent>
    </SHDPagination>
  );
};

export default Pagination;

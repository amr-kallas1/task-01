import { cn } from "@/lib/utils";
import { capitalizeAllFirstLetter } from "@/utils/string-function";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import Typography from "../ui/typography";
interface ViewFieldContainerProps {
  fieldName: string;
  children: React.ReactNode;
  className?: string;
  subTitle?: string;
  fieldClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
}

const ViewFieldContainer: React.FunctionComponent<ViewFieldContainerProps> = ({
  fieldName,
  children,
  className,
  subTitle,
  fieldClassName,
  valueClassName,
  isLoading,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-7 p-8 border-b border-grey-100 w-full",
        className
      )}
    >
      <div className={cn("w-56 col-span-2", fieldClassName)}>
        <Typography size={"semibold"} className={"text-grey-700 "}>
          {capitalizeAllFirstLetter(fieldName)}
        </Typography>
        {subTitle && (
          <Typography size="regular" className="text-grey-600">
            {subTitle}
          </Typography>
        )}
      </div>
      <div className={cn("flex items-center  col-span-5", valueClassName)}>
        {isLoading ? <Skeleton className="h-10 w-full" /> : children}
      </div>
    </div>
  );
};

export default ViewFieldContainer;

import {
  capitalizeAllFirstLetter,
  capitalizeFirstLetter,
} from "@/utils/string-function";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import Typography from "../ui/typography";

interface PageTitleProps {
  title: string;
  subTitle: string;
  isLoading?: boolean;
}

const PageTitle: FC<PageTitleProps> = ({ title, subTitle, isLoading }) => {
  return (
    <div className="flex flex-col gap-1  mb-5  overflow-y-hidden">
      <Typography
        className="text-gray-950 dark:text-green-500"
        variant="h5"
        size="semibold"
      >
        {capitalizeAllFirstLetter(title)}
      </Typography>
      {isLoading && <Skeleton className="h-6" />}
      {!isLoading && (
        <div>
          <Typography
            className="text-gray-500 dark:text-white font-[460] leading-6 "
            variant="body1"
            size="semibold"
          >
            {capitalizeFirstLetter(subTitle)}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default PageTitle;

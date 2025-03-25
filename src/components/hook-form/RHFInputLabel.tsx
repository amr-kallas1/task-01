import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/string-function";
import React from "react";
import { Label } from "../ui/label";
import Typography from "../ui/typography";

interface RHFInputLabel {
  label?: string;
  secondaryLabel?: string;
  className?: string;
  tooltipTitle?: string;
  tooltipDescription?: string;
}

const RHFInputLabel: React.FunctionComponent<RHFInputLabel> = ({
  label,
  className,
  secondaryLabel,
}) => {
  if (!label) return <div className={className}></div>;

  return (
    <div className={cn("flex justify-between mb-[6px]", className)}>
      <div className="flex items-center  gap-0.5">
        <Label className="text-gray-700 dark:text-white inline-block">
          {capitalizeFirstLetter(label)}
        </Label>
        {secondaryLabel && (
          <Typography className="text-gray-400 dark:text-white" size="medium">
            {secondaryLabel}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default RHFInputLabel;

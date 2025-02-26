import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/string-function";
import React from "react";
import { Label } from "../ui/label";
import Typography from "../ui/typography";

interface RHFInputLabel {
  label?: string;
  isOptional?: boolean;
  className?: string;
  tooltipTitle?: string;
  tooltipDescription?: string;
}

const RHFInputLabel: React.FunctionComponent<RHFInputLabel> = ({
  label,
  className,
  isOptional,
}) => {
  if (!label) return <div className={className}></div>;

  return (
    <div className={cn("flex justify-between mb-[6px]", className)}>
      <div className="flex items-center  gap-0.5">
        <Label className="text-gray-700  inline-block">
          {capitalizeFirstLetter(label)}
        </Label>
        {isOptional && (
          <Typography className="text-gray-400" size="medium">
            Optional
          </Typography>
        )}
      </div>
    </div>
  );
};

export default RHFInputLabel;

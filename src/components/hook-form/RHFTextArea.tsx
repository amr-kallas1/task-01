import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ComponentProps, memo } from "react";
import { Control, Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import Typography from "../ui/typography";
import RHFInputLabel from "./RHFInputLabel";
interface RHFTextAreadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  tooltipTitle?: string;
  isOptional?: boolean;
  inputClassName?: string;
  childClassName?: string;
  tooltipDescription?: string;
  endAdornmentClassName?: string;
  startAdornmentClassName?: string;
  endAdornment?: React.ReactNode;
  control: Control<any>;
  startAdornment?: React.ReactNode;
  type?: ComponentProps<typeof Input>["type"];
}

const RHFTextField: React.FunctionComponent<RHFTextAreadProps> = ({
  name,
  label,
  className,
  isLoading,
  isOptional,
  placeholder,
  control,
}) => {

  return (
    <div className={cn(" w-full px-5 py-2", className)}>
      <RHFInputLabel label={label} isOptional={isOptional} />
      {isLoading && <Skeleton className="h-[44px]" />}
      {!isLoading && (
        <Controller
          control={control}
          name={name as string}
          render={({ field, fieldState: { error } }) => {
            return (
              <div>
                <Textarea
                  {...field}
                  placeholder={placeholder ? placeholder : undefined}
                />
                <Typography className="text-sm font-medium text-red-500 text-start mt-1">
                  {error?.message}
                </Typography>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default memo(RHFTextField);

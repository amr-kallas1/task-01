import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";
import MultiSelect from "../ui/multi-select";
import { Skeleton } from "../ui/skeleton";
import RHFInputLabel from "./RHFInputLabel";
interface RHFReactSelectProps {
  name: string;
  label?: string;
  isMulti?: boolean;
  className?: string;
  isLoading?: boolean;
  placeholder?: string;
  inputClassName?: string;
  disabled?: boolean;
  control: Control<any>;
  isOptional?: boolean;
  options?: { label: string; value: string }[];
  skeleton?: boolean;
}

const RHFReactSelect = ({
  name,
  label,
  options,
  isMulti,
  className,
  isLoading,
  placeholder,
  disabled,
  skeleton,
  isOptional,
  inputClassName,
  control,
}: RHFReactSelectProps) => {
  return (
    <div className={cn(" w-full px-5 py-2 ", className)}>
      <RHFInputLabel label={label as string} isOptional={isOptional} />
      {skeleton ? (
        <Skeleton className="w-full mb-4 h-10" />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <div>
                <MultiSelect
                  {...{ ...field, ref: null }}
                  isLoading={isLoading}
                  options={options ?? []}
                  className={inputClassName}
                  isMulti={isMulti}
                  disabled={disabled}
                  placeholder={placeholder}
                />
                <p className="text-sm font-semibold text-red-500  text-start mt-1">
                  {error?.message}
                </p>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default RHFReactSelect;

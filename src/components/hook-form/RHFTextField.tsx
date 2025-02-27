import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, memo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import RHFInputLabel from "./RHFInputLabel";
interface RHFTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  isOptional?: boolean;
  inputClassName?: string;
  endAdornmentClassName?: string;
  startAdornmentClassName?: string;
  endAdornment?: React.ReactNode;
  control: Control<any>;
  startAdornment?: React.ReactNode;
  type?: ComponentProps<typeof Input>["type"];
}

const RHFTextField: React.FunctionComponent<RHFTextFieldProps> = ({
  name,
  type,
  label,
  className,
  isLoading,
  isOptional,
  placeholder,
  endAdornment,
  control,
  startAdornment,
  inputClassName,
  endAdornmentClassName,
  startAdornmentClassName,
  ...other
}) => {
  const [isInitial, setIsInitial] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type == "number" && (e.key === "-" || e.key === "+" || e.key === "e")) {
      e.preventDefault();
    }
  };
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
              <Input
                {...field}
                error={error?.message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  field.onChange(
                    type == "number"
                      ? isNaN(e.target.valueAsNumber)
                        ? 0
                        : e.target.valueAsNumber
                      : e.target.value
                  );
                  setIsInitial(isNaN(e.target.valueAsNumber) ? true : false);
                }}
                endAdornmentClassName={endAdornmentClassName}
                startAdornmentClassName={startAdornmentClassName}
                placeholder={placeholder ? placeholder : undefined}
                id={name}
                type={
                  type == "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                endAdornment={
                  type == "password" ? (
                    <Button
                      type="button"
                      variant="outline"
                      className=" p-0 w-7 h-8 border-none rounded-full "
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </Button>
                  ) : (
                    endAdornment
                  )
                }
                value={
                  typeof field.value === "number" &&
                  field.value === 0 &&
                  isInitial
                    ? ""
                    : field.value
                }
                className={cn(inputClassName, {
                  "hide-number-input-spinners": type === "number",
                })}
                startAdornment={startAdornment}
                {...other}
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default memo(RHFTextField);

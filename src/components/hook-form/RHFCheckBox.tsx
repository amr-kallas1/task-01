import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Control, Controller } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface RHFCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  name: string;
  control: Control<any>;
  label: string;
}

const RHFCheckbox: React.FunctionComponent<RHFCheckboxProps> = ({
  name,
  label,
  control,
  className,
  ...other
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className={cn("flex items-center", className)}>
            <Checkbox
              onCheckedChange={(check) => field.onChange(check)}
              checked={field.value}
              {...field}
              {...other}
              id={name}
            />
            <label className="cursor-pointer select-none" htmlFor={name}>
              {label}
            </label>
          </div>
        );
      }}
    />
  );
};

export { RHFCheckbox };

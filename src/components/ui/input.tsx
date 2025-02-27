import * as React from "react";

import { cn } from "@/lib/utils";
import Typography from "./typography";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  endComponent?: React.ReactNode;
  endAdornmentClassName?: string;
  startAdornmentClassName?: string;
  containerClassName?: string;
  error?: string;
}

const Input = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>(
    (
      {
        className,
        type,
        startAdornment,
        endAdornment,
        endComponent,
        startAdornmentClassName,
        endAdornmentClassName,
        containerClassName,
        error,
        ...props
      },
      ref
    ) => {
      return (
        <div>
          <div
            className={cn(
              "flex   border border-gray-300 rounded-md ",
              containerClassName
            )}
          >
            {startAdornment && (
              <div
                className={cn(
                  "flex items-center rounded-md rounded-r-none pl-[0.813rem] pr-2  text-gray-600 text-md font-xs",
                  startAdornmentClassName
                )}
              >
                {startAdornment}
              </div>
            )}
            <input
              type={type}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              className={cn(
                "w-full h-[2.75rem] leading-6 grow text-gray-900 border-input focus:outline-hidden bg-transparent dark:text-white text-md placeholder:text-gray-500 dark:placeholder:text-white placeholder:font-regular transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 flex py-[0.625rem] px-[0.875rem] items-center gap-2 rounded-md ",
                className,
                startAdornment && " pl-0"
              )}
              ref={ref}
              {...props}
            />
            {endAdornment && (
              <div
                className={cn(
                  "min-w-fit rounded-md rounded-l-none px-[0.875rem] flex items-center",
                  endAdornmentClassName
                )}
              >
                {endAdornment}
              </div>
            )}
          </div>
          {error && (
            <Typography className="text-red-500 dark:text-red-500 text-sm mt-1 ">
              {error}
            </Typography>
          )}
        </div>
      );
    }
  )
);
Input.displayName = "Input";

export { Input };

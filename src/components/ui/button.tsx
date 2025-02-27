import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SquarePlus } from "lucide-react";
import Spinner from "./spinner";
const spinnerVariants = cva("", {
  variants: {
    variant: {
      primary: "text-brand-600",
      outline: "text-white",
      secondary: "text-brand-50",
      default: "",
      destructive: "",
      ghost: "",
      link: "",
      yellow: "",
      danger: "",
      cadetblue: "",
      add: "",
    },
    pathVariant: {
      primary: "",
      outline: "fill-gray-700",
      secondary: "fill-brand-700",
      default: "",
      destructive: "",
      ghost: "",
      link: "",
      yellow: "",
      danger: "",
      cadetblue: "",
      add: "",
    },
  },
});

const buttonVariants = cva(
  "items-center flex justify-center overflow-hidden min-w-fit relative cursor-pointer  whitespace-nowrap rounded-md  transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-white disabled:opacity-50 font-md text-Text-sm  font-md text-Text-sm leading-5  py-[0.625rem] px-[0.875rem]",
  {
    variants: {
      variant: {
        primary: "",
        default:
          "bg-primary dark:bg-green-500 dark:text-white  text-white hover:bg-primary/90 dark:hover:bg-green-500/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background dark:bg-inherit hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-green-500 text-white hover:bg-green-500/90",
        ghost: "bg-[#a9a9a9] text-white",
        link: "text-primary underline-offset-4 hover:underline",
        yellow: "text-white bg-yellow-400",
        cadetblue: "bg-cadetBlue text-white",
        danger: "text-white bg-red-500",
        add: "bg-primary text-white dark:bg-green-500  text-sm font-semibold  border-2 px-3 rounded-sm border-main rounded-lg hover:bg-white hover:text-primary dark:hover:bg-green-500 ",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      Color: {
        Orang: "bg-brand-600",
        Lightbrand: "bg-brand-600",
        Darkbrand: "bg-brand-700",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  buttonContainerClass?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      buttonContainerClass,
      variant,
      size,
      children,
      asChild = false,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        aria-label="button"
        {...props}
        disabled={isLoading || disabled}
        className={
          asChild ? undefined : cn(buttonVariants({ variant, size, className }))
        }
      >
        <React.Fragment>
          {isLoading && (
            <Spinner
              className={cn(
                " absolute w-full flex justify-center left-0 ",
                spinnerVariants({ variant })
              )}
              pathClassName={spinnerVariants({ pathVariant: variant })}
            />
          )}
          <div
            className={cn(
              "inline-flex items-center justify-center gap-spacing_sm leading-6 gap-1",
              isLoading && "opacity-0 duration-100",
              asChild && cn(buttonVariants({ variant, size, className })),
              buttonContainerClass
            )}
          >
            {variant == "add" && <SquarePlus size={16} />}
            {children}
          </div>
        </React.Fragment>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

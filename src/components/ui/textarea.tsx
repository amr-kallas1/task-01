import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px]  w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-2xs placeholder:text-md placeholder:text-muted-foreground focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50   items-center gap-2  border-gray-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

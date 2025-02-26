import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useOpenSidebarContext } from "@/context/sidebarContext";

type TooltipButtonProps = {
  title: string;
  icon: ReactNode;
  isSidebar?: boolean;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const TooltipButton = ({
  title,
  icon,
  isSidebar = false,
  className,
  onClick,
}: TooltipButtonProps) => {
  const { openSidebar } = useOpenSidebarContext();
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger
          onClick={onClick}
          className={cn("cursor-pointer", className)}
          aria-label="icon button"
        >
          {icon}
        </TooltipTrigger>
        {isSidebar ? (
          !openSidebar && (
            <TooltipContent>
              <p className="text-xs text-main">{title}</p>
            </TooltipContent>
          )
        ) : (
          <TooltipContent>
            <p className="text-xs text-main">{title}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;

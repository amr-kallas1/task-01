import { cn } from "@/lib/utils";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../components/ui/dialog";
import { useOpenDeleteDialogContext } from "@/context/openDeleteDialog";

interface DeleteDialogProps {
  className?: string;
  dialogKey: string;
  mutateFn: UseMutateFunction<any, Error, string, unknown>;
  isPending: boolean;
  titleToast: string;
  id: string | null;
  setId: Dispatch<SetStateAction<string | null>>;
  invalidateQueryKey: readonly string[];
}
const DeleteDialog = ({
  className,
  id,
  setId,
  dialogKey,
  mutateFn,
  isPending,
  titleToast,
  invalidateQueryKey,
}: DeleteDialogProps) => {
  const queryClient = useQueryClient();
  const { openDeleteDialog, setOpenDeleteDialog } =
    useOpenDeleteDialogContext();
  const submitHandler = () => {
    mutateFn(id as string, {
      onSuccess: () => {
        toast.success(titleToast);
        queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
        setId(null);
        setOpenDeleteDialog(false);
      },
    });
  };
  const changeOpenHandler = useCallback(
    (open: boolean) => {
      setOpenDeleteDialog(open);
      setId(null);
    },
    [dialogKey]
  );
  return (
    <Dialog open={openDeleteDialog} onOpenChange={changeOpenHandler}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          " md:px-8 gap-0 h-[240px] overflow-y-auto md:w-[60%] w-[350px] ",
          className
        )}
      >
        <div
          className={
            "absolute left-2/4 top-7 translate-x-[-50%] bg-gray-25 border border-gray-200 rounded-full w-14 h-14 mb-6  shadow-2xs flex justify-center items-center"
          }
        >
          <Trash2 size={16} />
        </div>
        <DialogTitle className=" text-gray-700 dark:text-green-500 md:text-[20px] text-center mt-20 w-full">
          هل أنت متأكد من أنك تريد الحذف
        </DialogTitle>

        <div className={cn("flex gap-3 items-center", className)}>
          <Button
            type="submit"
            isLoading={isPending}
            className="basis-1/2 bg-red-500 hover:bg-red-500"
            onClick={submitHandler}
          >
            تأكيد
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className={cn("w-full basis-1/2")}
            >
              إلغاء
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;

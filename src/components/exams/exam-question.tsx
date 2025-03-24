import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RHFCheckbox } from "../hook-form/RHFCheckBox";
import RHFTextField from "../hook-form/RHFTextField";

const ExamQuestions = ({ onSubmit }: { onSubmit: () => void }) => {
  const navigate = useNavigate();
  const numberOfQuestions = localStorage.getItem("numberOfQuestions") ?? 0;
  const numberOfAnswers = localStorage.getItem("numberOfAnswers") ?? 0;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = async () => {};

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: `mcq`,
  });

  useEffect(() => {
    if (Number(numberOfQuestions) > 0) {
      remove();
      for (let i = 0; i < Number(numberOfQuestions); i++) {
        append({
          subQues: "",
          subQuesImg: "",
          subAns: Array.from({ length: 2 }, () => ({
            isCorrect: false,
            ques: "",
          })),
        });
      }
    }
    return () => {
      localStorage.removeItem("numberOfQuestions");
      localStorage.removeItem("numberOfAnswers");
    };
  }, [numberOfQuestions]);

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className={`border-b-primary pt-3 last:border-b-0 border-b-2`}
            >
              <div
                className={`flex justify-around gap-5 items-center `}
                key={field.id}
              >
                <div className="flex flex-col w-full">
                  <div>
                    <RHFTextField
                      label="أدخل السؤال"
                      control={control}
                      className="pr-0"
                      name={`mcq.${index}.subQues`}
                    />
                  </div>
                  <div className="flex gap-3">
                    {Array(Number(numberOfAnswers) ?? 0)
                      .fill(0)
                      .map(() => (
                        <div className="flex gap-4 items-center flex-1">
                          <RHFCheckbox control={control} name={""} label={""} />
                          <RHFTextField
                            control={control}
                            name="dd"
                            className="pr-0"
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <Trash
                  className="text-red-500 cursor-pointer mt-5"
                  onClick={() => {
                    remove(index);
                  }}
                />
              </div>
              {/* {errors && (
                <Typography className="text-sm font-medium text-red-500 dark:text-red-900 text-start mt-1">
                  هناك حقول مطلوبة
                </Typography>
              )} */}
            </div>
          );
        })}
        <Button
          className="mt-4"
          type="button"
          onClick={() => {
            append({
              subQues: "",
              subQuesImg: "",
              subAns: Array.from({ length: 2 }, () => ({
                isCorrect: false,
                ques: "",
              })),
            });
          }}
        >
          <Plus />
        </Button>
        <div className="flex gap-2 items-center mt-3 pb-10 justify-center">
          <Button isLoading={false} className="w-[30%]">
            تأكيد
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-[30%]"
            onClick={onSubmit}
          >
            رجوع
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExamQuestions;

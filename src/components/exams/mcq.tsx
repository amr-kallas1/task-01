import RHFCheckBox from "@/components/hook-form/RHFCheckBox";
import RHFEquationField from "@/components/hook-form/RHFEquationField";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import { modelMCQValidation } from "../model-validation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModelQuestionImage from "../model-question-image";
import { getFromIndexedDB, saveToIndexedDB } from "@/utils/helpers";
import { queries } from "@/apis/model/queries";

type IMCQAnswer = {
  mcq: {
    subQues: string;
    subQuesImg: { file: File; image: string };
    subAns: { ques: string; isCorrect: boolean }[];
  }[];
};

const option = [
  { name: "a", id: `0` },
  { name: "b", id: `1` },
  { name: "c", id: `2` },
  { name: "d", id: `3` },
];

const Mcq = () => {
  const { mutate, isPending } = queries.UploadFile();
  const [filteredOptions, setFilteredOptions] = useState(option);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IMCQAnswer>({
    resolver: yupResolver(
      modelMCQValidation
    ) as unknown as Resolver<IMCQAnswer>,
  });

  const submitHandler = async (data: IMCQAnswer) => {
    const MCQ = data.mcq?.map((question) => ({
      ...question,
    }));

    if (MCQ) {
      let answers = (await getFromIndexedDB("answers")) || {};
      answers = {
        ...answers,
        ...{ [`mcq.${id}`]: MCQ },
      };
      await saveToIndexedDB("answers", answers);
      navigate(-1);
    }
  };
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: `mcq`,
  });

  useEffect(() => {
    if (state.question.numberAnswer.value)
      setFilteredOptions(option.slice(0, state.question.numberAnswer.value));
  }, [state.question.numberAnswer.value]);

  useEffect(() => {
    const fetchMCQ = async () => {
      const updatedAnswers = (await getFromIndexedDB("answers")) ?? [];
      const mcqQuestions = Object.entries(updatedAnswers).find(
        ([key]) => key == `mcq.${id}`
      )?.[1];
      remove();
      if (Array.isArray(mcqQuestions) && mcqQuestions.length > 0) {
        mcqQuestions.forEach((mcq) => {
          append({
            subQues: mcq.subQues,
            subAns: mcq.subAns,
            subQuesImg: mcq.subQuesImg,
          });
        });
      } else if (state.question.numberOfQuestions > 0) {
        for (let i = 0; i < state.question.numberOfQuestions; i++) {
          C
        }
      }
    };
    fetchMCQ();
  }, [state.question.numberOfQuestions]);

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
                  <div className="flex gap-3">
                    <RHFEquationField
                      control={control}
                      accordionOpen={accordionOpen}
                      setAccordionOpen={setAccordionOpen}
                      index={index}
                      uploadImgMutate={mutate}
                      name={`mcq.${index}.subQues`}
                      imgName={`mcq.${index}.subQuesImg`}
                    />

                    <ModelQuestionImage
                      name={`mcq.${index}.subQuesImg`}
                      setValue={setValue}
                      watch={watch}
                      isPending={isPending}
                    />
                  </div>

                  <RHFCheckBox
                    getValues={getValues}
                    parentIndex={index}
                    setValue={setValue}
                    watch={watch}
                    control={control}
                    options={filteredOptions}
                  />
                </div>
                <Trash
                  className="text-red-500 cursor-pointer mt-5"
                  onClick={() => {
                    remove(index);
                  }}
                />
              </div>
              {errors && errors.mcq?.[index] && (
                <Typography className="text-sm font-medium text-red-500 dark:text-red-900 text-start mt-1">
                  هناك حقول مطلوبة
                </Typography>
              )}
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
              subAns: Array.from(
                { length: state.question.numberAnswer.value },
                () => ({
                  isCorrect: false,
                  ques: "",
                })
              ),
            });
          }}
        >
          <Plus />
        </Button>
        <div className="flex gap-2 items-center mt-3 justify-center">
          <Button isLoading={false} className="w-[30%]">
            تأكيد
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-[30%]"
            onClick={() => navigate(-1)}
          >
            رجوع
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Mcq;

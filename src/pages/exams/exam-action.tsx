import { useState, useEffect } from "react";
import ExamForm from "@/components/exams/exam-form";
import ExamQuestions from "@/components/exams/exam-question";
import PageTitle from "@/components/global/page-title";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { EXAMS_PATH } from "@/routes/path";
import { useParams } from "react-router-dom";

const ExamAction = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [isExamForm, setIsExamForm] = useState(true);
  const { id = "" } = useParams();

  const handleFormSubmit = () => {
    setShowQuestions(true);

    setTimeout(() => {
      setIsExamForm(false);
    }, 300);
  };

  const handleQuestionsSubmit = () => {
    setShowQuestions(false);

    setTimeout(() => {
      setIsExamForm(true);
    }, 300);
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="flex flex-col mb-6 border-b border-gray-200">
        <BreadCrumbs
          data={[
            { label: "الامتحانات", link: EXAMS_PATH.EXAMS },
            {
              label: `${id ? "تعديل الامتحان" : "إضافة امتحان"}`,
              link: "",
            },
          ]}
        />
        <div className="flex justify-between items-start">
          <PageTitle
            title={`${id ? "تعديل الامتحان" : "إضافة امتحان"}`}
            subTitle={`${
              id ? "عدل معلومات الامتحان" : "إضافة معلومات الامتحان"
            }`}
          />
        </div>
      </div>

      <div
        className={`${
          showQuestions ? "-translate-x-[200%]" : "translate-x-0"
        } transition-transform duration-500 inset-0 ${
          isExamForm ? "relative" : "absolute top-[135px]"
        } `}
      >
        <ExamForm onSubmit={handleFormSubmit} />
      </div>

      <div
        className={`${
          showQuestions ? "translate-x-0" : "translate-x-[200%]"
        } transition-transform duration-500 inset-0 ${
          isExamForm ? "absolute top-[135px]" : "relative"
        } `}
      >
        <div className="h-full">
          <ExamQuestions onSubmit={handleQuestionsSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ExamAction;

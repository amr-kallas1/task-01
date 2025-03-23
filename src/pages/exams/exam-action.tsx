import ExamForm from "@/components/exams/exam-form";
import ExamQuestions from "@/components/exams/exam-question";
import PageTitle from "@/components/global/page-title";
import BreadCrumbs from "@/components/ui/breadcrumb";
import { EXAMS_PATH } from "@/routes/path";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ExamAction = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const { id = "" } = useParams();

  const handleFormSubmit = () => {
    setShowQuestions(true);
  };

  return (
    <div className="relative w-full h-full">
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
        className={`absolute top-[135px] inset-0 transition-transform duration-500 ${
          showQuestions ? "-translate-x-[200%]" : "translate-x-0"
        }`}
      >
        <ExamForm onSubmit={handleFormSubmit} />
      </div>

      <div
        className={`absolute top-[135px] inset-0 transition-transform duration-500 ${
          showQuestions ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full">
          <ExamQuestions />
        </div>
      </div>
    </div>
  );
};

export default ExamAction;

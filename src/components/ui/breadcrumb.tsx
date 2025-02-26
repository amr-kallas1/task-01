import { Button } from "@/components/ui/button";
import { capitalizeAllFirstLetter } from "@/utils/string-function";
import { Link } from "react-router-dom";
import Typography from "./typography";
import homeLine from "/assets/home-line.svg";
import { ChevronLeft } from "lucide-react";

interface BreadCrumbsProps {
  label: string;
  link?: string;
}

const BreadCrumbs: React.FunctionComponent<{ data: BreadCrumbsProps[] }> = ({
  data,
}) => {
  return (
    <div className="h-7 mb-3 flex gap-2 mb-spacing_2xl items-center">
      <Link to="/" className="w-5 h-5 flex justify-center items-center">
        <img
          src={homeLine}
          alt="homeLine"
          className="p-spacing_xs min-w-[20px]"
        />
      </Link>

      <ChevronLeft className="w-4 text-[#bab5b5]" />
      {data.map(({ link, label }, index) => {
        return (
          <div className="flex h-7 gap-2 items-center" key={index}>
            {!!Link ? (
              <Link
                to={link ?? ""}
                className="h-5 flex justify-center items-center w-fit"
              >
                <Button
                  className={`shadow-none border-none rounded-md py-1 px-2 font-medium ${
                    index + 1 === data.length && "font-semibold"
                  } text-gray-700 flex items-center justify-center  leading-5 text-sm`}
                  variant={"cadetblue"}
                >
                  {capitalizeAllFirstLetter(label)}
                </Button>
              </Link>
            ) : (
              <Typography
                className={`shadow-none border-none rounded-md py-1 px-2 font-medium ${
                  index + 1 === data.length && "bg-gray-50 font-semibold"
                } text-gray-700 flex items-center justify-center  leading-5 text-sm`}
              >
                {capitalizeAllFirstLetter(label)}
              </Typography>
            )}
            {index + 1 !== data.length && (
              <ChevronLeft className="w-4 text-[#bab5b5]" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;

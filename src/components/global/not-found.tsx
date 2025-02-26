import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import NotFoundimg from "/assets/NotFoundimg.svg";

const NotFound = () => {
  return (
    <div className=" flex flex-col items-center">
      <img src={NotFoundimg} alt="" className=" h-[300px]" />
      <div className="tracking-widest  text-center relative bottom-6 flex flex-col justify-center items-center gap-4 text-gray-400">
        <span className="text-6xl block">4 0 4</span>
        <span className="text-xl">Sorry, This Page isn't found</span>

        <Button className="flex items-center">
          <Link to="/">Go To Home Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

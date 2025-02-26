import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="px-5 md:px-10 grow py-8 pt-20 overflow-x-hidden bg-gray-25">
      <Outlet />
    </main>
  );
};

export default Main;

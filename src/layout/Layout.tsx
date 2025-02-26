import LoadingPage from "@/components/ui/loadingPage";
import { Suspense } from "react";
import Main from "./Main";
import SideBar from "./SideBar";
import Navbar from "./nav/NavBar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        <SideBar />
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;

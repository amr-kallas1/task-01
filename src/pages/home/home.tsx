import ColumnsChart from "@/components/charts/columns";
import LineChart from "@/components/charts/line";
import DashboardCards from "@/components/home/card";

const Home = () => {
  return (
    <div>
      <DashboardCards />
      <div className="mt-10 flex gap-4 max-md:flex-wrap">
        <LineChart />
        <ColumnsChart/>
      </div>
    </div>
  );
};

export default Home;

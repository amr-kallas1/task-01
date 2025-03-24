import { useState } from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-line-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Series 1",
      data: [30, 40, 35, 50, 49, 60, 70],
    },
    {
      name: "Series 2",
      data: [20, 30, 40, 35, 50, 55, 65],
    },
  ]);

  return (
    <div className="w-full flex-1">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="100%"
        height={300}
      />
    </div>
  );
};

export default LineChart;

import { useState } from "react";
import { Chart as ChartJS, _adapters } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

const getDate = () => {
  let today = new Date();
  let year = today.getFullYear();
  return year + "-01-01";
};

const chartStartDate = getDate();

const GanttChart = ({ data }) => {
  const [userData, setUserData] = useState({
    labels: data.map((data) => data.taskName),
    datasets: [
      {
        label: "Project Timeline",
        data: data.map((data) => data.timeline),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        barPercentage: 0.5,
      },
    ],
  });

  return (
    <div className="gantt-container">
      <Bar
        data={userData}
        options={{
          indexAxis: "y",
          scales: {
            x: { min: chartStartDate, type: "time", time: { unit: "week" } },
          },
        }}
      />
    </div>
  );
};

export default GanttChart;

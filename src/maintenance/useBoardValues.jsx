import React, { useEffect, useState } from "react";
import axios from "axios";

const useBoardValues = (apiEndpoint) => {
  const [boardData, setBoardData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [finished, setFinished] = useState([]);

  const [chartData, setChartData] = useState([
    { id: "Tasks", label: "Tasks", value: 0, color: "#FF6384" },
    { id: "Ongoing", label: "Ongoing", value: 0, color: "#36A2EB" },
    { id: "Finished", label: "Finished", value: 0, color: "#FFCE56" },
  ]);

  const fetchData = () => {
    console.log("fetch2");
    axios
      .get(apiEndpoint)
      .then((response) => {
        setBoardData(response.data);
        const totalEntries = response.data.length;

        setTotalEntries(totalEntries);

        console.log("total", totalEntries);

        const tasks = response.data.filter(
          (item) => item.status === "tasks"
        ).length;

        const ongoing = response.data.filter(
          (item) => item.status === "ongoing"
        ).length;

        const finshed = response.data.filter(
          (item) => item.status === "finished"
        ).length;

        setTasks(tasks);
        setOngoing(ongoing);
        setFinished(finshed);
        setChartData([
          { id: "Tasks", label: "Tasks", value: tasks, color: "#FF6384" },
          {
            id: "Ongoing",
            label: "Ongoing",
            value: ongoing,
            color: "#36A2EB",
          },
          {
            id: "Finished",
            label: "Finished",
            value: finshed,
            color: "#FFCE56",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching tasks: ", error);
      });
  };

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  return chartData;
};

export default useBoardValues;

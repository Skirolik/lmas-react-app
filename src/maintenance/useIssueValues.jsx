import React, { useState, useEffect } from "react";
import axios from "axios";

const useIssueValues = (apiCall) => {
  console.log("aoiawf", apiCall);
  const [inventoryData, setInventoryData] = useState([]);
  const [totlaEntries, setTotalEnteries] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [diffrence, setDiffrence] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiCall);
        const data = response.data;

        const filteredData = data.filter((entry) => {
          return entry.Issues !== null && !isInvalidValue(entry.Issues);
        });
        const entriesCount = data.length;
        const issuesCount = filteredData.length;

        const percentage = entriesCount - issuesCount;
        console.log("%", percentage);
        setTotalEnteries(entriesCount);
        setInventoryData(filteredData);
        setTotalIssues(issuesCount);
        setDiffrence(percentage);
      } catch (error) {
        console.log("Server Error", error);
      }
    };

    const isInvalidValue = (value) => {
      const invalidValues = ["na", "n a ", "NA", "n/a", "none", "n o n e "];
      const lowercasedValue = value.toLowerCase().trim();
      return invalidValues.includes(lowercasedValue);
    };
    fetchData();
  }, []);

  console.log("daiwfnafa", diffrence);

  return { inventoryData, totlaEntries, totalIssues, diffrence };
};

export default useIssueValues;

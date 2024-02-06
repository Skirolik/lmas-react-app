import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { RingProgress } from "@mantine/core";

const useErrorList = (apiVal, startSlaveId = null, endSlaveID = null) => {
  const [errorData, setErrorData] = useState({
    totalCount: 0,
    maxSlaveId: null,
    maxCount: 0,
    filteredData: [],
  });
  const [maxError, setMaxError] = useState([]);
  const [errorLength, setErrorLength] = useState([]);

  console.log("ssid", startSlaveId);
  console.log("esid", endSlaveID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (startSlaveId !== null && endSlaveID !== null) {
          const slaveIdsInRange = generatedSlaveIdRange(
            startSlaveId,
            endSlaveID
          );
          console.log("Generated Ids", slaveIdsInRange);

          const response = await axios.get(apiVal);
          const data = response.data;
          const total = data.length;
          console.log("if loop total", data);

          const filteredData = data.filter((entry) => {
            return slaveIdsInRange.includes(entry.slave_id);
          });

          console.log("filtered data", filteredData);

          const filteredLength = filteredData.length;

          console.log("filtered error data count", filteredLength);

          const countPerName = slaveIdsInRange.reduce((counts, name) => {
            const nameCount = filteredData.filter(
              (entry) => entry.slave_id === name
            ).length;
            return { ...counts, [name]: nameCount };
          }, {});

          console.log("error count in loop", countPerName);

          const sortedCounts = Object.entries(countPerName)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 10);

          const [maxSlaveId, maxCount] = sortedCounts[0] || ["", 0];

          setErrorData({
            totalCount: filteredLength,
            maxSlaveId,
            maxCount,
            filteredData,
          });
        } else {
          const response = await axios.get(apiVal);
          const data = response.data;
          const total = data.length;
          console.log("bverioasd", total);
          setErrorData({
            totalCount: total,
            maxSlaveId: null,
            maxCount: 0,
            filteredData: data,
          });
        }
      } catch (error) {
        console.log("An Error has Occured", error);
      }
    };
    fetchData();
  }, [apiVal, startSlaveId, endSlaveID]);

  const generatedSlaveIdRange = (start, end) => {
    const startNumber = parseInt(start.split("-")[1]);
    const endNumber = parseInt(end.split("-")[1]);

    const slaveIds = [];

    for (let i = startNumber; i <= endNumber; i++) {
      slaveIds.push(`sl-${i}`);
    }
    return slaveIds;
  };

  return errorData;
};

export default useErrorList;

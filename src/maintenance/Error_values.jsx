import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Error_values = (apiCall) => {
  const [errorData, setErrorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiCall);
        const data = response.data;
        const total = data.length;
        setErrorData(total);
      } catch (error) {
        console.log("An Error has Occured", error);
      }
    };
  });
  return { errorData };
};

export default Error_values;

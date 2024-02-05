import React, { useState } from "react";
import { Button, Modal } from "@mantine/core";
import { Handle, Position } from "reactflow";
import { Link, useNavigate } from "react-router-dom";

import { useMediaQuery } from "@mantine/hooks";
import useErrorValues from "./useErrorValues";
import DetailTable from "./DetailTable";

const CustomNode = ({ data, errorValues }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const navigate = useNavigate();

  // Simulate errorTable for testing purposes

  // Ensure useErrorValues hook returns an array of objects
  // const { errorValues } = errorValues;

  const handleButtonClick = () => {
    console.log("button clicked", data.label);

    if (data.label === "SB-1") {
      navigate("/repeter_1");
    } else if (data.label === "SB-2") {
      navigate("/repeters/repeter_2");
    } else if (data.label === "SB-3") {
      navigate("/repeters/repeter_3");
    } else if (data.label === "SB-4") {
      navigate("/repeters/repeter_4");
    } else if (data.label === "SB-5") {
      navigate("/repeters/repeter_5");
    } else if (data.label === "SB-6") {
      navigate("/repeters/repeter_6");
    } else if (data.label === "SB-7") {
      navigate("/repeters/repeter_7");
    } else if (data.label === "SB-8") {
      navigate("/repeters/repeter_8");
    } else {
      alert("Navigation is only allowed for sb-1");
    }
  };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };
  // const generateSlaveData = (start, end) => {
  //   const slaveData = [];
  //   for (let i = start; i <= end; i++) {
  //     slaveData.push({ id: i, label: `Sl-${i}` });
  //   }
  //   return slaveData;
  // };
  // const numericLabel = parseInt(data.label.match(/\d+/)[0], 10);
  // const firstSlaveId = (numericLabel - 1) * 50 + 1;
  // const slaveData = generateSlaveData(firstSlaveId, firstSlaveId + 49);
  // console.log("SD", slaveData);

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #000",
        borderRadius: "1px",
      }}
    >
      <Handle type="target" id={data.label} position={Position.Top} />
      <div
        style={{ fontSize: "smaller", textAlign: "center", marginTop: "10px" }}
      >
        {data.label}
        <Button
          size="compact-xs"
          variant="gradient"
          radius="md"
          style={{
            width: "fit-content",
            padding: "1px 4px",
            fontSize: "5px",
          }}
          onClick={handleButtonClick}
        >
          Detials
        </Button>
      </div>
    </div>
  );
};

export default CustomNode;
